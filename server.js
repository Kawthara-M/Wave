const express = require("express")
const app = express()
app.use(express.static('public'))
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
require("dotenv").config()
const db = require("./db")

//require routers
const authRouter = require("./routes/authRouter.js")
const userRouter = require("./routes/userRouter.js")
const recipeRouter = require("./routes/recipeRouter.js")
/////////////////

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/recipes", recipeRouter)

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
