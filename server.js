// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const pug = require("pug");
const app = express();

var todoList = [{ id: 1, name: "Nấu cơm" }, { id: 2, name: "Nấu nước" }];

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (req, res) => {
  var q = req.query.q;
  if (q) {
    var matchTodo = todoList.filter(x => {
      return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render("todo", {
      todos: matchTodo
    });
  }
  else{
    res.render("todo", {
      todos: todoList
    });
  }
});


//view create todo
app.get("/todos/create",(req, res)=>{
  res.render('create');
});

//method post
app.post("/todos/create", (req, res)=>{
  //push data in array
  todoList.push(req.body);
  
  //redirect page list todo
  res.redirect('/todos');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
