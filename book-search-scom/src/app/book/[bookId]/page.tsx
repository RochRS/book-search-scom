"use client";

import styles from "@/css/details.module.css";
import { getBookDetails } from "@/lib/openLibrary";
import { Button, Card, Image, Spin, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

interface BookDetail {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  authors?: { author: { key: string } }[];
  created?: { value: string };
}

export default function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const router = useRouter();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getBookDetails(bookId);
        setBook(data);
      } catch (error) {
        console.error("Failed to load book details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [bookId]);

  const getDescription = () => {
    if (!book?.description) return "No description available.";
    return typeof book.description === "string"
      ? book.description
      : book.description.value;
  };

  const coverUrl = book?.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button color="red" type="primary" onClick={() => router.back()}>
          ← Back to results
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Card className={styles.card}>
          <div className={styles.content}>
            <Image
              className={styles.cover_image}
              alt={book?.title}
              src={coverUrl}
              preview={false}
            />
            <div className={styles.text}>
              <Title level={3}>{book?.title}</Title>
              <Paragraph strong>Author Key(s):</Paragraph>
              <Paragraph>
                {book?.authors?.map((a) => a.author.key).join(", ") ||
                  "Unknown"}
              </Paragraph>

              <Paragraph strong>Published:</Paragraph>
              <Paragraph>
                {book?.created?.value?.split("T")[0] || "N/A"}
              </Paragraph>

              <Paragraph strong>Description:</Paragraph>
              <Paragraph>{getDescription()}</Paragraph>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
