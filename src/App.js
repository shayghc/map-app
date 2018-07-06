import React from "react";
import "./index.css";
import SideNav from './SideNav'

export default class App extends React.Component {
    state = {
        sidebar: "sidenav-active",
        locations: [
            {
                title: "Spinnaker Tower",
                location: {
                    lat: 50.79557519999999,
                    lng: -1.1085171
                }
            },
            {
                title: "HMS Warrior 1860",
                location: {
                    lat: 50.7982384,
                    lng: -1.1092475
                }
            },
            {
                title: "Round Tower",
                location: {
                    lat: 50.7905406,
                    lng: -1.1088802
                }
            },
            {
                title: "Mary Rose Museum",
                location: {
                    lat: 50.8022114,
                    lng: -1.1088526
                }
            },
            {
                title: "Action Stations",
                location: {
                    lat: 50.79991680000001,
                    lng: -1.1070106
                }
            },
            {
                title: "Charles Dickens Birthplace Museum",
                location: {
                    lat: 50.8070676,
                    lng: -1.0872127
                }
            },
            {
                title: "The D-Day Story",
                location: {
                    lat: 50.77964100000001,
                    lng: -1.089412
                }
            },
            {
                title: "Southsea Castle",
                location: {
                    lat: 50.777995,
                    lng: -1.0888283
                }
            },
            {
                title: "Royal Marines Museum",
                location: {
                    lat: 50.78429,
                    lng: -1.053795
                }
            },
            {
                title: "The Royal Navy Submarine Museum",
                location: {
                    lat: 50.7881692,
                    lng: -1.1195995
                }
            }
        ],
        placesList: []
    }

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

        this.buildPlacesList();
    }

    buildPlacesList() {
        console.log('Hello')
    }

    sidebarVisibility() {
        let elementClass =
            this.state.sidebar === "sidenav" ? "sidenav-active" : "sidenav";
        this.setState({ sidebar: elementClass });
    }

    closeNav = () => {
        this.setState({ sidebar: "sidenav" });
    };

    render() {
        return (
            <div id="app">
                <header>
                    <span onClick={this.sidebarVisibility.bind(this)}>
                        &#9776;
                    </span>
                    <h1>Portsmouth POIs</h1>
                </header>
                <SideNav
                    className={this.state.sidebar}
                    close={this.closeNav}
                    locations={this.state.locations}
                />
                <div id="map" />
            </div>
        );
    }
}
