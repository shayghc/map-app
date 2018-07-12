import React from "react";
import "./index.css";
import SideNav from './SideNav'
import ReactTestUtils from 'react-dom/test-utils'
//import swal from 'sweetalert'


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
                title: "Portsmouth Historic Dockyard",
                location: {
                    lat: 50.800531,
                    lng: -1.1094659
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
                title: "Portsmouth Anglican Cathedral",
                location: {
                    lat: 50.7904478,
                    lng: -1.1042945
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
                title: "Explosion! Museum of Naval Firepower",
                location: {
                    lat: 50.807553,
                    lng: -1.126353
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
        map: {},
        data: {}
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

        // Get infowindow content!!!!!!!!!!!!!!!!!!!!!!!!!
        fetch('https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3?&oauth_token=WO4IYUFMH0UFRBBAUDK0C04TVCOBC4N454Z1PR3VYECSMBXN&v=20180712')
        .then(response => response.json())
        .then(data => this.setState({data}))
        .catch(error => ('Unable to retrieve data, network error!'))
    }

    // Generate markers
    generateMarkers(map, locations) {
        const markersList = [];
        let largeInfoWindow = new window.google.maps.InfoWindow();
        let bounds = new window.google.maps.LatLngBounds();
        const labels = "ABCDEFGHIJ";
        // Clear current markers ready to generate new markers
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
        // Pass the generated marker list ready to update state
        this.setMarkersList(markersList);

        // This function populates the infowindow when a marker is clicked
        function populateInfoWindow(marker, infowindow) {
            // Ensure that the infowindow is not already open on this marker
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                // InfoWindow content is specified here
                infowindow.setContent("<div>" + marker.title + "</div>");
                //infowindow.setContent(data.response.venue.name)
                infowindow.open(map, marker);
                // Clear marker property if window is closed
                infowindow.addListener("closeclick", function() {
                infowindow.close(); // setMarker(null) will not work here, causes a cors error
                });
            }
        }
    }

    // Remove redundant markers form the map before generating new markers
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

    // Once the list of markers have been generated, update state
    setMarkersList(markersList) {
        this.setState({ markers: markersList });
    }

    // Fetch the filtered list from CreateList.js
    fetchFilteredPOIs(filteredPOIs) {
        this.setState({places: filteredPOIs})
        // Pass the filtered POIs to generate new markers
        this.generateMarkers(this.state.map, this.state.places);
    }

    // This class determines if the sidenav is visible or collapsed
    sidebarVisibility() {
        let elementClass =
            this.state.sidebar === "sidenav" ? "sidenav-active" : "sidenav";
        this.setState({ sidebar: elementClass });
    }

    // Close the sidenav
    closeNav = () => {
        this.setState({ sidebar: "sidenav" });
    };

    // Pass the sidenav item click event to the corresponding marker
    markerClick(title) {
        const targetMarker = this.state.markers.filter(marker => marker.title === title)
        console.log(targetMarker)
        // Neither click simulation method works here ---- WHY NOT?
        ReactTestUtils.Simulate.click(targetMarker)
        //targetMarker.dispatchEvent(new Event('click'))
    }

    render() {
        let mapClass = this.state.sidebar === "sidenav" ? "map" : "map-active"
        console.log('Data = ', this.state.data)
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
                    markerClick={this.markerClick.bind(this)}
                />
                <div id="map" className={mapClass}/>
            </div>
        );
    }
}
