const fs = require("fs");

fs.writeFile("msg.txt","Hello, world!",(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });


  fs.readFile("./msg.txt","utf-8" ,(err, data) => {
    if (err) throw err;
    console.log(data);
  });