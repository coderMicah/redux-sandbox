import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Post } from "./postSlice";
import { Link } from "react-router-dom";

interface Props{
    post:Post
}

const PostsExcerpt = ({post}:Props) => {
  return (
    <article className="post-excerpt" >
    <h2>{post.title}</h2>
    <p className="post-content">{post.body.substring(0, 75)}...</p>
    <p className="post-credit">
      <Link to={`post/${post.id}`}>View Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
    </p>
    <ReactionButtons post={post} />
  </article>
  )
}

export default PostsExcerpt