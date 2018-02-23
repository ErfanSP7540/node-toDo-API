
var {mongoose} = require('./db/mongoose')
var {userModel} = require('./models/user')
var {todoModel} = require('./models/todo')


var express = require('express')
var bodyParser = require('body-parser')
var app = express();


app.use((req,res,next)=>{
   // console.log(  Object.keys(req)   )
    next();
})

app.use(bodyParser.json());

// app.post('/todos',(req,res)=>{

//     // console.log( typeof(req) );
//     // console.log( Object.keys(req) );
//     // console.log( Object.keys(bodyParser.json(req)));
//     console.log(  Object.keys(req)   )
//     res.send(  req.body)
// })


app.post('/todos',(req,res)=>{

var newuser = new userModel({
                                name :req.body.name,
                                email:req.body.email,
                                family:req.body.family,
                                location:req.body.location,
                                age:req.body.age,
                                })
                                
    
    newuser.save()
    .then(  doc=>{  res.status(200).send(req.body)
                    return console.log( 'successfully document recorded : \n',doc)
                 })
    .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})


    

    })    



// app.use((req,res,next)=>{
//     console.log('url    : ',req);
//     console.log('method : ',req.method);

//     res.send({name:'efan'})
    
//     next();
// })


app.listen(3000);