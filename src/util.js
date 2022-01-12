import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 150,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 150,
  },
  deaths: {
    hex: "#242526",
    multiplier: 1000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  //Descending order (largest to lowest)
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// Draw cases circles on the map
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex }}
      // Circle radius gets bigger depending on the case
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// To make number looks better
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
