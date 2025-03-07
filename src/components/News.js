import React, { Component } from "react";
import NewsIteam from "./NewsItem";
import Spinners from "./Spinners";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaulProps ={
    country: 'in',
    pageSize: 8,
    category: 'general',

  }
  static propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string
  }

  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: false,
        page:1,
        totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- FreeNews`;
  }
  // 72115315cd704773bc712653a29e48bc
  // ${this.props.apikey}
  async updateNews() {
    this.props.setProgress(0);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    console.log("cmd");
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("previous");
    this.setState({page: this.state.page - 1})
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");
      this.setState({page: this.state.page + 1})
      this.updateNews();
    };

    fetchMoreData =async () => {
      this.setState({page:this.state.page + 1})
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
      })
    };

  render() {
    return (
      <>
        {/* <div className="container my-3"> */}
          <h2 className="text-center" style={{ margin: '35px 0px'}}>Free News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
          {/* {this.state.loading && <Spinners />} */}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinners />}
        >
          <div className="container">

         
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsIteam
                    title={element.title ? element.title : ""}
                    discription={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    euthor={element.euthor }
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>



          {/* <div className="container d-flex justify-content-around">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-dark"
            >
              &larr;previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
        {/* </div> */}
      </>
    );
  }
}

export default News;
