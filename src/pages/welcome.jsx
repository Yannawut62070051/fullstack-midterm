import { useEffect, useState } from "react";
import PostCard from "../components/postcard";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col,Button } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";

function Welcome() {
  //   console.log("tag", authors);
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/home");
  };
  return (
    <div id="allPostTitle">
      <Container style={{ marginTop: "10%" }}>
        <h1>CMS </h1>
        <Row>
          <ReactTypingEffect style={{fontSize:35}} text={["62070051 Yannawut Sreetong", "Welcome to Full-Stack Develop"]} speed={50} eraseSpeed={50}/>
    
        </Row>
        <Button
            variant="secondary"
            style={{ fontSize: 13, marginTop: 20 }}
            onClick={routeChange}
          >
           Get Start
          </Button>
        <Row>
    
        </Row>
      </Container>
    </div>
  );
}
export default Welcome;
