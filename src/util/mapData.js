import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral'
import React from 'react'

const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52",
        half_op: "rgba(204, 16,52,0.5)",
        multipler: 800
    },
    recovered: {
            hex: "#7dd71d",
            rgb: "rgb(125, 215, 291",
            half_op: "rgba(125, 215,29,0.5)",
            multipler: 1200
        },
        deaths: {
            hex: "#fb4443",
            rgb: "rgb(252, 68, 67",
            half_op: "rgba(251, 68,67,0.51)",
            multipler: 2000
        }
   
}


//draw circles on the map
export const showDataOnMap = (data, casesType= "cases") => (
        data.map(country =>{ 
            return(
                <Circle 
                key={country.country}
                opacity={0.4}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                color={casesTypeColor[casesType]?.hex}
                fill={casesTypeColor[casesType]?.hex}
                radius={
                    Math.sqrt(country[casesType]) * casesTypeColor[casesType]?.multipler
                    }
                >
                <Popup>
                    <div className="info-container">
                        <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
                        <div className="info-name">{country.country}</div>
                        <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered">Recovered:{numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
                </Circle>
              
        )})
)