import { useEffect, useState } from "react";
import PostCard from "../components/postcard";
import { Container, Row, Col, Button } from "react-bootstrap";

function CateandTag(props) {
  const [allpost, setAllPost] = useState([]);
  const [filterPost, setFilterPost] = useState([]);
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
    var tag = postTag.map((tagID) => tags.filter((t) => t.id === tagID)[0]);
      console.log("tag",tag)
    return tag;
  };
  console.log("all", allpost, "fill", filterPost);

  const filterCate = (id) => {
    var post = allpost.filter((item) => item.categories.some((i) => i === id));
    setFilterPost(post);
  };

  const filterTag = (id) => {
    var post = allpost.filter((item) => item.tags.some((i) => i === id));
    setFilterPost(post);
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

  const Category = (prop) => {
    return (
      <Button
        onClick={() => filterCate(prop.category.id)}
        variant="outline-primary"
        style={{ fontSize: 3, margin: 2 }}
      >
        {prop.category.name}
      </Button>
    );
  };
  const Tag = (prop) => {
    return (
      <Button
        onClick={() => filterTag(prop.tag.id)}
        variant="outline-success"
        style={{ fontSize: 3, margin: 2 }}
      >
        {prop.tag.name}
      </Button>
    );
  };
  return (
    <div id="allPostTitle">
      <Container>
        <Row>
          <Col md={12} style={{ marginBottom: 20, marginTop: 20 }}>
            <h2>Search what's your interest</h2>
            <h5>with Categories and Tags</h5>
            {categories.map((item, index) => {
              return <Category key={index} category={item}></Category>;
            })}
            {tags.map((item, index) => {
              return <Tag key={index} tag={item}></Tag>;
            })}
          </Col>
          {filterPost.map((post) => {
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
export default CateandTag;
