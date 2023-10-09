
import React, {PureComponent} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from "./landing.module.css"
import EventWiseDelegates from "../Components/Charts/EventWiseDelegates";
import DelegatesSummary from "../Components/Charts/DelegatesSummary.js";
import MobileApp from "../Components/Charts/MobileApp";
import Feedbacks from "../Components/Charts/Feedbacks";


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    ui: 2000,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    ui: 2000,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    ui: 2000,
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
    ui: 2000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    ui: 2000,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    ui: 2000,
    amt: 2100,
  },
];

const Landing = () => {

  return (
    <>
        <EventWiseDelegates />
        <DelegatesSummary />
        <MobileApp />
        <Feedbacks />
      </>
  );
};

export default Landing;
