import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
// import HomePage from "./components/homePage";
import Homepage from "./pages/homepage";
import NavigationBar from "./components/navbar";
import PostPage from "./pages/postpage";
import Author from "./pages/authorpage";
import CateandTag from "./pages/categoryntags";
import "./App.css"
import Welcome from "./pages/welcome";

const app = () => {
  return (
    <BrowserRouter>
      <div id="root">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/categoriesandtag" element={<CateandTag />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
};

export default app;
