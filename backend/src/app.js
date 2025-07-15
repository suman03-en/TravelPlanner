import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import planRoutes from './routes/planRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users',userRoutes);
app.use('/api/trips',tripRoutes);
app.use('/api/plans',planRoutes); // only delete
app.use('/api/documents',documentRoutes); // only delete

//Handles if not defined routes are requested
app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:'Route not found',
    });
});

//error handler middleware
app.use(errorHandler);

export default app;
