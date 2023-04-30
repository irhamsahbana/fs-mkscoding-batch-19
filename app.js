const express = require('express');
const app = express();
const session = require('express-session')

const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.set("view engine", "ejs");

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    cookie: { maxAge: oneDay },
    resave: false,
    saveUninitialized: true
}));

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);


app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});