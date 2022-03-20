import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AddPost.css";

const AddPost = ({ getPost }) => {
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const bodyHandler = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (title === "" || title.length === 0) {
      alert("Title field cannot be empty. Please enter a valid title.");
      return;
    }
    if (body === "" || body.length === 0) {
      alert("Content field cannot be empty. Please enter a valid content.");
      return;
    }

    let post;

    post = {
      userId: Math.floor(Math.random() * 100000),
      title: title.trim(),
      body: body,
    };

    setTitle("");
    setBody("");

    addNewPost(post);

    setFormIsSubmitted(true);
  };

  const addNewPost = async (post) => {
    setIsError(false);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) {
        window.alert(
          `Something went wrong and your post cannot be uploaded. Refresh the page and try again.`
        );
        setIsError(true);
      }

      const data = await res.json();

      console.log(data);
      getPost(data);
    } catch (err) {
      setIsError(true);
      setErrMsg("Your post cannot be uploaded.");
      console.error(errMsg);
    }
  };

  return (
    <>
      <div className="empty"></div>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.2,
        }}
        className="form-component"
      >
        {!formIsSubmitted && (
          <>
            <h1>NEW POST</h1>
            <Form onSubmit={submitHandler} className="form">
              <Form.Group className="mb-3" controlId="title-input">
                <Form.Label className="form-label">
                  <b>YOUR TITLE</b>
                </Form.Label>
                <Form.Control
                  className="form-placeholder-input"
                  placeholder="enter text"
                  value={title}
                  onChange={titleHandler}
                  as="textarea"
                  rows={1}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="content-input">
                <Form.Label className="form-label">
                  <b>YOUR CONTENT</b>
                </Form.Label>
                <Form.Control
                  className="form-placeholder-input"
                  placeholder="enter text"
                  value={body}
                  onChange={bodyHandler}
                  as="textarea"
                  rows={4}
                />
              </Form.Group>

              <Button
                className="form-btn"
                onClick={submitHandler}
                variant="light"
              >
                <b>UPLOAD</b>
              </Button>
            </Form>
          </>
        )}

        {formIsSubmitted && (
          <div>
            <h2>Your post's been uploaded successfully.</h2>
            <Link className="form-btn-link" to="/">
              <Button className="form-btn" variant="light">
                <b>CHECK ALL POSTS</b>
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </>
  );
};
export default AddPost;
