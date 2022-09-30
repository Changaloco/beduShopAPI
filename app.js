require('./config/passport');
const express = require('express');
const sequelize = require('./config/bd');
const app = express();
const auth = require('./config/auth');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Rutas
app.use(auth.optional);
app.use('/v1', require('./routes'));
const PORT = 4001;


try {
  sequelize.authenticate();
  sequelize.sync();
  console.log('Conectao a la DB');
} catch (error) {
  console.log('No jalo la base de datos:', error);
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});