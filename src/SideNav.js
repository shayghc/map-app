import React from 'react'
import CreateList from './CreateList'

class SideNav extends React.Component {
    render() {
        let visibility = (this.props.className === 'sidenav') ? 'ul' : '.ul-active'
        let className = this.props.className
        let linkStyle = {
            listStyle: "none"
        }
        return (
            <nav className={className}>
                <ul id="navUL" className={{visibility}} style={linkStyle}>
                    <span><li className="closebtn" onClick={this.props.close}>&times;</li></span>
                    <CreateList
                        locations={this.props.locations}
                        markers={this.props.markers}
                        map={this.props.map}
                     />
                </ul>
            </nav>
        )
    }
}

export default SideNav
