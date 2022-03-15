import { Row, Col, Button, Container } from "react-bootstrap";
import {  useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
// import {FontAwesomeIcon} from 'font-awesome'

const PostPage = () => {
  const localProps = useLocation();
  const props = localProps.state;
  const [comments, setComment] = useState([]);

  const findComment = (postId) => {
    var ments = comments.filter((com) => com.post === postId)[0]
        // console.log(ments)
      return ments;
  };

  // let navigate = useNavigate();
  //   const routeChange = () =>{
  //       navigate('/addComment', {state: {
  //         post: localProps.state.post,
  //         categories: localProps.state.categories,
  //         tags: localProps.state.tags
  //       }})
  //   }
  useEffect(() => {
    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/comments")
      .then((res) => {
        res.json().then((cm) => {
          setComment(cm);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });
    },[])

    console.log(props.post.id,comments)
  return (
    <div>
      <Container >
        <Row>
          <Col md={12} style={{ marginBottom: 20, marginTop: 20 }}>
            <h2>{props.post.title} {props.categories.map((item, index) => {
              return <Category key={index} category={item}></Category>;
            })}
            {props.tags.map((item, index) => {
              return <Tag key={index} tag={item}></Tag>;
            })}</h2>
            Posted by <b>{props.author.name}</b>{" "}
            {moment(props.post.date).format("MMMM Do, YYYY, h:mma")}
            <div style={{ marginBottom: 20, marginTop: 20 ,width:"100%"}} dangerouslySetInnerHTML={{__html: props.post.content.rendered}} />
            {props.tags.map((item, index) => {
              return <Comment key={index} tag={item}/>;
            })}
          </Col>
        </Row>
        <Row>
          <Col md={12} id="comment"></Col>
        </Row>
      </Container>
    </div>
  );
};

const Comment = (prop) => {
    return (
        <Button variant="outline-primary" style={{ fontSize: 3, margin: 2 }}>
          {/* {prop.name} */}
        </Button>
      );
}

const Category = (prop) => {
  return (
    <Button variant="outline-primary" style={{ fontSize: 3, margin: 2 }}>
      {prop.category.name}
    </Button>
  );
};
const Tag = (prop) => {
  return (
    <Button variant="outline-success" style={{ fontSize: 3, margin: 2 }}>
      {prop.tag.name}
    </Button>
  );
};
export default PostPage;
