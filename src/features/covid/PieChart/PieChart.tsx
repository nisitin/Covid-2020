import React from 'react';
import {Typography} from "@material-ui/core";
import {Doughnut} from "react-chartjs-2";

import {useSelector} from "react-redux";
import {selectData} from "../covidSlice";



const PieChart:React.FC = () => {
   const data = useSelector(selectData);
//まずは使うデータを呼び出す。
  const motality =
    data.confirmed && (100 * data.deaths.value) / data.confirmed.value;

    const pieChart = data && (
        <Doughnut
            data={{
               labels: ["感染者数","回復者数", "死者数"],
               datasets: [
                   {
                       data: [
                           data.confirmed.value,
                           data.recovered.value,
                           data.deaths.value,
                       ],
                       backgroundColor: [
                        "rgba(0,0,255,0.5)",
                        "#008080",
                        "rgba(255,0,0,0.5)"
                       ],
                       hoverBackGroundColor:["#36A2EB", "#3cb371", "FF6384"],
                       borderColor: ["transparent", "transparent", "transparent"]
                   }
               ]
            }}
            options={{
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 15,
                    } 
                }
            }}
            />
    )

    //toFixedは小数点以下を二桁まで表示するという
     return (
        <>
            {data.confirmed && (
                <Typography align="center" color="textSecondary" gutterBottom>
                    致死率 {data.confirmed &&  motality.toFixed(2)} [%]
                </Typography>
            )}
            {pieChart}
        </>
    )
}

export default PieChart
