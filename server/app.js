const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000"
}))
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

app.get('/',async (req,res) => {
    try{
        const data = await Task.find({});
        res.send(data);
        // console.log('data loaded successfully');
    }
    catch(err){
        console.log('failed to load data');
    }
});

app.post('/',async (req,res) => {
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

app.put('/:id',async (req,res) => {
    try{
        const item = req.body.x;
        const data = await Task.updateOne({_id: req.params.id},{$set: {title: item}});
        res.send(data);
        console.log('updated successfully');
    }
    catch(err){
        console.log('failed to update data')
    }
})

app.delete('/:id',async (req,res) => {
    try{
        const data = await Task.deleteOne({_id: req.params.id});
        res.send(data);
        console.log('deleted successfully');
    }
    catch(err){
        console.log(req.params.id);
        console.log('failed to delete data');
    }
})

app.listen(PORT,(err) => {
    if(err)
        console.log(err);
    else 
        console.log("listning");
});