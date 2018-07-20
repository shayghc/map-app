import React from 'react'
import CreateList from './CreateList'

class SideNav extends React.Component {
    render() {
        let className = this.props.className

        return (
            <nav className={className}>
                <span><button aria-label="Close" className="closebtn" onClick={this.props.close}>&times;</button></span>
                    <CreateList
                        locations={this.props.locations}
                        fetchFilteredPOIs={this.props.fetchFilteredPOIs}
                        markerClick={this.props.markerClick}
                        className={this.props.className}
                     />
            </nav>
        )
    }
}

export default SideNav
