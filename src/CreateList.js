import React from 'react'
import Location from './Location'

class CreateList extends React.Component {
    state = {
        filter: '',
        places: [],
        firstPass: true
    }

    // Sets the initial sate for the locations
    componentDidMount() {
        this.setState({places: this.props.locations})
    }

    // Updates the list in the sidenav according to input text
    updateFilter(event) {
        // Next two lines resolve issue where the list did not update after input text was cleared
        this.setState({firstPass: false})
        if (event.target.value) {
            // Limit text input to 25 characters
            this.setState({filter: event.target.value.substr(0, 25)})

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

            this.setState({places: filteredPOIs})
        } else {
            // If the input text is cleared the reset the sidenav list to the original list i.e. full list
            this.setState({places: this.props.locations})
            // Filter needs to be reset because it will retain the last deleted letter otherwise
            this.setState({filter: ''})
        }

    }

    render() {
        return(
            <div>
                <input
                    type="text"
                    value={this.state.filter}
                    placeholder="Enter text to filter"
                    onChange={this.updateFilter.bind(this)}
                />
                {this.state.places.map((location) => {
                    return <Location location={location} id={location.id} key={location.title}/>
                })}
            </div>
        )
    }
}

export default CreateList
