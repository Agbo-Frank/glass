const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const schema = require('./App/GraphQL/Schema')
const rootValue = require('./App/GraphQL/Root')
const upload = require('./App/upload')
const {auth, authenticate} = require('./App/utils/authenticate')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5500

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use('/graphql', authenticate, graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}))

app.use('/upload', auth, upload)

const db = process.env.MONGODB_URL
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => app.listen(PORT, () => console.log('listening to port 5500')))
 .catch(err => console.log(err))

 if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, './client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'bulid', 'index.html'))
    })
 }