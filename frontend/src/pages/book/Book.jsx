import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./book.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowBook from "../../components/showBook/ShowBook";

export default function Book() {
  const [user, setUser] = useState({});

  const userName = useParams().userName;
  const [postBook, setPostBook] = useState({});

  const bookId = useParams().id;
  //const username = useParams().userName;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userName=${userName}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userName]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/book/${bookId}`);
      setPostBook(res.data);
    };
    fetchUser();
  }, [bookId]);

  return (
    <>
      <Topbar></Topbar>
      <div className="bookContainer">
        <Sidebar user={user}></Sidebar>
        <ShowBook postBook={postBook}></ShowBook>
      </div>
    </>
  );
}
