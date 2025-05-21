"use client";

import Searchbar from "@/components/SearchBar";
import BookTable from "@/components/Table";
import styles from "@/css/home.module.css";
import store from "@/store";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <div className={styles.searchbarDiv}>
          <Searchbar />
        </div>
        <BookTable />
      </div>
    </Provider>
  );
}
