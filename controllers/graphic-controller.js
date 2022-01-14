export function graphic(labels, data, max) {
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cadastros",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: data,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: "categoria",
                        },
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 6,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: max,
                            maxTicksLimit: 1,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}
