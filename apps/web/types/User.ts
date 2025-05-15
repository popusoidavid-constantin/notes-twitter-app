import { Role } from "./Role";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  notes: Note[];
  posts: Post[];
  likes: Like[];
  comments: Comment[];
  sharedNotes: SharedNote[];
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  authorId: string;
  author?: User;
  sharedWith: SharedNote[];
  createdAt: string;
  updatedAt: string;
}

export interface SharedNote {
  id: string;
  noteId: string;
  teacherId: string;
  note?: Note;
  teacher?: User;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  authorId: string;
  author?: User;
  comments: Comment[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  postId: string;
  post?: Post;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  post?: Post;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  username: string;
}
