const express = require('express');
const app = express();

//AIzaSyB4xWqoPFrjOOm3CI24jz1TdHMEZiVO8CA
//upload playlist id: PLU6MwRDOX1vWVuF1UneZYWVmep7kAamML

//GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLU6MwRDOX1vWVuF1UneZYWVmep7kAamML&key=AIzaSyB4xWqoPFrjOOm3CI24jz1TdHMEZiVO8CA

const ytVideos = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLU6MwRDOX1vWVuF1UneZYWVmep7kAamML&key=AIzaSyB4xWqoPFrjOOm3CI24jz1TdHMEZiVO8CA';


app.set('view engine','ejs');
app.use(express.static('public'))

app.listen(3000,(req,res) => {
 console.log('Server online at port 3000')
})


app.get('/',(req,res) => {
    res.status(200).render('homepage', { "Content-Type":"application/json"});
})

app.get('/classes',async (req,res) => {

    let response = await fetch(ytVideos)
    .then(list => list.json());

    console.log(response)

    res.status(200).render('classes');
})

app.get('/mats',(req,res) => {
    res.status(200).render('material');
})

app.get('/about',(req,res) => {
    res.status(200).render('about');
})