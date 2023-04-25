require('dotenv/config');
require('./db');
const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config/session.config')(app);
require('./config')(app);

const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

app.use(function(req, res, next) {
    if (req.session.currentUser) {
      res.locals.user = req.session.currentUser;
    }
    next();
  });

require('./error-handling')(app);

module.exports = app;


