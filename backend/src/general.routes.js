const router = require("express").Router()
const { News } = require('./schema')

router.get('/news', async (req, res) => {
    try {
        let news = await News.find({})
        res.status(200).json({
            success: true,
            news
        })
    } catch (e) {
        res.status(500).json({
            success: false
        })
    }
})

module.exports = router;
