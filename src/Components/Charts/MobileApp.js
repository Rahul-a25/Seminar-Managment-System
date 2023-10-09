
import React, {PureComponent, useState} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from "./mobileApp.module.css"

const data = [
  {
    name: 'FAI 2022',
    Active_Delegates: 5600,
    Inactive_Delegates: 3400,
    Guest_Users: 4000,
    amt: 2000,
  },
  {
    name: 'FAI 2021',
    Active_Delegates: 2300,
    Inactive_Delegates: 1400,
    Guest_Users: 2100,
    amt: 2400,
  },
  {
    name: 'FAI 2020',
    Active_Delegates: 2000,
    Inactive_Delegates: 2700,
    Guest_Users: 3600,
    amt: 4400,
  },
  {
    name: 'FAI 2019',
    Active_Delegates: 3400,
    Inactive_Delegates: 2300,
    Guest_Users: 2900,
    amt: 2400,
  },
  {
    name: 'FAI 2018',
    Active_Delegates: 3600,
    Inactive_Delegates: 2700,
    Guest_Users: 2200,
    amt: 2700,
  },
  {
    name: 'FAI 2017',
    Active_Delegates: 4000,
    Inactive_Delegates: 2900,
    Guest_Users: 2700,
    amt: 2400,
  },
];
const MobileApp = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [chartHeight, setChartHeight] = useState(300);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setChartHeight(isExpanded ? 0 : 300);
  };

  return (

    <div className={`${styles.yourComponent} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.horizontalLine}></div>
    <div className={styles.header}>
      <div className={styles.title}>Mobile App Download Chart</div>
      <button className={styles.expandButton} onClick={toggleExpand}>
        {isExpanded ? '-' : '+'}
      </button>
    </div>
    {isExpanded && (
        <div className={`${styles.content} ${styles.chartContainer}`}>
          {/* <ResponsiveContainer width="100%" height={chartHeight} overflow-x="auto" white-space="nowrap"  > */}
            <BarChart
              width={800}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                // angle={-90}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend
                verticalAlign="top" 
                height={50}
              />
              <Bar dataKey="Active_Delegates" fill="#FF8C3D" />
              <Bar dataKey="Inactive_Delegates" fill="#B6BB3B" />
              <Bar dataKey="Guest_Users" fill="#FFA12C" />
            </BarChart>
          {/* </ResponsiveContainer> */}
        </div>
      )}
  </div>
    
  );
};

export default MobileApp;
