import React, { Component } from "react";
import axios from "axios";

class CovideStateDistrictWise extends Component {

  state = {
    covideStateDistrictWise: [],
    loader: false,
    error: ""
  }

  getcovideCasesStateDistrictWise = async () => {
    try {
      this.setState({
        loader: true
      })
      const resData = await axios.get("https://api.covid19india.org/state_district_wise.json");
      console.log(resData.data)
      this.setState({
        covideStateDistrictWise: resData.data,
        loader: false
      })
    } catch (error) {
      this.setState({
        error: `We found Some error ${error}`,
        loader: false
      });
    }
  }

  componentDidMount() {
    this.getcovideCasesStateDistrictWise();
  }

  render() {
    const { covideStateDistrictWise } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>State</th>
                <th>Confirmed Case</th>
                <th>Active Case</th>
                <th>Recovered/ Recovered %</th>
                <th>Deaths/Deaths %</th>
                <th>Last updated time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(covideStateDistrictWise).map((casesData, index) => {
                return (
                  <tr key={index}>
                    <td>{casesData}

                      {Object.keys(covideStateDistrictWise.districtData).map((disData, index) => {
                        return (
                          <tr>
                            <td>{disData}</td>
                          </tr>
                        )
                      })}
                    </td>
                    <td>{casesData.districtData}</td>
                    <td>{casesData}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default CovideStateDistrictWise;