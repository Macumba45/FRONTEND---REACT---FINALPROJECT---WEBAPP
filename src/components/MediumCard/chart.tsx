import React, {FC} from 'react';
import {PieChart, Pie, Cell} from 'recharts';

const data = [
     {name: 'Group A', value: 400},
     {name: 'Group B', value: 300},
     {name: 'Group C', value: 300},
     {name: 'Group D', value: 200},
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Props {
     onPieEnter?: (data: any, index: number) => void;
}

const Chart: FC<Props> = ({onPieEnter}) => {
     return (
          <PieChart width={300} height={400}>
               <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
               >
                    {data.map((entry, index) => (
                         <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                         />
                    ))}
               </Pie>

               {data.map((entry, index) => (
                    <Cell
                         key={`cell-${index}`}
                         fill={COLORS[index % COLORS.length]}
                    />
               ))}
          </PieChart>
     );
};

export default Chart;