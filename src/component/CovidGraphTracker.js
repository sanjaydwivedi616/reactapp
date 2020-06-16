import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

let newLable = [];
let newLableData = [];

const state = {
  labels: newLable,
  fill: true,
  datasets: [
    {
      label: 'Total Cases',
      backgroundColor: ['rgba(63, 149, 205,.7)'],
      hoverBackgroundColor: ['rgba(63, 149, 205,.7)'],
      borderColor: 'rgb(63, 149, 205)',
      borderWidth: 1,
      data: newLableData
    }
  ]
};

class CovidGraphTracker extends Component {

  render() {
    const covideCasesDateWise = this.props.covideCases_time_series;
    covideCasesDateWise.map(cassesDate => {
      newLable.push(cassesDate.date);
      newLableData.push(cassesDate.totalconfirmed);
    })

    let lastSevenDayDataLable = newLable.slice(Math.max(newLable.length - 7, 0));
    let lastSevenDayDataName = newLableData.slice(Math.max(newLableData.length - 7, 0));

    console.log(lastSevenDayDataLable)
    console.log(lastSevenDayDataName)

    return (
      <div className='form_layout border-grid'>
        <p>Covide Cases</p>
        <Line
          width={700}
          height={500}
          data={state}
          options={{
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
        />
      </div>
    );
  }
}

export default CovidGraphTracker;