import React, { Component } from "react";
import NewsIteam from "./NewsItem";
import Spinners from "./Spinners";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaulProps ={
    country: 'in',
    pageSize: 8,
    // category: 'business',
    category: 'general',

  }
  static propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string
  }



  constructor() {
    super();
    // console.log("Hello am the construction");
    this.state = {
        articles: [],
        loading: false,
        page:1
    };
  }

  async updateNews() {
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72115315cd704773bc712653a29e48bc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    console.log("cmd");
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72115315cd704773bc712653a29e48bc&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("previous");
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72115315cd704773bc712653a29e48bc&page=${
    //   this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
    this.setState({page: this.state.page - 1})
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");
    
      // let url =`https://newsapi.org/v2/top-headlines?country${this.props.country}=us&category=${this.props.category}&apiKey=72115315cd704773bc712653a29e48bc&page=${
      // this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false
      // });
      this.setState({page: this.state.page + 1})
      this.updateNews();
    };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{ margin: '35px 0px'}}>My News - Free News</h2>
          {this.state.loading && <Spinners />}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
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
          <div className="container d-flex justify-content-around">
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
          </div>
        </div>
      </>
    );
  }
}

export default News;
