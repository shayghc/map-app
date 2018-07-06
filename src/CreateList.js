import React from 'react'
import Location from './Location'

class CreateList extends React.Component {
    state = {
        filter: ''
    }

    updateFilter(event) {
        // Limit text input to 25 characters
        this.setState({filter: event.target.value.substr(0, 25)})
    }

    render() {
        const labels = "ABCDEFGHIJ";
        let filteredPOIs = this.props.locations.filter(
            (location) => {
                // Do not return if filter does not match location.title
                // -1 represents unable to find a match
                return location.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
            }
        );

        // Provide a lable/id for each POI
        for (let i = 0; i < filteredPOIs.length; i++) {
            filteredPOIs[i].id = labels[i];
        }

        return(
            <div>
                <input
                    type="text"
                    value={this.state.filter}
                    placeholder="Enter text to filter"
                    onChange={this.updateFilter.bind(this)}
                />
                {filteredPOIs.map((location) => {
                    return <Location location={location} id={location.id}/>
                })}
            </div>
        )
    }
}

export default CreateList
