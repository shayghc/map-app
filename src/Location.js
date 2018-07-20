import React from 'react'

class Location extends React.Component {

    handleClick = (event) => {
        event.preventDefault()
        let title = this.props.title
        this.props.markerClick(title)
    }

    handleEnter = (event) => {
        event.preventDefault()
        if (event.keyCode === 13) {
            let title = this.props.title
            this.props.markerClick(title)
}
    }

    render() {
        const { location } = this.props;
        return(
            <li tabIndex="0" key={location.title} onClick={this.handleClick} onKeyUp={this.handleEnter}>
                <a>{location.id}.&nbsp;&nbsp;{location.title}</a>
            </li>
        )
    }
}

export default Location
