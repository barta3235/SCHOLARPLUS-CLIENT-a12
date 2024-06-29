import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const Analytics3 = () => {
    const axiosSecure = useAxiosSecure();

    const { data: analytics2 } = useQuery({
        queryKey: ['analytics3'],
        queryFn: async () => {
            const res = await axiosSecure.get('/analytics1ByAdmin')
            return res?.data?.universityApplication;
        }
    })

    console.log(analytics2)

    const data = analytics2?.map(item => ({
        name: item._id,
        count: item.count
    }));



    return (
        <div>
            {
                data
                    ?
                    <div className="flex flex-col justify-center items-center bg-yellow-50">
                        <h1 className='mb-2 text-center font-medium text-[20px] pt-1'>Top 4 most applied university for scholarship</h1>
                        <PieChart width={300} height={325}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={108}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {analytics2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </div>
                    :
                    <div className="flex items-center justify-center">
                        <span className="loading loading-bars loading-md text-yellow-300"></span>
                    </div>
            }
        </div>
    );
};

export default Analytics3;