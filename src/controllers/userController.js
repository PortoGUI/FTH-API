const pool = require('../DB/dbConfig');
const sha256 = require('sha-256-js');
const SUPER_KEY = '7b470d896ce2b479e7648e0391fe73ff1cf314f4b721fb69df75dc93785a5230';

const getUsers = (req, res) => {
  const query = 'SELECT * FROM "user"';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    } else {
      res.json(results.rows);
    }
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;


  const query = 'SELECT * FROM "user" WHERE id = $1';
  const values = [userId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuário pelo ID:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário pelo ID' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.json(results.rows[0]);
      }
    }
  });
};

const createUser = (req, res) => {
  const { name, document, email, login, password, type } = req.body;

  const hashedPassword = sha256(password + SUPER_KEY);

  const query = 'INSERT INTO "user" ("name", "document", "email", "login", "password", "type") VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [name, document, email, login, hashedPassword, type];

  // Executar a query
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};