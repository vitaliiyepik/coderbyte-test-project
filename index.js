const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000; // todo: move to config

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/creditCard', require('./app/routes/creditCard.routes'));

start = async () => {
    try {
        await mongoose.connect("mongodb+srv://test:123qwe!@cluster0.lajtf.mongodb.net/coderbyte-test?retryWrites=true&w=majority", { // todo: move to config
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });

    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
};

start();