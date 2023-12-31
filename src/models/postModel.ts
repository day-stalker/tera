export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}