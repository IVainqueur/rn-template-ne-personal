import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from './axios.config';
import {Post, Comment} from './types';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PostsContextType {
  posts: Post[];
  comments: Comment[];
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: number) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
  createPost: (post: Post) => Promise<void>;
  loadingPosts: boolean;
  loadingComments: boolean;
  deletingPost: boolean;
  creatingPost: boolean;
  reset?: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider = ({children}: {children: React.ReactNode}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const toast = useToast();

  const fetchComments = async (postId: number) => {
    setLoadingComments(true);
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
      toast.show('Failed to fetch comments', {type: 'danger'});
    } finally {
      setLoadingComments(false);
    }
  };

  const savePostsToStorage = async (posts: Post[]) => {
    try {
      const jsonValue = JSON.stringify(posts);
      await AsyncStorage.setItem('@posts', jsonValue);
    } catch (e) {
      console.error('Saving posts to storage failed', e);
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem('@posts');
      fetchPosts();
    } catch (e) {
      console.error('Failed to reset posts', e);
    }
  };

  const createPost = async (post: Post) => {
    setCreatingPost(true);
    try {
      await axios.post('/posts', post);
      const newPosts = [post, ...posts];
      setPosts(newPosts);
      await savePostsToStorage(newPosts);
      toast.show('Post created successfully', {type: 'success'});
    } catch (error) {
      console.error('Failed to create post', error);
      toast.show('Failed to create post', {type: 'danger'});
    } finally {
      setCreatingPost(false);
    }
  };

  const deletePost = async (postId: number) => {
    setDeletingPost(true);
    try {
      await axios.delete(`/posts/${postId}`);
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      await savePostsToStorage(updatedPosts);
      toast.show('Post deleted successfully', {type: 'success'});
    } catch (error) {
      console.error('Failed to delete post', error);
      toast.show('Failed to delete post', {type: 'danger'});
    } finally {
      setDeletingPost(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const storedPosts = await AsyncStorage.getItem('@posts');
      if (storedPosts !== null) {
        setPosts(JSON.parse(storedPosts));
      } else {
        const response = await axios.get('/posts');
        setPosts(response.data);
        await savePostsToStorage(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch or load posts', error);
      toast.show('Failed to fetch posts', {type: 'danger'});
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        comments,
        fetchPosts,
        fetchComments,
        deletePost,
        createPost,
        loadingPosts,
        loadingComments,
        deletingPost,
        creatingPost,
        reset,
      }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
