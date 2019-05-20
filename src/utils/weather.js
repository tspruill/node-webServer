const request = require('request')
const weather = ({latitude, longitude,placeName}, callback) => {
    const url = 'https://api.darksky.net/forecast/5b947a78ecc9a09e3e6d818e3b532414/' + encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)
    request({url:url, json:true},(error,{body})=> {
        if(error){
            callback('Error unable to connect',undefined)
        }else if (body.error){
            callback('Unable to find location. Please Try again',undefined)
        }else {
            callback(undefined, body.daily.summary + " Todays High: " + body.daily.data[0].temperatureHigh + " Todays Low: " + body.daily.data[0].temperatureLow )
        }
    })
}
module.exports = weather 