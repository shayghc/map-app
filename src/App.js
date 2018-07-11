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
                },
                id: 'A'
            },
            {
                title: "HMS Warrior 1860",
                location: {
                    lat: 50.7982384,
                    lng: -1.1092475
                }
                ,
                id: 'B'
            },
            {
                title: "Round Tower",
                location: {
                    lat: 50.7905406,
                    lng: -1.1088802
                },
                id: 'C'
            },
            {
                title: "Mary Rose Museum",
                location: {
                    lat: 50.8022114,
                    lng: -1.1088526
                },
                id: 'D'
            },
            {
                title: "Action Stations",
                location: {
                    lat: 50.79991680000001,
                    lng: -1.1070106
                },
                id: 'E'
            },
            {
                title: "Charles Dickens Birthplace Museum",
                location: {
                    lat: 50.8070676,
                    lng: -1.0872127
                },
                id: 'F'
            },
            {
                title: "The D-Day Story",
                location: {
                    lat: 50.77964100000001,
                    lng: -1.089412
                },
                id: 'G'
            },
            {
                title: "Southsea Castle",
                location: {
                    lat: 50.777995,
                    lng: -1.0888283
                },
                id: 'H'
            },
            {
                title: "Royal Marines Museum",
                location: {
                    lat: 50.78429,
                    lng: -1.053795
                },
                id: 'I'
            },
            {
                title: "The Royal Navy Submarine Museum",
                location: {
                    lat: 50.7881692,
                    lng: -1.1195995
                },
                id: 'J'
            }
        ],
        places: [],
        markers: [],
        map: {}
    }

    componentDidMount() {
        // Invoke map instance with initialisation data
        let map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 50.7934612,
                lng: -1.1098803
            },
            zoom: 14,
            mapTypeId: "roadmap"
        });

        // Return map to center if the map is moved off centre
        map.addListener("center_changed", function() {
            window.setTimeout(function() {
                map.panTo({
                    lat: 50.7934612,
                    lng: -1.1098803
                });
            }, 1000);
        });

        this.setState({map: map})
        this.generateMarkers(map, this.state.locations)
    }

    generateMarkers(map, locations) {
        const markersList = [];
        let largeInfoWindow = new window.google.maps.InfoWindow();
        let bounds = new window.google.maps.LatLngBounds();
        const labels = "ABCDEFGHIJ";

        // Generate markers

        this.deleteMarkers()

        for (let i = 0; i < locations.length; i++) {
            let position = locations[i].location;
            let title = locations[i].title;
            // Create marker object
            let marker = new window.google.maps.Marker({
                map: map,
                position: position,
                title: title,
                icon: 'http://maps.google.com/mapfiles/marker' + labels[i] + '.png',
                animation: window.google.maps.Animation.DROP,
                id: labels[i]
            });
            // Push each marker to the markers array
            markersList.push(marker);
            // Extend the boundaries of the map for the Markers
            bounds.extend(marker.position);
            // Create an onclick event for the infowindows
            marker.addListener("click", function() {
                populateInfoWindow(this, largeInfoWindow);
                // Add double bounce when clicked
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400);
            });
            //this.setMarkersList(markersList);
            map.fitBounds(bounds);
        }
        this.setMarkersList(markersList);

        // This function populates the infowindow when a marker is clicked
        function populateInfoWindow(marker, infowindow) {
            // Ensure that the infowindow is not already open on this marker
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                // InfoWindow content is specified here
                infowindow.setContent("<div>" + marker.title + "</div>");
                infowindow.open(map, marker);
                // Clear marker property if window is closed
                infowindow.addListener("closeclick", function() {
                    infowindow.close(); // setMarker(null) will not work here, causes a cors error
                });
            }
        }
    }

    deleteMarkers() {
        let markers = this.state.markers
        // Clear map on each marker
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
        }
        // Set array length to 0 to clear the array
        markers.length = 0;
        // Update this.state.markers with an empty array ready to generate more markers
        this.setState({markers: markers})
    }

    setMarkersList(markersList) {
        this.setState({ markers: markersList });
    }

    fetchFilteredPOIs(filteredPOIs) {
        this.setState({places: filteredPOIs})
        this.generateMarkers(this.state.map, this.state.places);
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
        let mapClass = this.state.sidebar === "sidenav" ? "map" : "map-active"
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
                    fetchFilteredPOIs={this.fetchFilteredPOIs.bind(this)}
                />
                <div id="map" className={mapClass}/>
            </div>
        );
    }
}
