const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employee = require('./helpers/employeeModel')
const hbs = require('hbs')
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('connection successfull ')
    }
    else {
        console.log('error occured' + err)
    }
})
function sendResponse(res, err, data) {
    if (err) {
        res.render('error', {
            success: false,
            message: err
        })
    } else if (data.length == 0) {
        res.render('notfound', {
            success: false,
            message: "Not Found"
        })
    } else {
        res.render('index', {
            success: true,
            data: data
        })
    }
}
function sendeach(res, err, data) {
    if (err) {
        res.render('error', {
            success: false,
            message: err
        })
    } else if (data.length == 0) {
        res.render('notfound', {
            success: false,
            message: "Not Found"
        })
    } else {
        res.render('each', {
            success: true,
            data: data
        })
    }
}
app.get('/ello', (req, res) => {
    res.send("working")
})

//get all employees 
app.get('/', (req, res) => {
    employee.find({}).exec((err, data) => {
        sendResponse(res, err, data)
    })
})
app.get('/employees/:id', (req, res) => {
    employee.findById(req.params.id).exec((err, data) => {
        sendeach(res, err, data)
    })
})
//finter by category
app.get('/employees/category/:category', (req, res) => {
    employee.find({ category: req.params.category }, (err, data) => {
        sendResponse(res, err, data)
    })
})
//filter by atwork
app.get('/employees/atWork/:atWork', (req, res) => {
    let { atWork } = req.params
    let flag = false
    if (atWork == "true") {
        flag = true
    }
    employee.find({ atWork: flag }, (err, data) => {
        sendResponse(res, err, data)
    })
})
//filter by company 
app.get('/employees/company/:company', (req, res) => {
    employee.find({ company: req.params.company }, (err, data) => {
        sendResponse(res, err, data)
    })
})

//filter by salary 
app.get('/salary', (req, res) => {
    employee.find({}).sort({ salary: 0 }).exec((err, data) => {
        sendResponse(res, err, data)
    })
})

//filter by rating 
app.get('/rating', (req, res) => {
    employee.find({}).sort({ rating: -1 }).exec((err, data) => {
        sendResponse(res, err, data)
    })
})

app.listen(port, () => {
    console.log(port)
})  