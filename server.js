const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./models');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgers_controller.js');

app.use(routes);
const PORT = process.env.PORT || 8080;
db.sequelize.sync({}).then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
});