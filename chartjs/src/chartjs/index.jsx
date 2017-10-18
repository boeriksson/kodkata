import React from 'react';
import Stapel from './Stapel';
import Line from './Line';
import Line2 from './Line2';
import Pie from './Pie';
import Polar from './Polar';

const graphs = () => (
    <div style={{ display: 'flex' }}>
        <Stapel/>
        <Line/>
        <Line2/>
        <Pie/>
        <Polar/>
    </div>
);

export default graphs;
