const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const compression = require('compression');
const app = express();

app.use(compression());
const router = require("./routes");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/", router);

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected successfully');
});

const uri = "mongodb+srv://js-war:wwwWWW@cluster0.c1uv8.mongodb.net/js-war?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }); 


app.listen(port, () => {
    console.log(`app is listening on port ${port}...`);
});