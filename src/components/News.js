import React, { Component } from "react";
import NewsItem from "./NewsItem";
export default class News extends Component {

  constructor() {
    super();
    console.log("Hello iam a constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }
  async componentDidMount(){
    console.log("cdm")
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=1&pageSize=20"
    let data=await fetch(url)
    let parsedData=await data.json()
    console.log(parsedData)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  }

  handlePrevClick=async()=>{
console.log("Previous")

let url=  `https://newsapi.org/v2/top-headlines?country=in&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${this.state.page-1}&pageSize=20`
    let data=await fetch(url)
    let parsedData=await data.json()
    console.log(parsedData)

    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles
    })

  }

 handleNextClick=async()=>{
    console.log("Next")

    let url=  `https://newsapi.org/v2/top-headlines?country=in&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${this.state.page+1}&pageSize=20`
    let data=await fetch(url)
    let parsedData=await data.json()
    console.log(parsedData)

    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles
    })
    

  };
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
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" class="btn-btn-dark" onClick={this.handlePrevClick}> &larr;  Previous 
          </button>
          <button disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/21) }type="button" className="btn-btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div>
      </div>
    );
  }
}