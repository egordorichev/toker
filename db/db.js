const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/toker').catch(error => {
	console.error(error)
})