const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send({});})

app.post('/events',  async(req, res) => {
    console.log(0,req.body)
    const { type, data } = req.body;

    console.log(0,type)
    if (type === 'CommentCreated') {
        console.log(1,type)

        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    console.log(type)
    if (type === 'CommentCreated') {
        console.log('CommentCreated', type)
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

const PORT = 4003
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});