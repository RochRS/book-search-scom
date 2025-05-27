import { fetchBooksFromOpenLibrary } from "@/lib/openLibrary";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a book item
interface Book {
  key: string;
  title: string;
  author_name: string[];
}

// Define the shape of the search-related state
interface SearchState {
  query: string;
  books: Book[];
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

// Initial state of the search slice
const initialState: SearchState = {
  query: "",
  books: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

// Async thunk to fetch books based on a search query and page number
export const fetchBooks = createAsyncThunk(
  "search/fetchBooks",
  async ({ query, page }: { query: string; page: number }) => {
    // Call the Open Library fetch function and pass query + page
    const response = await fetchBooksFromOpenLibrary(query, page);
    // Return the response along with query and page to be used in the reducer
    return { ...response, query, page };
  }
);

// Create the search slice with reducers and async handlers
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Synchronous reducer to update the search query
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state of fetchBooks (loading started)
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful response from fetchBooks
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
      })
      // Handle error state if fetchBooks fails
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
