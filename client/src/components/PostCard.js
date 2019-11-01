import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comment" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("delete post")}
            style={{
              float: "right"
            }}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
export default PostCard;
