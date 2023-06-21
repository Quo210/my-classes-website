const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'))

app.listen(3000,(req,res) => {
 console.log('Server online at port 3000')
})


app.get('/',(req,res) => {
    res.status(200).render('homepage', { "Content-Type":"application/json"});
})

app.get('/classes',(req,res) => {
    res.status(200).render('classes');
})

app.get('/mats',(req,res) => {
    res.status(200).render('material');
})

app.get('/about',(req,res) => {
    res.status(200).render('about');
})