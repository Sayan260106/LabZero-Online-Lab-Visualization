
import { DiscussionPost, DiscussionComment } from '../types/types';
import { initDB } from './db';

const POSTS_STORE = 'posts';
const COMMENTS_STORE = 'comments';

// Posts
export const savePost = async (post: DiscussionPost): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(POSTS_STORE, 'readwrite');
    const store = transaction.objectStore(POSTS_STORE);
    const request = store.put(post);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getPostsByTopic = async (topicId: string): Promise<DiscussionPost[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(POSTS_STORE, 'readonly');
    const store = transaction.objectStore(POSTS_STORE);
    const index = store.index('topicId');
    const request = index.getAll(topicId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deletePost = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(POSTS_STORE, 'readwrite');
    const store = transaction.objectStore(POSTS_STORE);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Comments
export const saveComment = async (comment: DiscussionComment): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(COMMENTS_STORE, 'readwrite');
    const store = transaction.objectStore(COMMENTS_STORE);
    const request = store.put(comment);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getCommentsByPost = async (postId: string): Promise<DiscussionComment[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(COMMENTS_STORE, 'readonly');
    const store = transaction.objectStore(COMMENTS_STORE);
    const index = store.index('postId');
    const request = index.getAll(postId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(COMMENTS_STORE, 'readwrite');
    const store = transaction.objectStore(COMMENTS_STORE);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
