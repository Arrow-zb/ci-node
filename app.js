const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const CI = require('./utils/ci.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.post('/arrow-note', (req, res, next) => {
  CI(req, res);
});

// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function(err, req, res, next) {
  // 设置局部变量，只在开发中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页
  res.status(err.status || 500);
  res.send('请求失败！')
});

module.exports = app;
