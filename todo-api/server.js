var express = require('express'); // requiring express
var bodyParser = require('body-parser'); // requiring body parser telling the browser we are using JSON

var app = express(); // creating express instance
app.use(bodyParser.json()); // using body parser to pare JSON body
app.use(bodyParser.urlencoded({ extended: false }));  // parsing data from array 

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    },
    {
        id: 2,
        todo: "Implement a REST API Again"
    },
    {
        id: 3,
        todo: "Implement a REST API One more time"
    }
];

// GET /api/todos

app.get('/api/todos', function(req, res){
    console.log(req.body);
    res.send(todoList);
    //next();
});

// GET /api/todos/:id

app.get('/api/todos/:id', function(req,res, next){
    console.log(req.param.id);
    res.send(`${todoList[0].id}`);
});


// POST /api/todos
app.post('/api/todos', function(req, res){
    console.log(req.body);
    res.send(req.body);
});

// PUT /api/todos/:id

app.put('/api/todos/:id', function(req, res){
    todoList[req.param.id]= req.body
    console.log(`Old array`);
    console.log(todoList[req.param.id]);
    console.log(`New Array`);
    console.log(todoList);
    res.send(todoList[req.param.id]);
});

// DELETE /api/todos/:id

app.delete('/api/todos/:id', function(req, res){
    todoList.splice(req.param.id);
    console.log(`Old array`);
    console.log(todoList[req.param.id]);
    console.log(`New Array`);
    console.log(todoList);
    res.send(todoList);
});

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})