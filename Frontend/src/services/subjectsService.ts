import axios from 'axios';
import { Subject } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const CACHE_KEY = 'labzero_subjects_cache';

export const getSubjects = async (): Promise<Subject[]> => {
  // Try to load from cache first for instant UI response
  const cached = localStorage.getItem(CACHE_KEY);
  let subjects: Subject[] = cached ? JSON.parse(cached) : [];

  try {
    const response = await axios.get<Subject[]>(`${API_URL}/subjects/`);
    const freshData = response.data;
    
    // Update cache with fresh data
    localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    // If we have cached data, return it to keep the app functional offline/slow-net
    if (subjects.length > 0) {
      console.log("Using cached subjects due to fetch failure.");
      return subjects;
    }
    throw error;
  }
};
