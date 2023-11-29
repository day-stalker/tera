import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dbInit } from './db/db_init';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = 3001;

dbInit();

app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postRoutes);
app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

