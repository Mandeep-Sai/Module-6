import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import Pagination from "react-js-pagination";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      numberOfProducts: "",
      productsPerPage: 4,
      activePage: 1,
    };
  }
  componentDidMount = async () => {
    let defaultResponse = await fetch("http://localhost:3006/products");
    let defaultProducts = await defaultResponse.json();
    let response = await fetch(
      `http://localhost:3006/products?limit=${this.state.productsPerPage}`
    );
    let products = await response.json();
    this.setState({ products, numberOfProducts: defaultProducts.length });
  };

  async handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * this.state.productsPerPage;
    this.setState({ activePage: pageNumber });
    let response = await fetch(
      `http://127.0.0.1:3006/products?offset=${offset}&limit=${this.state.productsPerPage}`,
      {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      }
    );
    let parsedJson = await response.json();
    this.setState({
      products: parsedJson,
    });
  }
  render() {
    return (
      <Container className="home">
        <p className="text-center display-4">Products</p>
        <Row>
          {this.state.products.map((product) => {
            return (
              <>
                <Col xs={3}>
                  <Link to={`/details/${product._id}`}>
                    <Card className="my-2 mx-1 productCards">
                      <Card.Img
                        className="img-fluid"
                        variant="top"
                        src={product.imageUrl}
                      />
                      <Card.Body>
                        <Card.Text>
                          <p>
                            <span
                              style={{ fontSize: "15px", marginBottom: "auto" }}
                            >
                              $
                            </span>
                            {product.price}
                          </p>
                          <p>{product.name}</p>
                          <div className="stars-outer">
                            <div className="stars">
                              <IconContext.Provider
                                value={{ className: "starIcons" }}
                              >
                                <p>
                                  <AiOutlineStar />
                                </p>
                                <p>
                                  <AiOutlineStar />
                                </p>
                                <p>
                                  <AiOutlineStar />
                                </p>
                                <p>
                                  <AiOutlineStar />
                                </p>
                                <p>
                                  <AiOutlineStar />
                                </p>
                              </IconContext.Provider>
                            </div>
                            <div
                              className="starsFilled"
                              style={{
                                width: `${
                                  (product.totalRating /
                                    product.NumberOfReviews) *
                                  20
                                }%`,
                              }}
                            >
                              <IconContext.Provider
                                value={{ className: "starIconsFilled" }}
                              >
                                <p>
                                  <AiFillStar />
                                </p>
                                <p>
                                  <AiFillStar />
                                </p>
                                <p>
                                  <AiFillStar />
                                </p>
                                <p>
                                  <AiFillStar />
                                </p>
                                <p>
                                  <AiFillStar />
                                </p>
                              </IconContext.Provider>
                            </div>
                            {product.NumberOfReviews ? (
                              <p className="reviewsCount">
                                ({product.NumberOfReviews})
                              </p>
                            ) : (
                              <p className="reviewsCount">(0)</p>
                            )}
                          </div>
                        </Card.Text>
                        {/* <Link to ={`/details/${product._id}`}><Button variant="primary">More Details</Button></Link> */}
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </>
            );
          })}
        </Row>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.productsPerPage}
          totalItemsCount={this.state.numberOfProducts}
          //pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={this.handlePageChange.bind(this)}
        />
      </Container>
    );
  }
}

export default Home;
