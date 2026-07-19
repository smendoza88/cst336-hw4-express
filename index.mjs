import express from "express"
import { faker } from "@faker-js/faker";

const app = express()
const port = 3000

app.set("view engine", "ejs");
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
  const randomName =  faker.person.fullName();
  console.log(randomName);
  let fakeData = {
    name: faker.person.fullName(),
    city: faker.location.city(),
    phone: faker.phone.number()
  };
  console.log(fakeData);
  // res.render("faker")
  res.render("faker", { randomName })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})