import express from "express"

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})