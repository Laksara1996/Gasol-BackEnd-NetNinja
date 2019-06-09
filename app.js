const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/Schema');
const mongoose = require('mongoose');
const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://gasol:gasol123@gasol-rlgxx.mongodb.net/gasol?retryWrites=true');

mongoose.connection.once('open',()=>{
    console.log('Connected');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port,() => {
    console.log('Listning');
});