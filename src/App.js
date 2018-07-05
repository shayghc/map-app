import React from "react";
import "./index.css";

export default class App extends React.Component {
    componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 50.7934612,
                lng: -1.1098803
            },
            zoom: 14,
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

    sidebarVisibility() {
        let elementClass =
            this.state.sidebar === "sidenav" ? "sidenav-active" : "sidenav";
        this.setState({ sidebar: elementClass });
    }

    render() {
        return (
            <div id="app">
                <header>
                    <span onClick={this.sidebarVisibility.bind(this)}>
                        &#9776;
                    </span>
                    <h1>Portsmouth POIs</h1>
                </header>
                <div id="map" />
            </div>
        );
    }
}
