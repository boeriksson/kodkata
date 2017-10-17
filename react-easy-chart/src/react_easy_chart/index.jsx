import React from 'react';
import {AreaChart} from 'react-easy-chart';

const ReactEasyChart = () => {
    return (
        <div>
            <AreaChart
                axes
                margin={{ top: 10, right: 10, bottom: 50 }}
                axisLabels={{ x: 'X - Axis', y: 'Y - Axis' }}
                width={250}
                interpolate={ 'cardinal' }
                height={ 250 }
                data={
                    [
                        [
                            { x: 1, y: 20 },
                            { x: 2, y: 10 },
                            { x: 3, y: 25 }
                        ], [
                            { x: 1, y: 15 },
                            { x: 2, y: 12 },
                            { x: 3, y: 11 }
                        ]
                    ]
                }
            />
        </div>
    );
};

export default ReactEasyChart;