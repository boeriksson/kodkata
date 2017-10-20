import React from 'react';
import Chart from 'chart.js';

class Stapel extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        var ctx = this.refs.canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2/8', '10/8', '18/8', '26/8', '1/9'],
                datasets: [{
                    label: false,
                    data: [0, 220, 80, 150, 260],
                    backgroundColor: '#299b59',
                    borderColor: '#0e5f31',
                    fill: false
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'This is a title'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            stepSize: 200
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div style={{width: '20%'}}>
                <canvas ref="canvas" width="40" height="40"></canvas>
            </div>
        );
    }
}

export default Stapel;