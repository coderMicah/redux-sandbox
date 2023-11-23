import { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUser } from "../users/usersSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";


export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch<ThunkDispatch<RootState, { title: string, content: string, userId: string }, AnyAction>>();

  const users = useSelector(selectAllUser);

  const onTitleChanged = (e: { target: { value: SetStateAction<string> } }) =>
    setTitle(e.target.value);
  const onContentChanged = (e: { target: { value: SetStateAction<string> } }) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: { target: { value: SetStateAction<string> } }) =>
    setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body:content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.log("failed to post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
