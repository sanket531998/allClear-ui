import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/index.ts'

const ARTICLE_API_URL = 'http://localhost:5000/api/v1/articles';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  try {
    const response = await axiosInstance.get(ARTICLE_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
});

const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        loading: true,
        error: null as string | null
    },
    reducers: {
        addArticle: (state, action) => {
            state.articles.push(action.payload);
        },
        removeArticle: (state, action) => {
            state.articles = state.articles.filter(article => article.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch news';
            });
    }
});

export const { addArticle, removeArticle } = articleSlice.actions;
export default articleSlice.reducer;