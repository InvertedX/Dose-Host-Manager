// Creates a hot reloading development environment

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./config/webpack.config.development');

const app = express();
const compiler = webpack(config);

// Apply CLI dashboard for your webpack dev server
compiler.apply(new DashboardPlugin());

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

function log() {
  arguments[0] = '\nWebpack: ' + arguments[0];
  console.log.apply(console, arguments);
}

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: "/",
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/css/*', (req, res) => {
    res.sendFile(path.join(__dirname, './src/app.html'),{
        headers:{
            "Content-Type":"text/css"
        }
    });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/app.html'));
});

app.listen(port, host, (err) => {

  if (err) {
    log(err);
    return;
  }
  const exec = require('child_process').exec;
  exec("cd src && electron main.dev.js", (err, stdout, stderr) => {
    if (err) {
      log(err);
      return;
    }
    log("Electron Started");
   });


  log(' App is listening at http://%s:%s', host, port);
});
