axios
  .get("/getImprovement")
  .then(function(response) {
    const data = JSON.parse(response.data);
    const h1 = data.h1;
    const so1 = data.so1;
    const era1 = data.era1;
    const h2 = data.h2;
    const so2 = data.so2;
    const era2 = data.era2;

    let ctx = document.getElementById("iChart1");
    let ctx2 = document.getElementById("iChart2");
    let ctx3 = document.getElementById("iChart3");
    let ctx4 = document.getElementById("iChart4");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "H",
            data: h1,
            fill: false,
            borderColor: "#e8c3b9"
          },
          {
            label: "SO",
            data: so1,
            fill: false,
            borderColor: "#aac399"
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
        },
        title: {
          display: true,
          text: "Max Scherzer"
        }
      }
    });

    let myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        datasets: [
          {
            label: "ERA",
            data: era1,
            fill: false,
            borderColor: "#003E3E"
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
      type: "line",
      data: {
        datasets: [
          {
            label: "H",
            data: h2,
            fill: false,
            borderColor: "#BB3D00"
          },
          {
            label: "SO",
            data: so2,
            fill: false,
            borderColor: "#3D7878"
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
        },
        title: {
          display: true,
          text: "Chien-Ming Wang"
        }
      }
    });

    let myChart4 = new Chart(ctx4, {
      type: "line",
      data: {
        datasets: [
          {
            label: "ERA",
            data: era2,
            fill: false,
            borderColor: "#003060"
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
  })
  .catch(function(error) {
    console.log(error);
  });
