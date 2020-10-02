const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const cors = require('cors');

const schema = require('./schema/schema')

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    console.log('Hey')
    res.send('Hey')
});

app.listen(8888, () => {
    console.log('Server listening on 8888');
});
