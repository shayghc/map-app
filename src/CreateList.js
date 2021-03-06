import React from 'react'
import Location from './Location'

class CreateList extends React.Component {
    state = {
        filter: '',
        places: []
    }

    // Sets the initial state for the locations
    componentDidMount() {
        this.setState({places: this.props.locations})
    }

    // Updates the list in the sidenav according to input text
    updateFilter(event) {
            // Limit text input to 25 characters
            this.setState({filter: event.target.value.substr(0, 25)})

            let filteredPOIs = this.props.locations.filter(
                (location) => {
                    // Do not return if filter does not match location.title
                    // -1 represents unable to find a match
                    return location.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
                }
            );

            // Provide a lable/id for each POI
            const labels = "ABCDEFGHIJ";
            for (let i = 0; i < filteredPOIs.length; i++) {
                filteredPOIs[i].id = labels[i];
            }

            this.setState({places: filteredPOIs})
            // Pass the places array to app.js to generate the markers
            this.props.fetchFilteredPOIs(filteredPOIs);
    }

    render() {
        let visibility = (this.props.className === 'sidenav') ? 'ul' : '.ul-active'
        let linkStyle = {
            listStyle: "none"
        }
        return(
            <div>
                <label for="filter">Filter the POIs</label>
                <input
                    id="filter"
                    type="text"
                    name="filter"
                    value={this.state.filter}
                    placeholder="Enter text to filter the list..."
                    onChange={this.updateFilter.bind(this)}
                    tabIndex="0"
                />
                <ul id="navUL" className={{visibility}} style={linkStyle}>
                {this.state.places.map((location) => {
                    return <Location
                        location={location}
                        id={location.id}
                        key={location.title}
                        title={location.title}
                        markerClick={this.props.markerClick}
                        className={this.props.className}
                    />
                })}
                </ul>
            </div>
        )
    }
}

export default CreateList
