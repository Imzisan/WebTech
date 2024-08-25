import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let visitedCountries=[] ;

const db = new pg.Client({
  user : "postgres",
  host : "localhost",
  database:"world",
  password:"104851",
  port: 5432,
})
db.connect();

// db.query("SELECT country_code FROM visited_countries" , (err,res)=> {
//   if(err){
//     console.log("Error while query", err.stack);
//   } else {
//     visitedCountries = res.rows;
//   }
//   db.end();
// });

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries" );
  result.rows.forEach((countries)=>visitedCountries.push(countries.country_code)  );
  console.log(visitedCountries);
  console.log(result.rows )
  res.render('index.ejs',{
    countries : visitedCountries,
    total:visitedCountries.length,
  })
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
