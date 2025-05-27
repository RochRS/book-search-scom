"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBooks, setQuery } from "@/store/searchSlice";
import { Input } from "antd";
import React, { useState } from "react";

const Searchbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.search);
  const [inputValue, setInputValue] = useState(query);

  // Function to handle search input
  const onSearch = async (value: string) => {
    if (!value.trim()) return;
    dispatch(setQuery(value));

    try {
      const resultAction = await dispatch(
        fetchBooks({ query: value, page: 1 })
      );
      if (fetchBooks.fulfilled.match(resultAction)) {
        // console.log("Fetched books:", resultAction.payload);
      } else {
        console.error("Failed to fetch books:", resultAction.error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Input.Search
      placeholder="Search books..."
      enterButton="Search"
      size="large"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onSearch={onSearch}
      allowClear
    />
  );
};

export default Searchbar;
