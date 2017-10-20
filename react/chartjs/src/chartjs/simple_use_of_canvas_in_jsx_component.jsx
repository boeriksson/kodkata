import React from 'react';

class ChartJS extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0, 0, 100, 100);
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={300} hegith={300}/>
            </div>
        );
    }
}

export default ChartJS;