const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const config = require('../webpack.config.js');
const compiler = webpack(config);
const dotenv = require('dotenv');
const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

dotenv.config();

//  Settings
app.set('port', process.env.PORT || 3000);

// DB Connection
const { mongoose } = require('./database');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

//  Routes
app.use('/api/tasks', require('./routers/task.routes'));
// app.use('/api/tasks',require('./routers/task.routes'));

// Static files
// console.log(dirname);
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})