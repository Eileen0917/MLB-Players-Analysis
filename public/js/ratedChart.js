axios
  .get("/getRated")
  .then(function(response) {
    let data = JSON.parse(response.data);
    const year1 = data.year1;
    const s1 = data.s1;
    const avg_ERA = data.r2_1;
    const f20_ERA = data.r2_2;
    const l20_ERA = data.r2_3;
    const f03_ERA = data.r2_4;
    const l03_ERA = data.r2_5;

    console.log(data);

    let ctx1 = document.getElementById("rChart1");
    let ctx2 = document.getElementById("rChart2");

    let myChart = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: year1,
        datasets: [
          {
            label: "Average Salary",
            data: s1
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
        labels: year1,
        datasets: [
          {
            label: "Average",
            data: avg_ERA,
            fill: false,
            borderColor: "#3cba9f"
          },
          {
            label: "Top 20%",
            data: f20_ERA,
            fill: false,
            borderColor: "#e8c3b9"
          },
          {
            label: "Last 20%",
            data: l20_ERA,
            fill: false,
            borderColor: "#c45850"
          },
          {
            label: "Top 3%",
            data: f03_ERA,
            fill: false,
            borderColor: "#8e5ea2"
          },
          {
            label: "Last 3%",
            data: l03_ERA,
            fill: false,
            borderColor: "#3e95cd"
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
