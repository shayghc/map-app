import React from 'react'

class Location extends React.Component {
    render() {
        const { location, id } = this.props;
        return(
            <li key={id}>
                {location.id}.&nbsp;&nbsp;{location.title}
            </li>
        )
    }
}

export default Location
