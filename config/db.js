const mongoose= require('mongoose')
require("dotenv").config()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=> {
  console.log(`Connected to the Database ${mongoose.connection.name}`)  //should this be deleted later?
})

module.exports= mongoose