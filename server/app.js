const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const cors = require('cors')

// app.use(cors({
//     origin: "http://localhost:3000"
// }))
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{ console.log("Connection Successful") }).catch((err)=>{ console.log("Connection Unsuccessful") });

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const Task = mongoose.model("Task",schema);
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/getdata',async (req,res) => {
    try{
        const data = await Task.find({});
        res.send(data);
        console.log('data loaded successfully');
    }
    catch(err){
        console.log('failed to load data');
    }
});

app.post('/insertdata',async (req,res) => {
    try{
        const { x } = req.body;
        const data = new Task({ title: x });
        await data.save();
        console.log('inserted successfully');
    }
    catch(err){
        console.log('failed to insert data');
    }
})

app.put('/updatedata',async (req,res) => {
    try{
        const item = req.body.x;
        const data = await Task.updateOne({_id: req.body.elemId },{$set: {title: item}});
        res.send(data);
        console.log('updated successfully');
    }
    catch(err){
        console.log('failed to update data');
    }
})

app.delete('/deletedata',async (req,res) => {
    try{
        // console.log(req.body);
        const data = await Task.deleteOne({_id: req.body.id});
        res.send(data);
        console.log('deleted successfully');
    }
    catch(err){
        console.log('failed to delete data');
    }
})

app.listen(PORT,(err) => {
    if(err)
        console.log(err);
    else 
        console.log("listning");
});