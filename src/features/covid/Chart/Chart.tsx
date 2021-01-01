import React from 'react'
import styles from "./Chart.module.css";
import {Line, Bar} from "react-chartjs-2";

import {useSelector} from "react-redux" 
import {selectData, selectDataDaily, selectCountry} from "../covidSlice"



//ここで型をつける
const Chart:React.FC = () => {
    //ここで定義することによりdataが参照されて使えるようになる
    const data = useSelector(selectData)
    const dailyData = useSelector(selectDataDaily);
    const country = useSelector(selectCountry)

    const barChart = data && (
        <Bar
           data={{
               labels: ["感染者数", "回復者数", "死者数"],
               datasets: [
                   {
                       label:"人",
                       backgroundColor: [
                        "rgba(0, 0, 255, 0.5)",
                        "#008080",
                        "rgba(255, 0, 0, 0.5)",
                      ],
                       data: [
                           data.confirmed.value,
                           data.recovered.value,
                           data.deaths.value
                       ],
                   }
               ]
           }
        }
        options={{
            legend: {display: false},
            title: {display:true, text: `国別の最新の情報 ${country}`}
            //ここのcountryはReduxから取得しているので使える。
        }}
           />
    )

    const lineChart = dailyData[0] && (
        <Line 
         data={{
             //これはReduxから取り出したデータをmapで回して格納する処理
             labels: dailyData.map(({reportDate}) => reportDate),
             datasets: [
                {
                  data: dailyData.map((data) => data.confirmed.total),
                  label: "感染者数",
                  borderColor: "#3333ff",
                  fill: true,
                },
                {
                  data: dailyData.map((data) => data.deaths.total),
                  label: "死者数",
                  borderColor: "#ff3370",
                  fill: true,
                },
              ],
         }}
        />
    )

    //ここの内部の処理はcountryに何かの文字が入っていたら、barChartを返してそうじゃない場合にはlineChartを返す。
    return (
        <div className={styles.container}>
            {country.length ? barChart: lineChart}
        </div>
    )
}

export default Chart
