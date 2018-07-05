import React from "react";
import "./index.css";

export default class App extends React.Component {
    componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 50.7934612,
                lng: -1.1098803
            },
            zoom: 12,
            mapTypeId: "roadmap"
        });

        // Return map to center after 5s if the map is moved off centre
        map.addListener("center_changed", function() {
            window.setTimeout(function() {
                map.panTo({
                    lat: 50.7934612,
                    lng: -1.1098803
                });
            }, 1000);
        });
    }

    render() {
        return (
            <div id="app">
                <div id="map" />
            </div>
        );
    }
}
