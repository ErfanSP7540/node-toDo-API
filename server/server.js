
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


app.post('/user',(req,res)=>{

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



app.post('/todo',(req,res)=>{

        var newTodo = new todoModel({ text :req.body.text})

            newTodo.save()
            .then(  doc=>{  res.status(200).send(req.body)
                            return console.log( 'successfully document recorded : \n',doc)
                         })
            .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
}) 
//todos

app.get('/todos',(req,res)=>{


        todoModel.find()
        .then(  doc=>{  res.status(200).send(doc)
                        return console.log( 'successfully document recorded : \n',doc)
                     })
        .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
})

app.get('/users',(req,res)=>{


    userModel.find()
    .then(  doc=>{  res.status(200).send({useres:doc } )
                    return console.log( 'successfully document recorded : \n',doc)
                 })
    .catch(  e=>{  console.log( 'error ' , e ) ;res.status(400).send(req.body)})
})



app.get('/user/:id', (req, res)=> 
{
   // res.send( req.params )

    var {ObjectID} = require('mongodb')
    if( !ObjectID.isValid(req.params.id) )
    {
        res.status(404).send();
        return console.log(`Request ID: ${req.params.id}   >> NOT VALID`); 
    }


    userModel.findById(req.params.id)
    .then ( doc=>{

            if(!doc)
                {   res.status(200).send(`Request ID: ${req.params.id} >> NOT FOUND`);
                    return console.log(`Request ID: ${req.params.id} >> NOT FOUND`);
                }
            res.status(200).send(`Request ID: ${req.params.id} >> ${doc}`)    
            return console.log(`Request ID: ${req.params.id} >> ${doc}`);
    })
    .catch( e  =>{   res.status(400).send(`Request ID: ${req.params.id} >> ERROR`);
                     return console.log(`Request ID: ${req.params.id} >> ERROR`);    
                  })
})

app.delete('/user/:id',(req,res)=>{
    
    var id = req.params.id;
    var {ObjectID} =  require('mongodb');
    if(!ObjectID.isValid(id)){
            res.status(404).send(` Request ID : ${id} IS INVALID`)
            return  console.log(` Request ID : ${id} IS INVALID`);
        }

    userModel.findOneAndRemove({_id:id})
    .then( doc=>{
        if(!doc){
            res.status(404).send(` Request ID : ${id} Not Found`)
            return  console.log(` Request ID : ${id} Not Found`);            
        }
        res.status(200).send(` Request ID : ${id} >>\n${doc}`)
        return  console.log(` Request ID : ${id} >>\n${doc}`);    
    })
    .catch ( e=>{
        res.status(404).send(` Request ID : ${id} ERROR `)
        return  console.log(` Request ID : ${id} ERROR `);       
    }) 

})

// app.use((req,res,next)=>{
//     console.log('url    : ',req);
//     console.log('method : ',req.method);

//     res.send({name:'efan'})
    
//     next();
// })


app.listen(3000);

module.exports = { app }