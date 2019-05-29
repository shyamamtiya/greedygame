import React from 'react';
import Plot from 'react-plotly.js';

export default function Graph(props) {
    const { x, y,width=600 ,height=600,title="Simple Chart" ,type="scatter"} = props.graphData;

    return (<div>
        <Plot data={[
            {
                x: x,
                y: y,
                type: type,
                mode: 'lines+points',
                marker: { color: 'blue' },
            },

        ]}
            layout={{ width: width, height: height, title: title }}
        />
    </div>);
}