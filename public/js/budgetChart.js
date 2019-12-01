axios
  .get("/getBudget")
  .then(function(response) {
    const data = JSON.parse(response.data);
    const teams = data.teams1;
    const players = data.players1;
    const r2_nya = data.r2_nya;
    const r2_lan = data.r2_lan;
    const r2_tba = data.r2_tba;
    const teams3 = data.teams3;
    const players3 = data.players3;
    const r4 = data.r4;
    const r5_x = data.year5;
    const r5_y = data.c5;
    console.log(data);

    let ctx1 = document.getElementById("bChart1");
    let ctx2 = document.getElementById("bChart2");
    let ctx3 = document.getElementById("bChart3");
    let ctx4 = document.getElementById("bChart4");
    let ctx5 = document.getElementById("bChart5");

    let myChart = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: teams,
        datasets: [
          {
            label: "2016",
            data: players
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });

    let myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        datasets: [
          {
            label: "NYA",
            data: r2_nya,
            fill: false,
            borderColor: "#c45850"
          },
          {
            label: "LAN",
            data: r2_lan,
            fill: false,
            borderColor: "#e8c3b9"
          },
          {
            label: "TBA",
            data: r2_tba,
            fill: false,
            borderColor: "#3cba9f"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear"
            }
          ]
        }
      }
    });

    let myChart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: teams3,
        datasets: [
          {
            label: "avg",
            data: players3
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });

    let myChart4 = new Chart(ctx4, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: r4
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }
          ]
        }
      }
    });

    let myChart5 = new Chart(ctx5, {
      type: "bar",
      data: {
        labels: r5_x,
        datasets: [
          {
            label: "correlation",
            data: r5_y
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });

// function addData(chart, label, data) {
//   chart.data.label.push(label);
//   chart.data.datasets.forEach(dataset => {
//     dataset.label.push(label);
//     dataset.data.push(data);
//     console.log(data);
//   });
//   chart.update();
//   console.log("added");
// }
