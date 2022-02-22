const { Router } = require('express')
const router = Router()
const Course = require('../models/course')
router.get('/', (req, res) => {
    res.render('add', {
        title: "Главная курс",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    console.log(req.body, 999)
    const course = new Course(req.body.title, req.body.price, req.body.url)
    await course.save()
    res.redirect('/courses')
})

module.exports = router