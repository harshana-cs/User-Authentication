const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
// ✅ Connect to MongoDB
connectDB();
const app = express();



app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
