const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    },
    url: String
})

user.methods.addToCart = function(course) {
    const clonedItems = [...this.cart.items]
    const idx = clonedItems.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if (idx >= 0) {
        clonedItems[idx].count = clonedItems[idx].count + 1
    } else {
        clonedItems.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = { items: clonedItems }
    return this.save()
}

user.methods.removeFromCart = function(id) {
    let items = [...this.cart.items]
    const idx = items.findIndex(c => c.courseId.toString() === id.toString())
    console.log(items[idx], 777)
    if (items[idx].count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = { items }
    return this.save()
}
module.exports = model('User', user)