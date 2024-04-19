import { useState } from "react";

const Postform = (props) => {
  const [userComment, setUserComment] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    props.postComment(userComment);
    setUserComment("");
  };

  return (
    <form className="mb-3 container">
      <label htmlFor="commentContent">Your Comment</label>
      <textarea
        className="form-control auto-size mb-3"
        id="commentContent"
        rows="1"
        placeholder="Enter your comment"
        value={userComment}
        onChange={(e) => setUserComment(e.target.value)}
      ></textarea>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post Comment
      </button>
    </form>
  );
};
export default Postform;
