const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const userRoute = require('./route/users');
const authRoute = require('./route/auth');
dotenv.config();

mongoose.connect(process.env.MONGO_DB, () => {
  console.log('we are working');
});
// middlewere check this
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(8800, () => console.log('server runnings '));

app.get('/', (req, res) => {
  res.send('welcome home');
});
app.get('/users', (req, res) => {
  res.send('welcome homeusers');
});
