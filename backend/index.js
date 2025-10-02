const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json())
const PORT=3000;
const link="mongodb://127.0.0.1:27017/newdb"

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173", // React dev server URL
  credentials: true
}));

const loginSchema=new mongoose.Schema({
    personalid:String,
    password:String

})
// creain a modal
const login =mongoose.model("users1",loginSchema)




mongoose.connect(link).then(()=>{
    console.log("connected to the database")
}).catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.send("helo iam ur respose ")
})

app.get("/karan",(req,res)=>{
    res.send("helo ur are the path of karan welcom ")
});

app.post("/send",async (req,res)=>{
   try{
     const {personalid,password}=req.body;

    const user=new login({personalid,password});

    await user.save();
    res.status(201).send("New entry added to existing collection!");
   }catch (err) {
    res.status(500).send("Error adding entry: " + err.message);
  }

})






app.post("/login",async (req,res)=>{
    const {id , password}=req.body;

    const user= await login.findOne({personalid:id,password:password});
    if(user){
        res.send("we found u ")
    }else{
        res.send('we cna find the accounjd ')
    }
})





app.listen(PORT,()=>{
    console.log(`running at hte port => ${PORT}`)
})





















// this ithe local look back ip address of teh computer server dotn confuse it with the publich or private ip addres assigned by the isp provider for learnign mroe see the documentiatin 


// Mirror / Loopback IP → 127.0.0.1

// Think of this as looking in the mirror inside your house 🪞.

// Always points to your own house.

// Only your computer can use it to talk to itself.

// Example: your local MongoDB or Express server running on your machine.

// 2️⃣ Private IP → 192.168.x.x or 10.x.x.x

// This is like your house name inside your colony / neighborhood 🏘️.

// Other people in the same WiFi or network can use this to reach your computer.

// Assigned by your router using DHCP (dynamic) or manually (static).

// Example: if another laptop on your WiFi wants to connect to your MongoDB.

// 3️⃣ Public IP → assigned by ISP

// This is like your full postal address in the city 🌍.

// Anyone on the internet can see this and try to reach your computer.

// Needs proper security (firewall, passwords, VPN).

// Example: when a server is hosted in a data center or when you deploy your website to the internet.


