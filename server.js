const path = require ('path');
const express = require ('express');
const db = require('./config/connector.js');



const routes = require('./controllers');
// const { db } = require('./schemas/user');
// const hbs = require('handlebars');



const app = express();
const PORT = process.env.PORT || 3001;





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}!`);
    });
  });