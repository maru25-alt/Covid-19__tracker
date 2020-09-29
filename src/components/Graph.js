import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral"

const options ={
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales:{
        xAxes:[
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes:[
            {
                gridLines:{
                    display: false,
                },
                ticks:{
                    callback: function(value, index, values){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

function Graph({casesType}) {
    const [data, setData] = useState({})

    useEffect(() => {
       fetch('https://disease.sh/v3/covid-19/historical/all')
       .then(res =>  res.json())
       .then(data =>{
           const chartData = buildChartData(data, casesType)
           setData(chartData)
       })
       
    }, [casesType])

    const buildChartData = (data, cases) => {
        const chartData = [];
        let lastDataPoint;
       for(let date in data.cases) {
            if(lastDataPoint){
                const newDataPoints = {
                    x: date,
                    y:data[cases][date]- lastDataPoint
                }
                chartData.push(newDataPoints)
            }
            lastDataPoint = data[cases][date]
        }
        return chartData
    }



   
    return (
        <div>
            {data?.length > 0  &&
              <Line
              data={
                  {
                 datasets: [{
                     data: data,
                     borderColor: "#CC1034",
                     backgroundColor: "rgb(235, 106, 106)"
                    }]
                 }
               } 
              options={options}></Line>
            
            }
          
        </div>
    )
}

export default Graph
