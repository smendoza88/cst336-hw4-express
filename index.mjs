import express from "express";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
// Enable trust proxy to capture the correct client IP from Render
app.set("trust proxy", true);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/java", (req, res) => {
  res.render("java");
});

app.get("/csharp", (req, res) => {
  res.render("csharp");
});

app.get("/javascript", (req, res) => {
  res.render("javascript");
});

app.get("/faker", async (req, res) => {
  let fakeData = {
    name: faker.person.fullName(),
    city: faker.location.city(),
    phone: faker.phone.number(),
  };
  console.log(fakeData);

  // APILayers API
  const comcastIP = "73.12.141.200";
  // If the request comes from localhost (::1), use the Comcast IP instead
  const userIp = req.ip == "::1" ? comcastIP : req.ip;

  const ipstackURL = `http://api.ipstack.com/${userIp}?access_key=${process.env.APILAYER_KEY}`;

  try {
    let resp = await fetch(ipstackURL);

    // 1. Catch HTTP errors (4xx, 5xx) manually
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    // 2. Parse data inside the try block (catches invalid JSON format)
    let data = await resp.json();

    let ipData = {
      carrier: data.connection.carrier,
      cityState: `${data.city}, ${data.region_name}`,
      connectionType: data.connection_type,
      timezone: data.time_zone.id,
    };

    console.log(ipData);
    console.log(`User IP: ${userIp}`);
    // console.log(`APILAYER_KEY: ${process.env.APILAYER_KEY}`);

    res.render("faker", { fakeData, userIp, ipData });

  } catch (error) {
    // 3. Catches network failures, aborted requests, or thrown errors above
    console.error("Fetch operation failed:", error.message);
    // Handle the error according to your app's workflow
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
