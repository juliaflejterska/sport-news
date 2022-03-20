import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import PostModal from "./PostModal";
import "./Posts.css";
import { motion } from "framer-motion";

const Posts = ({ posts, errMsg }) => {
  const [post, setPost] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [pageNum, setPageNum] = useState(0);
  const postsPerPage = 12;
  const pagesVisited = pageNum * postsPerPage;
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const changePage = ({ selected }) => {
    setPageNum(selected);
    scrollToTop();
  };

  //////////////////////////

  const fetchSelectedPost = async (id) => {
    setIsError(false);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );

      if (!res.ok) {
        window.alert(
          `Something went wrong and this post cannot be load. Please try refreshing the page.`
        );
        setIsError(true);
      }

      const data = await res.json();

      setPost(data);

      setModalOpen(true);
    } catch (err) {
      setIsError(true);
      setErrorMsg("This post cannot be load.");
      console.error(errMsg);
    }
  };

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => (
      <>
        {!modalOpen && (
          <motion.div
            key={post.id}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
            }}
          >
            <Card style={{ width: "20rem" }} className="post-card">
              <div className="post">
                <Card.Img
                  variant="top"
                  src="https://www.therahnuma.com/wp-content/uploads/2019/06/ff5e18efa9d54665f32c9d612a92e50f.jpg"
                  className="post-img"
                />
                <Card.Body>
                  <Card.Title className="post-title">{post.title}</Card.Title>
                </Card.Body>

                <Button
                  className="post-btn"
                  variant="light"
                  onClick={() => {
                    fetchSelectedPost(post.id);
                  }}
                >
                  READ MORE
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </>
    ));

  ///!!!
  if (!posts || posts.length === 0) {
    return <div> {errMsg} </div>;
  }

  return (
    <>
      <div className="posts-list">
        <div className="posts" id="posts">
          {displayPosts}
        </div>
        {!modalOpen && (
          <div className="pagination">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination-container"}
              activeClassName={"pagination-container-active"}
              previousLinkClassName={"pagination-previous-next"}
              nextLinkClassName={"pagination-previous-next"}
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <PostModal
          openModal={modalOpen}
          setOpenModal={setModalOpen}
          posts={posts}
          post={post}
        />
      )}
    </>
  );
};

export default Posts;
