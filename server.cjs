const express = require('express')
const cors = require('cors')

//importing functions from dbconnection.cjs to use it here
const {connecttodb,getdb} = require('./dbconnection.cjs')
const bodyparser = require('body-parser')
const { ObjectId } = require('mongodb')


const app = express()
app.use(cors())
app.use(bodyparser.json())

connecttodb(listen)
function listen(){
    const port = process.env.port || 8000
    app.listen(port)
    db = getdb()
    console.log(`Listening on the port ${port}`)
}


app.get('/',function(request,response){
    response.send('Welcome');
})


//Add new element
app.post('/add',function(request,response){            //get user input - so using insertone
    db.collection('tracker1').insertOne(request.body)       //insertOne - async (.then use)

.then(function(){
    response.status(201).json({
        "status": "Entry added successfully"                     //if data inserted successfukky
    })
})

.catch(function(){
    response.status(500).json({                                 //if data isn't inserted properly
        "status": "Entry restricted"
    })
})

})


//See all the entries in collection
app.get('/entry',function(request,response){

    const entry =[]
    db.collection('tracker1').find().forEach(element => {
        entry.push(element);
    })  
    .then(function(){
        response.status(200).json(entry)                //status code
    })
    .catch(function(){
        response.status(500).json({
            "status":"couldn't  fetch the entries"             //if there is an error in fetching 
        })
    })
  
})



//Delete an element
app.delete('/delete',function(request,response){

    if(ObjectId.isValid(request.query.id)){
    db.collection('tracker1').deleteOne({
        _id : new ObjectId(request.query.id)            ///requesting that id
    })
    .then(function(){
        response.status(200).json({                 //need to mention the id in api
            "statue":"Deleted Successfully"             //localhost:8000/delete?id=65c1b8865edffb21dd680bf1
        })
    })
    .catch(function(){
        response.status(400).json({
            "status":"Could not delete!"
        })
    })
}

    else{
        response.status(400).json({
            "Status": "ObjectID is invalid"             //ObjectID is invalid
        })    
    }
})



//Update the element
app.patch('/update/:id',function(request,response){          //sending the id to modify that content or send any parameter
    
    if(ObjectId.isValid(request.params.id)){
    db.collection('tracker1').updateOne(
        {_id : new ObjectId(request.params.id)},
        {$set : request.body}
    )

    .then(function(){
        response.status(200).json({
            "status" : "Updated Successfully"
        })
    })

    .catch(function(){
        response.status(400).json({
            "status" : "Changes Not Updated"
        })
    })
}

    else{
        response.status().json({
            "status" : " ObjectID is not valid"
        })
    }
})