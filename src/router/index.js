const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');


const router = express.Router();

router.use('/api', apiRoutes);

router.use('/users', userRoutes);

module.exports = router;