import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";


function Chart(){
    const data = [
        {
          name: 'Jan',
          active: 2880,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          active: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Mar',
          active: 2780,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Apr',
          active: 1780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Jun',
          active: 780,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Jly',
          active: 8680,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Aug',
          active: 5480,
          pv: 4300,
          amt: 2100,
        },
        {
            name: 'Sep',
            active: 1780,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Oct',
            active: 2507,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Nov',
            active: 2780,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Dec',
            active: 3780,
            pv: 4300,
            amt: 2100,
        },
      ];
    return(
        <>
            <LineChart 
            data={data} 
            width={500}  
            height={195}>
                <XAxis dataKey="name" stroke="black"/>
                <Line type="monotone" dataKey="active" stroke="black"/>
                {/* <YAxis dataKey="name" stroke="black"/> */}
                <CartesianGrid strokeDasharray="5 5"/>
                <Tooltip/>
            </LineChart>
        </>
    )
}

export default Chart