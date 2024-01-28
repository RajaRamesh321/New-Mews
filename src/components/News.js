import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  captiliseFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
  constructor(props) {
    super(props);
    console.log("Hello iam a constructor from News Component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.captiliseFirstLetter(props.category)}-News-Monkey`;
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("Previous");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
   
  };

  handleNextClick = async () => {
    console.log("Next");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreDta =async ()=>{
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb538ab1abaa4fb3a4501be3c44cf2f5&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  }
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          News-Monkey Top  {this.captiliseFirstLetter(this.props.category)} Headlines 
        </h1>
        {this.state.loading && <Spinner />}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreDta}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
          >
            <div className="container">
        <div className="row">
          
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn-btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn-btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
