import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

   // Static property
   static defaultProps = {
    country: 'in',
    pageSIze:6,
    category:'general'
  };

  static propTypes ={
    country: PropTypes.string,
    pageSIze:PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      loading: false,
      page: 1,
      pageSize: 20,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    try {
      this.setState({loading:true})
      let data = await fetch(url);
      if (data.ok) {
        let parseData = await data.json();
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

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    try {
      this.setState({loading:true})
      let data = await fetch(url);
      if (data.ok) {
        let parseData = await data.json();
        this.setState({
          page: this.state.page - 1,
          articles: parseData.articles,
          loading: false,

        });
      } else {
        console.error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleNextClick = async () => {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      try {
        this.setState({loading:true})
        let data = await fetch(url);
        if (data.ok) {
          let parseData = await data.json();
            this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false,

          });
        } else {
          console.error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="container my-3">
            <h1 className="text-center">NewsMonkey - Top Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element, index) => (
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
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="container d-flex justify-content-between mb-3">
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
          </div>
        </div>
      </>
    );
  }
}

export default News;
