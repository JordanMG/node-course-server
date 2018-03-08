const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
    // This is Express 'middleware'
    var now = new Date().toString()
    var log = `${now}: ${req.ip} ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// MAINTENANCE MODE CHALLENGE MIDDLEWARE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

// MAKE STATIC PUBLIC DIRECTORY AVAILABLE
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my first node website!'
    })
    // response.send({
    //     name: 'Jordan',
    //     likes: [
    //         'Cats',
    //         'Cars',
    //         'Computers'
    //     ]
    // })
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error: bad request!!!'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})