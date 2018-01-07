import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import compression from 'compression';
import morgan from 'morgan';
import event from 'events';
import io from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import multer from 'multer';
import fs from 'fs';
import passportLocalMongoose from 'passport-local-mongoose';
import postRoutes from './routes/posts.routes';
import commentRoutes from './routes/comments.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import seedDb from '../seed';
import {
    passportConfig
} from './config/passport.config';
import {
    socketFunction
} from './config/socket.io.config';
import path from 'path';
const logger = morgan(':method :url :status - :response-time ms')
const notifs = [];
const environment = process.env.NODE_ENV || 'development';
let url;

if (environment === 'test') {
    url = 'mongodb://localhost/blog-test'
} else if (environment === 'development' || environment === 'production') {
    url = 'mongodb://localhost/blog';
}

mongoose.connect(url);
const sanitizer = require('sanitize-html');
// Add headers
const app = express();
// seedDb();
const localEvent = event.EventEmitter;
const myEvent = new localEvent();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Access-Control-Allow-Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
app.use(compression())
app.use(logger);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'Blog session',
    resave: false,
    saveUninitialized: false
}))
passportConfig(app);
app.use(postRoutes);
app.use(commentRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(express.static(path.join(process.env.PWD, '/client')))
app.use(express.static(path.join(process.env.PWD, 'node_modules')))
app.use(express.static(path.join(process.env.PWD, 'uploads')))

const adminRoutes = ['/admin/', '/admin/:var', '/admin/edit/:var'];
adminRoutes.forEach(function(url) {
    app.get(url, (req, res) => {
        res.sendFile(path.join(process.env.PWD, '/client', '/dashboard', '/index.html'));
    })
})
const blogRoutes = ['/', '/articles', '/articles/:url', '/contact', '/about'];
blogRoutes.forEach(el => {
    app.get(el, (req, res) => {
        res.sendFile(path.join(process.env.PWD, '/client', '/blog', '/blog.html'));
    })
})

const port = process.env.PORT || 6655;
const ip = process.env.IP || 'localhost';

const server = app.listen(port, ip, () => {
    console.log(`Express server listening on port ${port} and IP ${ip} and running in ${environment} mode`);
});
var socket = io(server)
socketFunction(socket, notifs)
