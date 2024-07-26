const express = require('express')
const path = require('path')
const fs = require('fs');
const exp = require('constants');
const port = 3000

const app = express();

const fileDirectory = path.join(__dirname,'files');

app.use(express.json());

app.get('/files',(req,res)=>{

    fs.readdir(fileDirectory,(err,files)=>{
        if(err){
            console.error('Error reading files directory :',err);
            return res.status(404).json({error : 'Unable to read the files directory'});
        }
        res.status(200).json(files);
    })
})

app.get('/files/:filename' , (req,res)=>{
    const filename = req.params.filename;
    const filepath = path.join(fileDirectory , filename);

    fs.readFile(filepath , 'utf-8',(err,data)=>{
        if(err){
            console.error('Error reading file : ', err);
            return res.status(404).send('File not found');
        }
        res.status(200).send(data);
    })
})

app.use('*',(req,res)=>{
    res.status(404).send('Route not found');
})

app.listen(port , ()=>{
    console.log(`File server running at http://localhost:${port}`);
})