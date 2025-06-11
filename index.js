const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        message: 'Welcome to Huy Le T-shirt store',
        size: 'Your T-shirt size is XL'
    })
})

app.post('/tshirt', (req, res) => {
    const id = req.params;
    const logo = req.body;

    if (!logo) {
        res.status(418).send({
            message: 'Please provide a logo for your T-shirt'
        })
    }

    res.status(201).send({
        tshirt: 'Your T-shirt with ID ' + id.id + 'and' + logo.logo + 'has been created',
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})