import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "104851",
  port: 5432,
});

db.connect();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];


async function getItems(){
  const result = await db.query("SELECT * FROM items");
  
  items=result.rows;
  return items;
}
async function addItems(item){


  const result = await db.query("INSERT INTO items (title) values ($1);",[item])
  items=result.rows;
  return items;
}
async function updateItems(title,id){


  const result = await db.query("UPDATE items SET title = $1 WHERE id= $2 RETURNING *;",[title,id]  )
 
  
  
}


app.get("/", async (req, res) => {
  const items = await getItems();
 
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  const items = await addItems(item);
  console.log(items)
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  console.log(req.body);
  const id=req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  const items= await updateItems(title,id);
  console.log(items);
  res.redirect("/");
  


});

app.post("/delete", async (req, res) => {
  console.log(req.body);
  const id=req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1;",[id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
