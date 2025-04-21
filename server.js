// 1. Require necessary modules
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./src/movie/routes');

const app = express();
const port = 3000;

app.disable('x-powered-by');

// 2. Define CORS options
const allowedOrigins = ['http://localhost:5500']; // Frontend origin

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request Origin:', origin); // Debugging line
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = 'CORS policy: No access from the specified origin.';
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// 3. Apply CORS middleware (before routes)
app.use(cors(corsOptions));

// (Optional) Handle preflight requests manually
app.options('*', cors(corsOptions)); // Enable pre-flight across the board

// Apply other middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/v1/movies', studentRoutes);

// Global error handler (to catch CORS errors too)
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
});

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}`));
