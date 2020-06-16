import React, { Component } from "react";
import axios from "axios";

class MoviefoWithPoster extends Component {
  state = {
    testData: {},
    movieTitle: "",
    releasedYear: ""
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
    this.setState({
      testData: resData.data,
      movieTitle: "",
      releasedYear: ""
    });
  }

  render() {
    const { testData } = this.state;
    return (
      <>
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
                <div key={i}>
                  {
                    key === "Poster" ? <img style={{ height: "220px" }} src={testData.Poster} /> :
                      key === "Ratings" ? testData.Ratings.map(data => {
                        return (
                          <span><b>{data.Source}</b> : {data.Value} | </span>
                        )
                      }) :
                        <li className="list-group-item"><b><span>{key} : </span></b><span>{testData[key]}</span></li>
                  }
                </div>
              )
            })
          }
          {Object.keys(testData).length > 0 ? null : <li className="list-group-item">No Data found</li>}
        </ul>
      </>
    )
  }
}

export default MoviefoWithPoster;