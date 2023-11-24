import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News2 extends Component {
  shouldComponentUpdate() {
    return true;
  }

  // Static property
  static defaultProps = {
    country: "in",
    pageSIze: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSIze: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      loading: false,
      page: 1,
      pageSize: 20,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News Monkey`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6a6780d21a348d5a9113139cb601d1b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);
    try {
      this.setState({ loading: true });
      let data = await fetch(url);
      if (data.ok) {
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          articles: parseData.articles,
          totalResults: parseData.totalResults,
          loading: false,
        });
      } else {
        console.error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, () => {
      console.log("Page:" + this.state.page);
      console.log(this.state.articles.length + " " + this.state.totalResults);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6a6780d21a348d5a9113139cb601d1b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      console.log(url);
      try {
        this.setState({ loading: true });
        fetch(url)
          .then((data) => {
            if (data.ok) {
              return data.json();
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .then((parseData) => {
            console.log(parseData);
            this.setState({
              articles: this.state.articles.concat(parseData.articles),
              totalResults: parseData.totalResults,
              loading: false,
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  };
  
  render() {
    return (
      <>
        <div className="container">
          <div className="container my-3">
            <h1 className="text-center">
              NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h1>
            
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={this.state.loading && <Spinner/>}
            >
              <div className="row">
                {this.state.articles.map((element, index) => (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={
                        element.title !== null && element.title !== undefined
                          ? element.title.slice(0, 50) + "..."
                          : ""
                      }
                      description={
                        element.description !== null &&
                        element.description !== undefined
                          ? element.description.slice(0, 88) + "..."
                          : ""
                      }
                      imageUrl={
                        element.urlToImage !== null
                          ? element.urlToImage
                          : "https://i.insider.com/655cbec59c7d23cb3b9de932?width=1200&format=jpeg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          {/* <div className="container d-flex justify-content-between mb-3">
            <button
              type="button"
              disabled={this.state.page === 1}
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr;Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page ===
                Math.floor(this.state.totalResults / this.props.pageSize + 1)
              }
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next&rarr;
            </button>
          </div> */}
        </div>
      </>
    );
  }
}

export default News2;
