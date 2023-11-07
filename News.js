import React, {  useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


//export default class News extends Component {
 const News=(props)=>{
 const[articles,setArticles]=useState([]);
 const[loading,setLoading]=useState(true)
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)
const capitalisizedfirstLetter=(string)=>{
  return string[0].toUpperCase() +
  string.slice(1);
}
 /* constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
     // totalArticles: 0,
      loading: false,
      totalResults: 0,
    };
    document.title=`${this.capitalisizedfirstLetter(this.props.category)}-Category`;
  }*/
  const updateNews= async () =>{
    //console.log("Page:" + page);
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false)
    //setPage(page+1)
    props.setProgress(100);
    console.log("articles:"+articles)
  }
  useEffect(()=>{
    document.title=`${capitalisizedfirstLetter(props.category)}-Category`;
    updateNews();
  },[])
  
  /*handlePreviousClick = async () => {
     console.log("Previous");

    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=960590075f664e369900c1c99b76051d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
 

    /*let data=await fetch(url);
    let parseData=await data.json();
      this.setState({articles: parseData.articles},()=>{
        //this.articles=this.state.articles;
      });

    this.setState({ page: --this.state.page });
    this.updateNews(this.state.page);
  };
  handleNextClick = async () => {
    console.log("Next");
    //console.log(! (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)));
    // if(! (this.state.page + 1 >Math.ceil(this.state.totalArticles/this.props.pageSize))){
    //  console.log("Hello");
    //let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=960590075f664e369900c1c99b76051d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    //console.log(this.state.page);

    this.setState({ page: ++this.state.page });
    this.updateNews(this.state.page);
    /*let data=await fetch(url);
    let parseData=await data.json();
      this.setState({articles: parseData.articles},()=>{
        //this.articles=this.state.articles;
      });

    //}
  }; */
  const fetchMoreData = async() => {

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    //this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    /*this.setState(
      {
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
        loading: false,
      }
    );*/
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false)
    setPage( page+1);
    
    //console.log("fetch page:"+page);
  };
  //render() {
    return (
      <div className="container my-5">
        <h1>Top Headlines {capitalisizedfirstLetter(props.category)}-Category</h1>
        {/*<div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &laquo; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"

            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
       {/* {this.state.loading && <Spinner />}*/}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="row">
        
          {//!this.state.loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://ichef.bbci.co.uk/news/1024/cpsprodpb/519F/production/_131559802_p0gpj8l7.jpg"
                    }
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
            

        </div>
        </InfiniteScroll>
      </div>
    );
 // }
}
News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
