import React, { Component } from "react";

export class NewsIteam extends Component {
  render() {
    let { title, discription, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
        <div className="my-3">
          <div className="card" >
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1" , left: "90%"}}>{source} 
            </span>
            <img src={!imageUrl?"https://cdn.mos.cms.futurecdn.net/Ndg2z6YZD9YyNZAi6z57R4-1200-80.gif ":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">             
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{discription}</p>
              <p className="card-text"><small className="text-danger"> By {!author? "Unknow" : author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blanck" className="btn btn-sm btn-dark">
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsIteam;
