const {MongoClient} = require('mongodb')


let dbconnection;

//connection to db
function connecttodb(arg){
    dbconnection = MongoClient.connect("mongodb+srv://shona:1234@cluster0.mepc0f1.mongodb.net/ExpenseTracker?retryWrites=true&w=majority")         //connect is a async func(Promise)

    .then(function(client){                        //so use .then , client = connection established
        dbconnection = client.db()                 //Get the dbs
        console.log('Connected')
        arg()
    })
    .catch(function(err){
        console.log(err)
        console.log('Disconnected')

    })
   

}

//get data from db
function getdb(){
    console.log('In connection')
    return dbconnection
}



//exporting the functions that can be used in other files
module.exports = {connecttodb,getdb}