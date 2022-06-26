const express = require('express');
const env = require('./config/envConfig');
const cors = require('cors');
const connect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
// database connection

connect();
//console.log(env);
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to daily shopping service' });
});

app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
const port = env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port number: ${port}`);
});
