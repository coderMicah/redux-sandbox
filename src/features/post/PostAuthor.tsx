import { useSelector } from "react-redux";
import { selectAllUser } from "../users/usersSlice";

interface Props {
  userId: string;
}
const PostAuthor = ({ userId }: Props ) => {
  const users = useSelector(selectAllUser);
  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
