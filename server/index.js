const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send('connected'));

app.listen(port, () => console.log(`Server listening on port ${port}!`));