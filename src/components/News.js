import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1, pageSize: 30 };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    try {
      let data = await fetch(url);
      if (data.ok) {
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          articles: parseData.articles,
          totalResults: parseData.totalResults,
        });
      } else {
        console.error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${
      this.state.page - 1
    }&pageSize=${this.state.pageSize}`;
    try {
      let data = await fetch(url);
      if (data.ok) {
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          page: this.state.page - 1,
          articles: parseData.articles,
        });
      } else {
        console.error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleNextClick = async () => {
    console.log(this.state.page);
    // console.log(this.state.parseData.totalResults);
    if (false) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9ff805907aa24d7aa8904aa0ff7e8569&page=${
        this.state.page + 1
      }&pageSize=${this.state.pageSize}`;
      try {
        let data = await fetch(url);
        if (data.ok) {
          let parseData = await data.json();
          console.log(parseData);
          this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
          });
        } else {
          console.error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="container my-3">
            <h2>NewsMonkey - Top Headlines</h2>
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
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="container d-flex justify-content-between mb-3">
            <button
              type="button"
              disabled={this.state.page === 1}
              class="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr;Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page === Math.ceil(this.state.totalResults / 50)
              }
              class="btn btn-dark"
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
