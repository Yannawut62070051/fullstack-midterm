import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AuthorCard from "../components/authorcard";

const Author = () => {
  const [author, setauthor] = useState([]);
  useEffect(() => {
    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/users")
      .then((res) => {
        res.json().then((r) => {
          setauthor(r);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });
  }, []);
  console.log("authors page", author);
  return (
    <Container>
      <Row>
        <Col md={12} style={{ marginBottom: 20, marginTop: 20 }}>
          <h2>AuthorPage</h2>They are author members.
        </Col>
      </Row>
      <Row>
        {author.map((auth) => {
          return <AuthorCard key={auth.id} {...auth} />;
        })}
      </Row>
    </Container>
  );
};
export default Author;
