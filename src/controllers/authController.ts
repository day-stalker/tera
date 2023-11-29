import { Request, Response } from 'express';
import { db } from '../db/db_connection';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User = await db.one('SELECT * FROM users WHERE email = $1', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = await db.one(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    //do not repeat this at home
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};