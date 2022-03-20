import { useState, useEffect } from "react";
import Navigation from "../layout/Navigation";
import Posts from "./Posts";
import { Routes, Route, Navigate } from "react-router-dom";
import AddPost from "./AddPost";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [postAPI, setPostAPI] = useState({});
  const getPost = (post) => {
    setPostAPI(post);
  };

  const fetchPosts = async () => {
    setIsError(false);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) {
        window.alert(
          `Something went wrong and posts cannot be load. Please try refreshing the page.`
        );
        setIsError(true);
      }

      const data = await res.json();

      setPosts(data);
    } catch (err) {
      setIsError(true);
      setErrMsg("Posts cannot be load.");
      console.error(errMsg);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPosts((oldArray) => [postAPI, ...oldArray]);
  }, [postAPI]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Posts posts={posts} errMsg={errMsg} />}
        ></Route>
        <Route path="/add" element={<AddPost getPost={getPost} />}></Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default Home;
