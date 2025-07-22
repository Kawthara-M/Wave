const express = require("express")
const app = express()
app.set('view engine','ejs')

const mongoose = require("./config/db")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

const isSignedIn = require("./middlewares/is-signed-in")
const passUserToView = require("./middlewares/pass-user-to-view")


app.use(express.static("public"))

require("dotenv").config()
const PORT = process.env.PORT ? process.env.PORT : "3000"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

// Require Routes
const authRouter = require("./routes/authRouter.js")
// The following routes are commented until we start working on them and export them, otherwise they will create you errors ;)
const userRouter = require("./routes/userRouter.js")
const postRouter = require("./routes/postRouter.js")

// Use Controllers
app.use("/auth", authRouter)
app.use("/users", isSignedIn, userRouter)
app.use("/posts", isSignedIn, postRouter)



app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}`)
})
