const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const schema = require('./App/GraphQL/Schema')
const upload = require('./App/upload')
const formData = require("express-form-data");
const os = require("os");
const {auth, authenticate} = require('./App/utils/authenticate')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5500

const app = express()

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

app.use(cors())
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(formData.parse(options));


const db = process.env.MONGODB_URL
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err))

app.use('/graphql', authenticate, graphqlHTTP({
    schema,
    graphiql: true,
}))

app.use('/upload', upload)

 if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, './client/build')))

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'bulid', 'index.html'))
    })
 }

 app.listen(PORT, () => {
    console.log(`listening to port at ${PORT}`)
})