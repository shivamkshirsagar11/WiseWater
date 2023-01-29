const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const { userTypeHandler } = require('./middleware/userTypeMiddleware');

// dotenv configt
const dotenv = require('dotenv').config();

// rest object
const app = express();

// connect to database
connectDB();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', userTypeHandler);

// app.get('/', (req, res) => {
//     res.send('yo man');
// });


// routes
app.use('/api/user', require('./routes/userRoutes.js'));
app.use('/api/owner', require('./routes/ownerRoutes.js'));
app.use('/api/worker', require('./routes/workerRoutes.js'));
app.use('/api/customer', require('./routes/customerRoutes.js'));
app.use(errorHandler);

// port
const PORT = process.env.PORT || 3001;

// listening port
app.listen(PORT, () => { console.log(`server is listening on PORT: ${PORT}`) })