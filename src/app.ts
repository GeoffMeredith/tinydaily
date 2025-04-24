import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import homeRouter from './routes/home.router';
import sayingsRouter from './routes/sayings.router';
import subscriptionRouter from './routes/subscription.router';
import testRouter from './routes/test.router';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tinydaily';

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err: Error) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/', homeRouter);
app.use('/sayings', sayingsRouter);
app.use('/subscription', subscriptionRouter);
app.use('/test', testRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});