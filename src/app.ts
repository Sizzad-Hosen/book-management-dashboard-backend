import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BooksRoutes } from './app/modules/books/book.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { UserRoutes } from './app/modules/users/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import { AdminRoutes } from './app/modules/Admin/admin.route';
import { ProductRoutes } from './app/modules/Product/product.route';
import { SalesRoutes } from './app/modules/Sales/sales.route';

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true, // <-- Add this line
  }));
  
app.use(express.json());


// Routes
app.use('/api/v1/books', BooksRoutes);
app.use('/api/v1/users',UserRoutes)
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/admin',AdminRoutes)
app.use('/api/v1/products',ProductRoutes)
app.use('/api/v1/sales',SalesRoutes)
// Global error handler (must be after routes)
app.use(globalErrorHandler);

export default app;
