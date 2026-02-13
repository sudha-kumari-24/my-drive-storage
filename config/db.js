const mongoose=require('mongoose');

// const dbConnection=mongoose.connect(process.env.MONGo_URI, )

//best way is to call through function
function dbConnection(){
    mongoose.connect(process.env.MONGO_URI).then(
        ()=>{
console.log("Database is connected to the server");
        }
    )
}


module.exports=dbConnection; //function is only exported