import React, { useState } from "react";
import Modal from "../common/Modal";

const PostModal = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");

  const handlePost = () => {
    // As per user request, nothing actually gets posted
    console.log("Mock post:", text);
    setText("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="post-modal-compose">
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div className="post-modal-footer">
          <button
            className="post-modal-submit"
            onClick={handlePost}
            disabled={!text.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
