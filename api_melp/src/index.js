const express = require('express');
const { request } = require('express')
const app = express();

const morgan = require('morgan');

// Configuraciones
app.set('port', process.env.PORT || 8000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
//app.use(morgan('combined'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/index'));
app.use('/v1/restaurants', require('./routes/restaurants'));

// Servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
  
module.exports = app