const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    // Forward the event to the posts service
    await axios.post('http://localhost:4000/events', event).catch(err => {
        console.error('Error sending event to posts service:', err.message);
    });

    // Forward the event to the comments service
    await axios.post('http://localhost:4001/events', event).catch(err => {
        console.error('Error sending event to comments service:', err.message);
    });

    // Forward the event to the query service
    await axios.post('http://localhost:4002/events', event).catch(err => {
        console.error('Error sending event to query service:', err.message);
    });

    res.send({ status: 'OK' });
}
);

app.listen(4005, () => {
    console.log('Event bus is running on port 4005');
}
);