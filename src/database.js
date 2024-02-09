const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost/mern'

mongoose.connect(MONGO_URI)
.then(DB => console.log("DB is connected"))
.catch(err=>console.error(error));

module.exports = mongoose;