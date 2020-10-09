let axios = require('axios')

test('Database is connected', () => {
    let db = require('./database')
    db.once('open', () => {
        expect(true).toBe(true)
    })
})

test('API is working', async done => {
    try {
        let { data: { news } } = await axios.get('http://localhost:3000/api/news')
        expect(Object.prototype.toString.call(news)).toBe('[object Array]')
        done()
    } catch (e) {
        done(e)
    }
})

test('Fetch news is working', async done => {
    try {
        let { fetchNews } = require('./server')
        let news = await fetchNews()        
        expect(Object.prototype.toString.call(news)).toBe('[object Array]')
        done()
    } catch (e) {
        done(e)
    }
})

afterAll(done =>{
    let db = require('./database')
    db.close()
    done()
})