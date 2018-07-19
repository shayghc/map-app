import React from "react";
import "./index.css";
import SideNav from './SideNav'
import swal from 'sweetalert2'

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
                id: 'A',
                info: '4b6447c7f964a5200ea82ae3'
            },
            {
                title: "HMS Warrior 1860",
                location: {
                    lat: 50.7982384,
                    lng: -1.1092475
                }
                ,
                id: 'B',
                info: '4b7ac339f964a520753b2fe3'
            },
            {
                title: "Round Tower",
                location: {
                    lat: 50.7905406,
                    lng: -1.1088802
                },
                id: 'C',
                info: '4b7be22bf964a52009722fe3'
            },
            {
                title: "Portsmouth Historic Dockyard",
                location: {
                    lat: 50.800531,
                    lng: -1.1094659
                },
                id: 'D',
                info: '4b7aa0ebf964a52060342fe3'
            },
            {
                title: "Action Stations",
                location: {
                    lat: 50.79991680000001,
                    lng: -1.1070106
                },
                id: 'E',
                info: '4b7ab545f964a52065382fe3'
            },
            {
                title: "Portsmouth Anglican Cathedral",
                location: {
                    lat: 50.7904478,
                    lng: -1.1042945
                },
                id: 'F',
                info: '4b7972f6f964a52004fa2ee3'
            },
            {
                title: "The D-Day Story",
                location: {
                    lat: 50.77964100000001,
                    lng: -1.089412
                },
                id: 'G',
                info: '4c446544f05e95210f0fe4b3'
            },
            {
                title: "Southsea Castle",
                location: {
                    lat: 50.777995,
                    lng: -1.0888283
                },
                id: 'H',
                info: '4b797814f964a520fdfa2ee3'
            },
            {
                title: "Explosion! Museum of Naval Firepower",
                location: {
                    lat: 50.807553,
                    lng: -1.126353
                },
                id: 'I',
                info: '4bd7fef8dc4b9521cd307888'
            },
            {
                title: "The Royal Navy Submarine Museum",
                location: {
                    lat: 50.7881692,
                    lng: -1.1195995
                },
                id: 'J',
                info: '4d8b69e77d4c5481e75f7d71'
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

        /* Return map to center if the map is moved off centre
        // This functionality was moved to the infowindow close event
        map.addListener("center_changed", function() {
            window.setTimeout(function() {
                map.panTo({
                    lat: 50.7934612,
                    lng: -1.1098803
                });
            }, 1000);
        });*/

        this.setState({map: map})
        this.generateMarkers(map, this.state.locations)
    }

    // Generate markers
    generateMarkers(map, locations) {
        // Filter the locations used to generate the markers and sidenav list
        this.setState({places: locations})

        const markersList = [];
        let largeInfoWindow = new window.google.maps.InfoWindow();
        let bounds = new window.google.maps.LatLngBounds();
        const labels = "ABCDEFGHIJ";
        // Clear current markers ready to generate new markers
        this.deleteMarkers()

        for (let i = 0; i < locations.length; i++) {
            let position = locations[i].location;
            let title = locations[i].title;
            let information = locations[i].info;
            // Create marker object
            let marker = new window.google.maps.Marker({
                map: map,
                position: position,
                title: title,
                icon: 'http://maps.google.com/mapfiles/marker' + labels[i] + '.png',
                animation: window.google.maps.Animation.DROP,
                id: labels[i],
                info: information
            });
            // Push each marker to the markers array
            markersList.push(marker);
            // Extend the boundaries of the map for the Markers
            bounds.extend(marker.position);
            // Create an onclick event for the infowindows
            marker.addListener("click", function() {
                map.panTo(position)
                populateInfoWindow(this, largeInfoWindow, map);
                // Add double bounce when clicked
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400);
            });
            //this.setMarkersList(markersList);
            //map.fitBounds(bounds);
        }

        // Pass the generated marker list ready to update state
        this.setMarkersList(markersList);

        // This function populates the infowindow when a marker is clicked
        function populateInfoWindow(marker, infowindow, map) {
            // Ensure that the infowindow is not already open on this marker
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent("<div></div>");

                fetch('https://api.foursquare.com/v2/venues/' + marker.info + '?&oauth_token=WO4IYUFMH0UFRBBAUDK0C04TVCOBC4N454Z1PR3VYECSMBXN&v=20180712')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            infowindow.setContent("<div>Unable to get FourSquare info for " + marker.title + " at this time.\nPLease refresh your browser.</div>")
                            return;
                        }
                        // Extract response data
                        response.json().then(function(data) {
                            // InfoWindow content is specified here
                            infowindow.setContent("<div><h3>" + data.response.venue.name + "</h3><p><em>Address:</em><br>" + data.response.venue.location.formattedAddress[0] + ",<br>" + data.response.venue.location.formattedAddress[1] + ",<br>" + data.response.venue.location.formattedAddress[2] + ",<br>" + data.response.venue.location.formattedAddress[3] + "</p></div>");
                        })
                    }
                )
                .catch(function(err) {
                    swal({
                        title: 'Connection error',
                        text: 'Unable to connect with the FourSquare server.',
                        footer: 'Please check your internet connection.'
                    })
                    infowindow.close();
                    map.panTo({lat: 50.7934612, lng: -1.1098803})
                });

                infowindow.open(map, marker);
                // Clear marker property if window is closed
                infowindow.addListener("closeclick", function() {
                    infowindow.close(); // setMarker(null) will not work here, causes a CORS error
                    map.panTo({lat: 50.7934612, lng: -1.1098803})
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
        // Pass the filtered POIs to generate new markers
        this.generateMarkers(this.state.map, filteredPOIs);
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
        for (let i = 0; i < this.state.markers.length; i++) {
            if (this.state.markers[i].title === title) {
                let targetMarker = this.state.markers[i];
                window.google.maps.event.trigger(targetMarker, 'click');
                return;
            }
        }
    }

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
                    markerClick={this.markerClick.bind(this)}
                />
                <div id="map" className={mapClass}/>
            </div>
        );
    }
}
