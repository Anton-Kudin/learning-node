const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = "mongodb+srv://nirvs:Raketa123@cluster0.9lchv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log('Сервер запушен на порте ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
 start()


