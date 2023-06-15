import { convertDate } from "./convertDate";
export const settingChartData = (setChartData, prices1, prices2) => {
  //setting chart data
  // console.log("pricess11",  prices1);
  // console.log("pricess22",  prices2);
  if (prices2 !==false || prices2.length > 0) {
    // console.log("if" + prices2);
    // console.log("if" + prices1);

    setChartData({
      //x values
      labels: prices1.map((price) =>  convertDate(price[0])),
      datasets: [
        {
          //y left values
          label:"crypto1",
          data: prices1.map((price) => price[1]),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          backgroundColor: "rgba(58, 128, 233, 0.1)",
          pointRadius: 0,
          yAxisID: 'crypto1'
        },
        {
          //y right values
          label:"crypto2",
          data: prices2.map((price) => price[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "#61c96f",
          pointRadius: 0,
          yAxisID: 'crypto2'
        },
      ],
    });
  }else{
    //console.log("else");
    setChartData({
      //x values
      labels: prices1.map((price) => convertDate(price[0])),
      datasets: [
        {
          //y values
          label:"crypto1",
          data: prices1.map((price) => price[1]),
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          borderColor: "#3a80e9",
          backgroundColor: "rgba(58, 128, 233, 0.1)",
          pointRadius: 0,
          yAxisID: 'crypto1'
        },
      ],
    });
  }
};
