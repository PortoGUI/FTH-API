const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router');
const DB = require('./DB/dbConfig')

const app = express();

app.use(bodyParser.json());
app.use(routes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  DB.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conexão bem-sucedida ao banco de dados:', res.rows[0].now);
    }
  });
});