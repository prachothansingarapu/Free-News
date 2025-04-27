import React, { useEffect, useState } from "react";
import NewsIteam from "./NewsItem";
import Spinners from "./Spinners";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import { useFormState } from "react-dom";

const News =(props) => {

  const [articles, setArticles] = useState([]);
  const [loading , setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=> {
    props.setProgress(0);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- FreeNews`;
    updateNews();
  }, [])

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //     setPage(page+1)
  //     updateNews();
  // };

    const fetchMoreData =async () => {
      let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };


    return (
      <>
        {/* <div className="container my-3"> */}
          <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '95px' }}>Free News - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
          {/* {this.state.loading && <Spinners />} */}

          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinners />}
        >
          <div className="container">

         
          <div className="row">
            {articles.map((element) => {
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
      </>
    );
  
}

News.defaulProps ={
  country: 'in',
  pageSize: 8,
  category: 'general',

}
News.propTypes = {
 country: PropTypes.string,
 pageSize: PropTypes.number,
 category: PropTypes.string
}

export default News;
