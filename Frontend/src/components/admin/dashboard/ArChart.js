import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import styled from "styled-components";

const data = [
  { Total: 1200 },
  { Total: 2100 },
  { Total: 800 },
  { Total: 1600 },
  { Total: 900 },
  { Total: 1700 },
];

const ChartWrapper = styled.div`
  width: 40%;
  height: auto;
  border-radius: 10px;
  padding: 5px;
  min-width: 300px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  .title {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 18px;
    color: rgb(160, 160, 160);
    font-family: "roboto";
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    height: auto;
  }
`;

function ArChart({ title, aspect }) {
  // const { users } = useSelector((state) => state.allUsers);

  return (
    <ChartWrapper>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={500}
          height={250}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default ArChart;
