const express = require('express');
const path = require('path');
const cors= require('cors');
const app = express();

app.use(cors());

//const port = process.env.port || 8081;
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
})

app.listen(server_port,server_host,()=>{
    console.log(`listening at port ${server_port}`);
})