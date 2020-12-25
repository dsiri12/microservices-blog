const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); // for req.body
app.use(cors());

const posts = {}; // { 'c6b41c43': {id: 'c6b41c43', title: '1st post'}}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }; 
    
    console.log(1, posts[id])

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    console.log(2, posts[id])
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

/*
1. create a post
POST http://localhost:4000/posts
request body:
{
    "title": "1st post"
}

response body:
{
    "id": "c6b41c43",
    "title": "1st post"
}

2. get all the posts
GET http://localhost:4000/posts
{
    "c6b41c43": {
        "id": "c6b41c43",
        "title": "1st post"
    }
}
*/