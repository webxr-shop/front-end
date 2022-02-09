export function graphic(labels, data, max) {
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "N° de modelos",
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    data: data,
                    borderWidth: 1,
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
                        scaleLabel: {
                            display: true,
                            labelString: "Categorias",
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
                        scaleLabel: {
                            display: true,
                            labelString: "N° de modelos",
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
