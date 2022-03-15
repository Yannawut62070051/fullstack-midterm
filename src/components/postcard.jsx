import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCard = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/post", {state: {post : props,author: props.author, categories: props.category, tags: props.tag}});
  };
  const routeAuth = () => {
    navigate("/authors");
  };

  return (
    <Col md={4}>
      <Card style={{  marginBottom: 20, padding: 0 }}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={3} onClick={()=>routeAuth()}>
                <Image src={props.author.avatar_urls[96]} fluid roundedCircle />
                <p
                  style={{
                    fontSize: 12,
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 6,
                  }}
                >
                  {props.author.name}
                </p>
              </Col>
              <Col md={9}>
                <Row>
                  <h4>{props.title}</h4>
                </Row>
                <Row>
                  <p style={{ fontSize: 12, margin: 0, marginBottom: 2 }}>
                    {moment(props.date).format("MMMM Do, YYYY, h:mma")}
                  </p>
                </Row>
              </Col>
            </Row>
          </Card.Title>
          <h5 style={{ fontSize: 12, margin: 0, marginBottom: 2 }}>
            Categories & Tags
          </h5>
          <Card.Text>
            {props.category.map((item, index) => {
              return <Category key={index} category={item}></Category>;
            })}
            {props.tag.map((item, index) => {
              return <Tag key={index} tag={item}></Tag>;
            })}
          </Card.Text>
          <Button
            variant="secondary"
            style={{ fontSize: 13, margin: 0 }}
            onClick={routeChange}
          >
            Read this post
          </Button>
        </Card.Body>
      </Card>
    </Col>
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

export default PostCard;
