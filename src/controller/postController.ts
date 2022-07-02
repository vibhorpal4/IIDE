import { Request, Response } from "express";
import db from "../configs/db";

export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: `Please provide title and content` });
  }
  const sql = "INSERT INTO posts SET ?";
  db.query(sql, { title, content }, (err) => {
    if (err) return res.status(500).json({ message: `Internal Server Error` });
    return res.status(201).json({ message: `Post created successfully` });
  });
};

export const getPosts = (req: Request, res: Response) => {
  db.query("SELECT * FROM posts", (err, posts) => {
    if (err)
      return res.status(500).json({ message: `Internal Server Error: ${err}` });
    return res
      .status(200)
      .json({ message: `Posts fetched successfully`, posts });
  });
};

export const getPostById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.query(`SELECT * FROM posts WHERE id = ${id}`, (err, post) => {
    if (err) return res.status(500).json({ message: `Internal Server Error` });
    if (post.length === 0)
      return res.status(404).json({ message: `Post not found` });

    return res.status(200).json({ message: `Post fetched successfully`, post });
  });
};

export const updatePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const sql = `UPDATE posts SET title = '${title}', content = '${content}' WHERE id = ${id}`;
  db.query(sql, (err) => {
    if (err) return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    return res.status(201).json({ message: `Post updated successfully` });
  });
};

export const deletePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = `DELETE FROM posts WHERE id = ${id}`;
  db.query(sql, (err) => {
    if (err) return res.status(500).json({ message: `Internal Server Error` });
    return res.status(200).json({ message: `Post deleted successfully` });
  });
};
