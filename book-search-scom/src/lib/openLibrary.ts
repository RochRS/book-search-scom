import axios from "axios";

// Creates an Axios instance with a base URL pointing to the Open Library API
export const api = axios.create({
  baseURL: "https://openlibrary.org",
});

// Function to fetch books from Open Library based on a search query and page number
export async function fetchBooksFromOpenLibrary(query: string, page: number) {
  // Make a GET request to /search.json with query parameters
  const response = await api.get("/search.json", {
    params: { q: query, page },
  });

  const books = response.data.docs.map((doc: any) => ({
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name || [],
    cover_i:
      doc.cover_i || "https://placehold.co/000000/FFFFFF/100x100?text=No+image",
  }));

  return {
    books,
    total: response.data.numFound,
  };
}

// Function to get book details by its ID (key)
export async function getBookDetails(bookId: string) {
  const response = await api.get(`works/${bookId}.json`);
  return response.data;
}
