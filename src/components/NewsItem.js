import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt } = this.props;

     return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="muted">By {author?author:"Unknown"} on {publishedAt?new Date(publishedAt).toLocaleString():""}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read More 
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
