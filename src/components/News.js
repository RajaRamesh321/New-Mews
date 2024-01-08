import React, { Component } from "react";
import NewsItem from "./NewsItem";
export default class News extends Component {
  articles = []

  constructor() {
    super();
    console.log("Hello iam a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }
  async componentDidMount(){
    console.log("cdm")
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5"
    let data=await fetch(url)
    let parsedData=await data.json()
    console.log(parsedData)
    this.setState({articles:parsedData.articles})
  }
  render() {
    return (
      <div className="container my-3">
        <h1>News-Monkey Top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,45):" "}
                  description={element.description?element.description.slice(0,88):" "}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
