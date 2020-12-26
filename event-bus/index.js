const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json()); // for req.body
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);

    console.log('1 event-bus: Received Event', req.body.type);

    await axios.post('http://posts-clusterip-srv:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);
    await axios.post('http://query-srv:4002/events', event);
    await axios.post('http://moderation-srv:4003/events', event);

    console.log('2 event-bus: Received Event', req.body.type);

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

const PORT = 4005
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});