import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AuthorCard = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/home");
  };

//   console.log("asd", props);
  return (
    <Col md={6}>
      <Card style={{ height: 200, marginBottom: 20, padding: 0 }}>
        <Card.Body>
          <Card.Title style={{ height: 120 }}>
            <Row>
              <Col md={4}>
                <Image src={props.avatar_urls[96]} style={{ width: 150 }} />
              </Col>
              <Col md={8}>
                <Row>
                  <h3>
                    {props.name}#{props.id}
                  </h3>
                  <h4>{props.slug}</h4>
                  <h5>{props.url ? props.url : "-"}</h5>
                </Row>
                <Button
                  variant="secondary"
                  style={{ fontSize: 13, margin: 0 }}
                  onClick={routeChange}
                >
                  Read our post
                </Button>
              </Col>
            </Row>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AuthorCard;
