const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(async (req, res, next) => {
    try {
        const user = await User.findById('621b6ed1b7a58b61e9a7ffab')
        req.user = user
        next()
    } catch(e) {}
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = "mongodb+srv://nirvs:Raketa123@cluster0.9lchv.mongodb.net/shop"
        await mongoose.connect(url, {useNewUrlParser: true})
        const condidate = await User.findOne()
        if (!condidate) {
            const user = new User({
                email: 'nirvs@mail.ru',
                name: 'Anton',
                cart: { items: [] }
            })

            await user.save()
        }
        app.listen(PORT, () => {
            console.log('Сервер запушен на порте ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
 start()


