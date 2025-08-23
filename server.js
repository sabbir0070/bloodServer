// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// app.use(cors({
//   origin: "https://your-netlify-app.netlify.app"
// }));


const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/donors', require('./routes/donors'));

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => res.json({ message: "API is running" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
