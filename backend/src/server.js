const express = require('express');
const app = express();
const cron = require('node-cron');
const axios = require('axios')
const db = require('./database')
const httpContext = require('express-http-context')
const bodyParser = require("body-parser");
const uuid = require('uuid')
const { News } = require('./schema')
app.set('port', process.env.port || 3000)
    .use(httpContext.middleware)
    .use((req, res, next) => {
        httpContext.ns.bindEmitter(req);
        httpContext.ns.bindEmitter(res);
        var requestId = req.headers["x-request-id"] || uuid.v4();
        httpContext.set('requestId', requestId);
        res.set('requestId', requestId)
        let origin = req.get('origin');
        console.log(origin)
        res.header('Access-Control-Allow-Origin', origin);
        next();
    })
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use('/api', require('./general.routes'))

let fetchNews = async () => {
    try {
        await News.deleteMany({})
        let { data: { hits } } = await axios.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        await News.insertMany(hits)
        return hits
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}
db.once('open', () => {
    try {
        fetchNews()
    } catch (e) {

    }
})
// fetch news every hour
cron.schedule('0 * * * *', async () => {
    try {
        fetchNews()
    } catch (e) {

    }
});

module.exports = {
    app,
    fetchNews
};