const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT

// paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You need to provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About  Me',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hele Me Plz',
        name: 'Me',
        msg: 'Please contact us at ___'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'No page found',
        name: 'Me',
        msg: "This help article doesn't exist."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "No page found",
        name: 'Me',
        msg: "This page doesn't exist"
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})