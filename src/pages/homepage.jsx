import { useEffect, useState } from "react";
import PostCard from "../components/postcard";
import { Container, Row, Col } from "react-bootstrap";

function Homepage() {
  const [allpost, setAllPost] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setAllTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  // let categoriesOption = {}
  // let tagOption = {}

  const findCategory = (postCategory) => {
    var category = postCategory.map(
      (cateID) => categories.filter((cate) => cate.id === cateID)[0]
    );
    //   console.log(category)
    return category;
  };

  const findTags = (postTag) => {
    var tag = postTag.map(
      (tagID) => tags.filter((t) => t.id === tagID)[0]
    );
    //   console.log(tag)
    return tag;
  };

  const findAuthor = (id) => {
    return authors.filter((auth) => auth.id === id)[0];
  };

  useEffect(() => {
    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/posts")
      .then((res) => {
        res.json().then((post) => {
          setAllPost(post);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });

    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/categories")
      .then((res) => {
        res.json().then((categories) => {
          setCategories(categories);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });

    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/tags")
      .then((res) => {
        res.json().then((tag) => {
          setAllTags(tag);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });

    fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/users")
      .then((res) => {
        res.json().then((r) => {
          setAuthors(r);
        });
      })
      .catch((err) => {
        console.log("failed to test");
      });
  }, []);

//   console.log("tag", authors);

  return (
    <div id="allPostTitle">
      <Container>
        <Row>
          <Col md={12} style={{ marginBottom: 20,marginTop:20 }}>
            <h2>Home page</h2>You can read all post here
          </Col>
          {allpost.map((post) => {
            return (
              <PostCard
                key={post.id}
                {...post}
                title={post.title.rendered}
                date={post.date}
                author={findAuthor(post.author)}
                category={findCategory(post.categories)}
                tag={findTags(post.tags)}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
