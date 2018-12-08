var express = require('express'); // requiring express
var bodyParser = require('body-parser'); // requiring body parser telling the browser we are using JSON

var app = express(); // creating express instance
app.use(bodyParser.json()); // using body parser to pare JSON body
app.use(bodyParser.urlencoded({ extended: false }));  // parsing data from array 

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners status: 200 ok

app.get('/api/owners', function(req, res){
    console.log(req.body);
    res.send(owners); // returns JSON object in the browser at the given path.
});

// GET /api/owners/:id status: 200 ok

app.get('/api/owners/:id', function(req, res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); //request info
    console.log(req.param.id);  
    res.send(`${owners[req.params.id].id}`);//at the given path. Output to browser is the id at arrayb position ex; http://localhost:3000/api/owners/0  output :1
})

// POST /api/owners status: 200 ok

app.post(`/api/owners`, function(req, res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); //request info
    console.log(req.body);
    res.send(owners); // returns owners array 200 ok successful in postman
});

// PUT /api/owners/:id     status : 200 ok
app.put(`/api/owners/:id`, function(req, res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); //method info
    console.log(`Old array`);
    /** @ index 0
     * { id: 1,
        name: 'Adam',
        pets: [ 
            { id: 1, 
              name: 'Vera', 
              type: 'Dog' 
            },
     { 
         id: 2, 
         name: 'Felix', 
         type: 'Cat' } 
        ] 
    }
     */
    console.log(owners[req.params.id]); //output of array before changes 
    owners[req.params.id] = req.body;  //assigning route parameters to the parsed body of request
    console.log(`New array`);
    /** @ index 0
     * { id: 2,
        name: 'Jordan',
        pets: [ 
            { id: 1, 
              name: 'boogie', 
              type: 'Dog' 
            },
     { 
         id: 2, 
         name: 'ace', 
         type: 'Cat' } 
        ] 
    }
     */
    
    console.log(owners);
    res.send(owners);
});

// DELETE /api/owners/:id      status: 200 ok
//not sure it this is correct --> the array is deleted not the posittion
app.delete('/api/owners/:id', function(req, res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); // request info
    owners.splice(owners[req.params.id]); 
    console.log(`Old array`);
    console.log(owners[req.params.id]);
    console.log(`New array`);
    console.log(owners);
    res.send(owners);

});

// GET /api/owners/:id/pets  status 200 ok

app.get('/api/owners/:id/pets',function(req,res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); // reqyest info
    console.log(req.params.id); // logging path parameters
    res.send(`${owners[req.params.id].pets}`); // returns objects in browser.
})

// GET /api/owners/:id/pets/:petId

app.get('/api/owners/:id/pets/:petId',function(req, res){
    console.log(`Method${req.body}\nURL Type: ${req.url}`);
    console.log(req.params.id); // 
    res.send(owners[req.params.id].pets[req.params.petId]);
});

// POST /api/owners/:id/pets  status 200 ok

app.post('/api/owners/:id/pets',function(req, res){
    console.log(`Method: ${req.method}\nURL Type: ${req.url}`); //request info 
    res.send(owners[req.params.id].pets);  // returns pets object at the given path 

   /**
    *  @ path :      /api/owners/0/pets
    * {
        "id": 1,
        "name": "Vera",
        "type": "Dog"
    },
    {
        "id": 2,
        "name": "Felix",
        "type": "Cat"
    }
    * 
    */
})

// PUT /api/owners/:id/pets/:petId 200 ok

app.put('/api/owners/:id/pets/:petId', function(req, res){
    console.log(`Method: ${req.method}\nURL: ${req.url}`); // request info
    console.log(req.body) 

    console.log(`Old Pet Object`);
    console.log(owners[req.params.id].pets[req.params.petId])  // returns old pet object at given path
    
    owners[req.params.id].pets[req.params.petId] = req.body;  // assigning object body to path
    console.log(`New Pet Object`);
    console.log(owners[req.params.id].pets[req.params.petId]) // returns changed array to console

    res.send(owners[req.params.id].pets[req.params.petId]);  // returns changed array

    /**   Ex output @ path : /api/owners/0/pets/0
     
    *      Old Pet Object
            { id: 1, name: 'Vera', type: 'Dog' }

            New Pet Object
            { id: 6, name: 'Boogie', type: 'Dog' }
     */
})

// DELETE /api/owners/:id/pets/:petId




app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})