import { useState } from "react";
import { Modal, Card } from "react-bootstrap";
import "./PostModal.css";

const FAKE_UPDATED_POST_ID = 101;

const PostModal = ({ openModal, setOpenModal, post, posts }) => {
  const [selectedPost, setSelectedPost] = useState(post);
  const [fullscreen, setFullscreen] = useState(true);

  const [article, setArticle] = useState(
    posts.filter((p) => p.id === (post[0]?.postId || FAKE_UPDATED_POST_ID))
  );

  return (
    <Modal
      show={openModal}
      fullscreen={fullscreen}
      onHide={() => setOpenModal(false)}
    >
      <Modal.Header closeButton closeVariant="white" className="modal-header">
        <Modal.Title className="modal-title">
          <h1>
            <b>{article[0]?.title.toUpperCase()}</b>
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <div className="modal-text">
            <div className="modal-text-title">
              <b>{article[0]?.title.toUpperCase()}</b>
            </div>
            <div>
              {article[0]?.body[0].toUpperCase() + article[0]?.body.slice(1)}
              {article[0]?.body.repeat(8)}
              {article[0]?.body.trim()}.
            </div>
          </div>
          <img
            className="modal-img"
            src="https://www.therahnuma.com/wp-content/uploads/2019/06/ff5e18efa9d54665f32c9d612a92e50f.jpg"
          ></img>
        </div>

        <div className="modal-comments">
          <div>
            <span>
              <b>COMMENTS</b>
            </span>
          </div>

          {!selectedPost ||
            (selectedPost.length === 0 && <div>No comments yet.</div>)}

          {selectedPost.length !== 0 &&
            selectedPost.map((comment) => (
              <Card key={comment.id}>
                <Card.Body>
                  <Card.Title className="modal-comments-title">
                    <b>{comment.email.toLowerCase()} </b>
                    commented:{" "}
                  </Card.Title>
                  <Card.Subtitle className="modal-comments-subtitle">
                    <b>{comment.name.toUpperCase()}</b>
                  </Card.Subtitle>
                  <Card.Text>
                    {comment.body[0].toUpperCase() + comment.body.slice(1)}.
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
