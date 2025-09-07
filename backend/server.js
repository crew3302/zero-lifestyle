// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Zero API Running');
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // Use order routes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));