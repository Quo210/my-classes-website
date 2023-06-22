const express = require('express');
const helmet = require('helmet')
const app = express();

app.use(helmet.frameguard({ action: "SAMEORIGIN" }));


class videoItem{
    constructor(id,name,thumbnail,dbId){
        this.id = id,
        this.name = name,
        this.thumbnail = thumbnail,
        this.dbId = dbId
    }
};

function curateList(json){
    const videoQuant = json["items"];
    const curated = []
    for (let i = 0; i < videoQuant.length; i++){
        const currentItem = videoQuant[i];
        const id = currentItem["id"];
        const name = currentItem["snippet"]["title"];
        const thumbnail = currentItem["snippet"]["thumbnails"]["standard"]["url"];
        const dbId = 'https://www.youtube.com/watch?v=' + currentItem["snippet"]["resourceId"]["videoId"];
        curated.push(new videoItem(id,name,thumbnail,dbId))
    }
    return curated
}

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

    let listResponse = await fetch(ytVideos)
    .then(list => list.json());
    const list = curateList(listResponse)
    res.status(200).render('classes',{ data: list});
})

app.get('/mats',(req,res) => {
    res.status(200).render('material');
})

app.get('/about',(req,res) => {
    res.status(200).render('about');
})