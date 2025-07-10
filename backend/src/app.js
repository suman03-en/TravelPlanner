import express from 'express';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';

const app = express();
app.use(express.json());

//routes
app.use('/api/users',userRoutes);
app.use('/api/trips',tripRoutes);


export default app;
