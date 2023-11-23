import { useSelector,useDispatch } from "react-redux";
import { selectAllPost,getPostStatus,getPostError,fetchPosts } from "./postSlice";

import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { RootState } from "../../store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

function PostLists() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<ThunkDispatch<RootState,any, AnyAction>>();

  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  useEffect(() => {
     if(postStatus === "idle"){
       dispatch(fetchPosts())
     }
  },[dispatch, postStatus])


  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p> 
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostsExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content = <p>{error}</p>
  }
  

  return (
    <section className="posts-list">
      {/* <h2>Posts</h2> */}
      {content}
    </section>
  );
}

export default PostLists;
