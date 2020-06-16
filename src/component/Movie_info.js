import React, { Component } from "react";
import axios from "axios";
import MoviefoWithPoster from "./MoviefoWithPoster";

class Movie_info extends Component {

  state = {
    testData: {},
    movieTitle: "",
    releasedYear: "",
    popupMOdel: true
  }

  changeUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  featchNewMovieInfo = async (e) => {
    e.preventDefault();
    const movieName = this.state.movieTitle
    const movieRelYear = this.state.releasedYear
    let resData = await axios(`http://www.omdbapi.com/?t=${movieName}&y=${movieRelYear}&apikey=4f9b6ea6`);
    console.log(resData.data);
    this.setState({
      testData: resData.data,
      movieTitle: "",
      releasedYear: ""
    });
  }

  render() {
    const { testData } = this.state;
    return (
      <div className="container row">
        <div className="col-sm-6">
          <p><b>First tab </b></p>
          <form className="form-inline" onSubmit={this.featchNewMovieInfo}>
            <input type="text" className="form-control" name="movieTitle" value={this.state.movieTitle}
              onChange={this.changeUserInput} placeholder="Movie title" />
            <input type="text " className="form-control" name="releasedYear" value={this.state.releasedYear}
              onChange={this.changeUserInput} placeholder="relaise Year" />
            <button type="submit" className="btn btn-success">Search</button>
          </form>

          <ul className="list-group">
            {
              Object.keys(testData).map((key, i) => {
                return (
                  <div key={i}>{i < 5 ?
                    <li className="list-group-item"><span><b>{key} : </b></span><span>{testData[key]}</span></li>
                    : null}</div>
                )
              })
            }
            {Object.keys(testData).length > 0 ? <button data-toggle="modal" data-target="#myModal">fetch more info</button> : <li className="list-group-item">No Data found</li>}
          </ul>
        </div>
        <div className="col-sm-6">
          <p><b>Second tab with Poster </b></p>
          <MoviefoWithPoster />
        </div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6 style={{ color: "#FFF" }}>{testData.imdbRating > 7 ? "boxoffice: hit" : "boxoffice: flop"}</h6>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                {
                  Object.keys(testData).map((key, i) => {
                    return (
                      <div key={i}>{
                        key === "Poster" ? <img style={{ height: "220px" }} src={testData.Poster} />
                          : key === "Ratings" ? testData.Ratings.map(data => {
                            return (
                              <span><b>{data.Source}</b> : {data.Value} | </span>
                            )
                          }) :
                            <li className="list-group-item"><b><span>{key}</span></b> :<span>{testData[key]}</span></li>
                      }
                      </div>
                    )
                  })
                }
                <div className="modal-footer">
                  <button type="button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div >
        </div>
      </div>
    )
  }
}

export default Movie_info;