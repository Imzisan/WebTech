import { Console } from 'console';
import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app= express();
const port=3000;

app.get('/', (req, res, next) => {
    const d = new Date();
    let day = d.getDay();
    const msg="Hello!"
    var adv="Its a weekday!"

    if (day===0 || day===6){
        adv="Its the weekend."
    }
    res.render(__dirname + '/views/index.ejs',{
        message : msg,
        advice :adv
    });
    next();
});

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});





