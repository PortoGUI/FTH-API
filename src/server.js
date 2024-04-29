const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});