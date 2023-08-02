const express = require("express");
// app.use(bodyParser.urlencoded({ extended: true }))
const app = express();
const cors = require('cors');
const mongo = require("mongoose");
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8080;
const userModel = require('./model/User')
const productModel = require('./model/Product')


app.use(cors());
app.use(express.json())

mongo.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected"))
    .catch((err) => console.log(err))
// const data  = userData

app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.post("/signup", async (req, res) => {
    const { email } = req.body
    await userModel.findOne({ email: email }).then((result) => {
        console.log(result)
        if (result) {
            res.send({ message: "Email id is already resistor", alert: false })
        } else {
            const udata = userModel(req.body)
            const save = udata.save()
            res.send({ message: "User Successfully created", alert: true })
        }
    }).catch((err) => console.log("err", err))
})

app.post("/login", async (req, res) => {
    const { email } = req.body;
    userModel.findOne({ email: email }).then((result) => {
        if (result) {
            const data = {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                profileImage: result.profileImage
            }
            res.send({ message: "Login Successfully", alert: true, data })
        }
        else {
            res.send({ message: "Email is not Valid, Please Sign up ", alert: false })
        }
    })
})

// product create and save in product Table - db
app.post("/createproduct", async (req,res)=>{
 console .log(req.body)
 const data = await  productModel(req.body)
 const dataSave = await data.save()
 res.send({message:"upload SuccessFully", alert:true,dataSave})
})

app.get("/product",async(req,res)=>{
    const getAllproducts = await productModel.find({})
    res.send(JSON.stringify(getAllproducts))
})
app.listen(PORT, () => console.log("Port Is running on " + PORT)) 