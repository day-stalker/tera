import { Request, Response } from 'express';
import { db } from '../db/db_connection';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.any('SELECT * FROM posts');
    console.log(JSON.stringify(posts));
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await db.one('SELECT * FROM posts WHERE id = $1', [postId]);
    res.json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addPost = async (req: Request, res: Response) => {
  const newPost = req.body;
  try {
    const post = await db.one(
      'INSERT INTO posts(title, description, imageurl, userId) VALUES($1, $2, $3, $4) RETURNING *',
      [newPost.title, newPost.description, newPost.imageurl, newPost.id]
    );
    res.json(post);
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const updatedPost = req.body;
  const postId = req.params.id;
  try {
    const post = await db.one(
      'UPDATE posts SET title = $1, description = $2, imageUrl = $3, userId = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [updatedPost.title, updatedPost.description, updatedPost.imageUrl, updatedPost.userId, postId]
    );
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    await db.none('DELETE FROM posts WHERE id = $1', [postId]);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};