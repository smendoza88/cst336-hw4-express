import express from "express"
import { faker } from "@faker-js/faker";

const app = express()
const port = 3000

app.set("view engine", "ejs");
// Enable trust proxy to capture the correct client IP from Render
app.set('trust proxy', true)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/java", (req, res) => {
  res.render("java")
})

app.get("/csharp", (req, res) => {
  res.render("csharp")
})

app.get("/javascript", (req, res) => {
  res.render("javascript")
})

app.get("/faker", (req, res) => {
  let fakeData = {
    name: faker.person.fullName(),
    city: faker.location.city(),
    phone: faker.phone.number()
  };
  console.log(fakeData);

  const userIp = req.ip
  console.log(`User IP: ${userIp}`);
  res.render("faker", { fakeData, userIp })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})