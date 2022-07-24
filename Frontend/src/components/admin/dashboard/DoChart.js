import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import styled from "styled-components";
import { getAdminProducts } from "../../../redux/actions/productAction";

const COLORS = ["#79ceca", "#9690ed"];

const ChartWrapper = styled.div`
  width: 40%;
  border-radius: 10px;
  height: auto;
  min-width: 300px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  .title {
    margin-bottom: 1rem;
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
function DoChart({ title, aspect }) {
  const { products } = useSelector((state) => state.allAdminProducts);
  const dispatch = useDispatch();
  const [inStock, setInStock] = useState(0);

  const data = [
    { name: "In Stock", value: inStock },
    { name: "Out of Stock", value: products?.length - inStock },
  ];

  useEffect(() => {
    if (products && products?.length) {
      let inStock = 0;
      products.forEach((pro) => {
        console.log(pro);
        if (pro.stock > 0) inStock++;
      });
      setInStock(inStock);
    }
  }, [products]);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, []);

  return (
    <ChartWrapper>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            labelLine={false}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default DoChart;
