const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db.js');
const { route } = require('.');

// LISTA todos los restaurantes
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM restaurants', (err, rows, fields) => {
    console.log('select restaurants');
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// LISTA restaurante especifico 
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM restaurants WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
});

// REGISTRA restaurante
router.post('/', (req, res) => {
    const { id, rating, name, site, email, phone, street, city, state, lat, lng } = req.body;
    console.log(id, rating, name, site, email, phone, street, city, state, lat, lng);
    const query = `
      INSERT INTO restaurants (id, rating, name, site, email, phone, street, city, state, lat, lng) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id, rating, name, site, email, phone, street, city, state, lat, lng], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Restaurante registrado'});
      } else {
        console.log(err);
      }
    });
});

// ACTUALIZA restaurante
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { rating, name, site, email, phone, street, city, state, lat, lng } = req.body;  
    console.log(id, rating, name, site, email, phone, street, city, state, lat, lng);

    const query = `
      UPDATE restaurants SET rating =?, name=?, site=?, email=?, phone=?, street=?, city=?, state=?, lat=?, lng=? 
      WHERE id =? `;
    mysqlConnection.query(query, [rating, name, site, email, phone, street, city, state, lat, lng, id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Restaurante actualizado'});
      } else {
        console.log(err);
      }
    });
});

// BORRA Restaurante
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM restaurants WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Restaurante eliminado'});
      } else {
        console.log(err);
      }
    });
});

// Endpoint: /restaurants/statistics?latitude=x&longitude=y&radius=z
router.get('/statistics', (req, res) => {
    const { latitude, longitude, radius } = req.body;
    console.log(latitude, longitude, radius);

    //mysqlConnection.query('SELECT * FROM restaurants WHERE lat = ? ', [latitude], (err, rows, fields) => {
    mysqlConnection.query('SELECT * FROM restaurants', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }); 
  
});

module.exports = router;
