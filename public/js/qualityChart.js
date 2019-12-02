axios
  .get("/getQuality")
  .then(function(response) {
    let data = JSON.parse(response.data);
    const counts = data.counts;
    const mu = data.mu;
    const mu2 = data.mu2;
    const c2015 = data.c2015;
    const c2016 = data.c2016;
    const c2017 = data.c2017;
    const c2018 = data.c2018;
    console.log(data);

    let ctx1 = document.getElementById("qChart1");
    let ctx2 = document.getElementById("qChart2");

    let myChart = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: mu,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#0072E3",
              "#64A600",
              "#642100"
            ]
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

    let myChart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: mu2,
        datasets: [
          {
            label: "2015",
            data: c2015,
            backgroundColor: "#3e95cd"
          },
          {
            label: "2016",
            data: c2016,
            backgroundColor: "#8e5ea2"
          },
          {
            label: "2017",
            data: c2017,
            backgroundColor: "#3cba9f"
          },
          {
            label: "2018",
            data: c2018,
            backgroundColor: "#e8c3b9"
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

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
    console.log(data);
  });
  chart.update();
  console.log("added");
}
