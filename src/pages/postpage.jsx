import { Row, Col, Button, Container, Card, Modal, Form} from "react-bootstrap";
import { useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
// import {FontAwesomeIcon} from 'font-awesome'

const PostPage = () => {
  const localProps = useLocation();
  const props = localProps.state;
  const [comments, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const findComment = () => {
    var ments = comments.filter((com) => com.post === props.post.id);
    // console.log(ments);
    return ments;
  };
  function refreshPage() {
    window.location.reload(false);
  }

  const addComment = () => {
    fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': "Basic ZnN3ZDpmc3dkLWNtcw=="
      },
        body: JSON.stringify({
            post: props.post.id,
            parent: 0,
            author_name: authorName,
            author_url: "",
            date: new Date().toISOString(),
            date_gmt: new Date().toISOString(),
            content: content,
            link: "",
            type: "comment",
            meta: [],
        }),
    })
        .then(response => response.json())
        handleClose()
        refreshPage()
    }

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
  }, []);

  //   console.log(props.post.id, comments);
  return (
    <div>
      <Container>
        <Row>
          <Col md={12} style={{ marginBottom: 20, marginTop: 20 }}>
            <h2>
              {props.post.title}{" "}
              {props.categories.map((item, index) => {
                return <Category key={index} category={item}></Category>;
              })}
              {props.tags.map((item, index) => {
                return <Tag key={index} tag={item}></Tag>;
              })}
            </h2>
            Posted by <b>{props.author.name}</b>{" "}
            {moment(props.post.date).format("MMMM Do, YYYY, h:mma")}
            <div
              style={{ marginBottom: 20, marginTop: 20, width: "100%" }}
              dangerouslySetInnerHTML={{ __html: props.post.content.rendered }}
            />
            <Row>
              <Col md={6}>Comment</Col>
              <Col md={6} style={{ textAlign: "right" }}>
                <Button variant="success" onClick={handleShow}>
                  + เพิ่มคอมเมนต์
                </Button>
              </Col>
            </Row>
            {findComment().map((item, index) => {
              return <Comment key={index} {...item} />;
            })}
          </Col>
        </Row>
        <Row>
          <Col md={12} id="comment"></Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control
                      placeholder="Author Name"
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      placeholder="Content"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={addComment}>add Comment</Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

const Comment = (prop) => {
  //   console.log("prop", prop);
  return (
    <Card style={{ marginBottom: 0 }}>
      <Card.Body>
        <Col md={12}>
          <h5>{prop.author_name}</h5>
          {moment(prop.date).format("MMMM Do, YYYY, h:mma")}
          <div
            style={{ marginBottom: 20, marginTop: 20, width: "100%" }}
            dangerouslySetInnerHTML={{ __html: prop.content.rendered }}
          />
        </Col>
      </Card.Body>
    </Card>
  );
};

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
