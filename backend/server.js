const express = require("express")
const {connection} = require("./config/db")
const {userController} = require("./Routes/user.route")
// const cors = require("cors")
const app = express();
const PORT = 8080;
app.use(express.json());

// app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello")
})


app.use("/user",userController)

app.listen(PORT, async()=>{
try {
    await connection
    console.log("connected")
} catch (error) {
    console.log(error);
}
console.log(`Listening to ${PORT}`)
})