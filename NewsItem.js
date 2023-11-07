import React from "react";

//export default class NewsItem extends Component {
const NewsItem=(props)=>{
 // render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div className="my-3">
      <div className="card" style={{width: "18rem"}}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <button type="button" className="btn btn-primary">
             Source <span className="badge text-bg-secondary">{source}</span>
          </button>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text"><small className="text-body-secondary">By {! author?'unknown':author} at {new Date(date).toGMTString()}</small></p>

          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
      </div>
    );
//  }
}
export default NewsItem;
