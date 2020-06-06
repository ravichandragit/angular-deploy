//  install express server
const express = require('express');
const monk = require('monk');
const path = require('path');

const app = express();


//  
app.use(express.static(__dirname+'/dist/angulardeploy'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/dist/angulardeploy/index.html'));
});

app.get('/users',(req,res)=>{
    console.log('users');
    const url = 'mongodb+srv://ravichandra:ravimongodb@cluster0-fti2i.mongodb.net/matrinomial?retryWrites=true&w=majority'
    const db = monk(url);
    db.then(()=>{
        console.log('connect to mongodb');
    }).catch(error => {
        console.log('error conncecting db',error);
    })
    
    
    const collection = db.get('users');
    collection.find({})
    .then((data)=>{
        console.log(data);
        const d = data
        console.log('collection connection')
        res.send(d)
    }).catch(e =>{
        console.log('error collection');
    }).then(() => {
        db.close();
    })


})


app.listen(process.env.PORT || 3000, () => {
    console.log('server is running at localhost')
});