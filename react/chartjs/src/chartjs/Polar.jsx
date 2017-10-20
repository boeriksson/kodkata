import React from 'react';
import Chart from 'chart.js';

class Polar extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        var ctx = this.refs.canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: [20, 45, 35, 80, 15],
                    backgroundColor: [
                        '#0e5f31',
                        '#147b45',
                        '#299b59',
                        '#70e1a0',
                        '#e7fce9'
                    ],
                    label: 'Product groups',
                }],
                //labels: ['Casino', 'Poker', 'Bingo', 'Sportsbook', 'other']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Chart.js Polar Area Chart'
                },
                scale: {
                    display: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
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

export default Polar;