import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"style={{left:'90%',zIndex:'1'}}> {source}</span>
          <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2024/01/07/1600x900/Congress-leader-Adhir-Ranjan-Chowdhury-said-the-Co_1704617726886_1704617741961.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small class="textx-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noopener noreferrer"  target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
