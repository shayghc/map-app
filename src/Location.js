import React from 'react'

class Location extends React.Component {

    showClick = () => {
        console.log('Click!!')
    }

    render() {
        const { location } = this.props;
        // The location.id is over-ridden in filtered lists by updateList() in CreateList.js
        return(
            <li key={location.title} onClick={this.showClick}>
                {location.id}.&nbsp;&nbsp;{location.title}
            </li>
        )
    }
}

export default Location
