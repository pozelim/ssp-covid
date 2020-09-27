import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const options = {
  title: {
    text: "Mortes por covid São Sebastião do Paraíso",
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          minUnit: "day",
        },
        scaleLabel: {
          display: true,
          labelString: "Dias",
        },
      },
    ],
  },
};

const average = (array) =>
  Math.ceil(array.reduce((a, b) => a + b) / array.length);

export default class LineDeathPerDay extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentDidMount() {
    console.log(this.chartReference);
  }

  newDate(date) {
    return moment(date);
  }

  buildData() {
    const { data } = this.props;

    const firstDay = this.newDate(data[0].dt);
    const lastDay = this.newDate(data[data.length - 1].dt).add(1, "days");
    const labels = [];
    const mainData = [];
    const avgData = [];

    const dataByDate = data.reduce(function (map, info) {
      map[info.dt] = info;
      return map;
    }, {});

    let avgWindow = [];
    let prevInfo;
    for (var m = moment(firstDay); m.isBefore(lastDay); m.add(1, "days")) {
      let formattedDate = m.format("YYYY-MM-DD");
      let info = dataByDate[formattedDate];
      if (info) {
        mainData.push(info.d);
        prevInfo = info;
      } else {
        mainData.push(0);
      }

      if (avgWindow.length === 7) {
        avgWindow.shift();
      }
      avgWindow.push(prevInfo.d);
      avgData.push(average(avgWindow));
      console.log(average(avgWindow));
      labels.push(this.newDate(formattedDate));
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Tota de mortes confirmadas por dia",
          type: "bar",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: mainData,
        },
        {
          type: "line",
          label: "Média de mortes por dia (ultimos 7 dias)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: avgData,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <h2>Mortes por Covid-19 confirmadas por dia</h2>
        <Line data={this.buildData()} options={options} />
      </div>
    );
  }
}
