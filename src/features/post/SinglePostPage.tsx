import { useSelector } from "react-redux";
import { getPostById } from "./postSlice";
import { RootState } from "../../store/store";

import { useParams } from "react-router-dom";

//components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";



function SinglePostPage() {
    const {postId} = useParams()
  const post = useSelector((state: RootState) => getPostById(state, String(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.body}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}

export default SinglePostPage;
