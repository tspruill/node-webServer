
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../hbs/views')
const partialPath = path.join(__dirname,'../hbs/partials')

//set up handlebars and view location
app.set('view engine','hbs')
app.set('views',viewPath)

//setup dynamiac partials 
hbs.registerPartials(partialPath)
// setup static directory to serve 
app.use(express.static(publicPath))



app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Tristen Spruill',
        Description: 'Home page of site'
    })
})

app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About',
        name: 'Tristen Spruill',
        Description:'Informing users what website is about'
    })
})
app.get('/help', (req,res)=> {
    res.render('help',{
        title:'Help',
        name: 'Tristen Spruill',
        Description: 'The help page'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide adress"
        })
    }
    geocode(req.query.address,(error,{latitude, longitude,placeName}={})=>{
        if(error){
            console.log(error)
            return res.send({
                error : error
            })
        }
        
        weather({latitude,longitude},(error, forecastData) =>{
           if(error){
            console.log(error)
            return res.send({
                error : error
            })
        }
            res.send({
        forcast: forecastData,
        location: placeName,
        address: req.query.address
    }) 
        })
    })
   
})

app.get('/products',(req,res)=>{
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: 'Help',
        name: 'No one'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title:'',
        name: 'No one'
    })
})
app.listen(port, () => {
    console.log("Server on port " + port)
})