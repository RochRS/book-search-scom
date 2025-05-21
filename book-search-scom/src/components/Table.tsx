"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBooks } from "@/store/searchSlice";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";

const BookTable = () => {
  const dispatch = useAppDispatch();
  const { books, total, currentPage, query, loading } = useAppSelector(
    (state) => state.search
  );

  const columns: ColumnsType<any> = [
    {
      title: "Cover",
      dataIndex: "cover_i",
      key: "cover",
      render: (coverId: number) => (
        <img
          src={
            coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
              : "https://placehold.co/000000/FFFFFF/100x100?text=No+image" // Fallback image in your public folder
          }
          alt="Book cover"
          style={{ width: 50, height: "auto" }}
        />
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link href={`/book${record.key}`}>{text}</Link>,
    },
    {
      title: "Author",
      dataIndex: "author_name",
      key: "author",
      render: (authors: string[]) => authors?.join(", "),
    },
    {
      title: "Link",
      // dataIndex: "author_name",
      key: "author",
      render: (record) => (
        <Button type="dashed" href={`/book${record.key}`}>
          View Book
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.key}
      columns={columns}
      dataSource={books}
      size="small"
      pagination={{
        current: currentPage,
        total: total,
        pageSize: 10,
        showSizeChanger: false,
        onChange: (page) => {
          dispatch(fetchBooks({ query, page }));
        },
      }}
      loading={loading}
    />
  );
};

export default BookTable;
