import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const colors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',
    '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00',
    '#D2691E', '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF',
    '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#BDB76B',
    '#8B008B', '#556B2F', '#FF8C00', '#9932CC', '#8B0000', '#E9967A',
    '#8FBC8F', '#483D8B', '#2F4F4F', '#00CED1', '#9400D3', '#FF1493'
];


const Analytics2 = () => {

    const axiosSecure = useAxiosSecure()

    const { data: allScholarship } = useQuery({
        queryKey: ['allScholarshipAnalytics2'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allScholarshipAdmin')
            return res.data;
        }
    })
    console.log('nn', allScholarship)

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <div className='bg-yellow-50 shadow-lg'>
            {
                allScholarship
                    ?
                    <div>
                        <h1 className='mb-2 text-center font-medium text-[20px] pt-1'>University and corresponding Tuition Fee Structure</h1>
                        <BarChart
                            width={900}
                            height={700}
                            data={allScholarship}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="universityname" angle={-50} textAnchor="end" height={230} interval={0} />
                            <YAxis label={{ value: 'Tuition Fee', angle: -90, position: 'insideLeft', dy: 10, dx: -15 }} />
                            <Bar dataKey="tuitionfee" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {allScholarship?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                    :
                    <div className="flex items-center justify-center">
                        <span className="loading loading-bars loading-md text-yellow-300"></span>
                    </div>
            }
        </div>
    );
};

export default Analytics2;