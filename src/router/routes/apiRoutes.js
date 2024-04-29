const express = require('express');
const DB = require("../../DB/dbConfig");
const router = express.Router();

router.get('/ping', (req, res) => {
  DB.query('SELECT NOW()', (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({error :'Erro ao tentar conectar-se.'});
    } else {
      res.json({message: 'Conexão bem-sucedida', date: result.rows[0].now});
    }
  });
});

module.exports = router;