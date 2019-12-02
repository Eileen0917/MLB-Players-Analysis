axios
  .get("/getVelicity")
  .then(function(response) {
    let data = JSON.parse(response.data);
    const o = data.ON2B3B;
    const no = data.NON_ON2B3B;
    const ss = data.r2_2[0].S2;
    const s = data.r2_0[0].S2;
    console.log(data);

    const years = [2015, 2016, 2017, 2018];

    let ctx1 = document.getElementById("vChart1");
    let ctx2 = document.getElementById("vChart2");

    let myChart = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "ON_2B_3B",
            data: o,
            backgroundColor: "#3e95cd"
          },
          {
            label: "NON_2B_3B",
            data: no,
            backgroundColor: "#3cba9f"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: false
            }
          ],
          yAxes: [
            {
              stacked: false
            }
          ]
        }
      }
    });

    let myChart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Fourseam Fastball"],
        datasets: [
          {
            label: "2 strikes",
            data: [ss],
            backgroundColor: "#3e95cd"
          },
          {
            label: "0 strikes",
            data: [s],
            backgroundColor: "#3cba9f"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: false
            }
          ],
          yAxes: [
            {
              stacked: false
            }
          ]
        }
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
