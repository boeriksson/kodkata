import React from 'react';
import Chart from 'chart.js';

class Stapel extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        var ctx = this.refs.canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Casino", "Poker", "Sportsbook", "Bingo", "Other"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        '#0e5f31',
                        '#147b45',
                        '#299b59',
                        '#70e1a0',
                        '#e7fce9'
                    ],
                    borderColor: [
                        '#999999',
                        '#999999',
                        '#999999',
                        '#999999',
                        '#999999'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
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