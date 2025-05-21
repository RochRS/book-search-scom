import axios from "axios";

export const api = axios.create({
  baseURL: "https://openlibrary.org",
});

export async function fetchBooksFromOpenLibrary(query: string, page: number) {
  const response = await api.get("/search.json", {
    params: { q: query, page },
  });

  const books = response.data.docs.map((doc: any) => ({
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name || [],
    cover_i:
      doc.cover_i || "https://placehold.co/000000/FFFFFF/100x100?text=No+image", // include cover ID if available
  }));

  return {
    books,
    total: response.data.numFound,
  };
}

export async function getBookDetails(workId: string) {
  const response = await api.get(`/${workId}.json`);
  return response.data;
}
