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

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cookieParser());

// Routes
app.use('/api/v1/books', BooksRoutes);
app.use('/api/v1/users',UserRoutes)
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/admin',AdminRoutes)
app.use('/api/v1/products',ProductRoutes)

// Global error handler (must be after routes)
app.use(globalErrorHandler);

export default app;
