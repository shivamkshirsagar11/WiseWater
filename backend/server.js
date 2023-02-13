import express, { json, urlencoded } from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyparser from 'body-parser';
import  errorHandler  from './middleware/errorMiddleware.js';
import  userTypeHandler  from './middleware/userTypeMiddleware.js';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../.env' })

// rest object
const app = express();

// connect to database
connectDB();

// middleware
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use('/', userTypeHandler);

// app.get('/', (req, res) => {
//     res.send('yo man');
// });


// routes
import userRoutes from  './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/customer', customerRoutes);
app.use(errorHandler);

// port
const PORT = process.env.PORT || 3001;
// listening port
app.listen(PORT, () => { console.log(`server is listening on PORT: ${PORT}`) })