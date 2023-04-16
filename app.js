const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.set("view engine", "ejs");

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});