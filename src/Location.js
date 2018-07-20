import React from 'react'

class Location extends React.Component {

    handleClick = () => {
        let title = this.props.title
        this.props.markerClick(title)
    }

    render() {
        const { location } = this.props;
        return(
            <li tabindex="0" key={location.title} onClick={this.handleClick}>
                {location.id}.&nbsp;&nbsp;{location.title}
            </li>
        )
    }
}

export default Location
