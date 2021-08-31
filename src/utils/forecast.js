const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=37beada7f93cdc479c69ee02371b5f9e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, 'The temperature is ' + body.current.temperature + ". It feels like " + body.current.feelslike + ".")
        }
    })
}

module.exports = forecast