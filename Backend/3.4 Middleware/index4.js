import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // (req, res) => er shob req a ekhon body ase so we can access it like req.body. Eta chara only res access kora jaito



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post('/submit',  (req, res) => { 
  res.send(`<h1>Your band name is:</h1> <h2>${req.body.street} ${req.body.pet}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
