import { fetchBooksFromOpenLibrary } from "@/lib/openLibrary";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  key: string;
  title: string;
  author_name: string[];
}

interface SearchState {
  query: string;
  books: Book[];
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  books: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "search/fetchBooks",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await fetchBooksFromOpenLibrary(query, page);
    return { ...response, query, page };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
