import {Component, Fragment} from "react";
import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';

import {NavLink} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            isNavOpen: false,
            isDropOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleDropdown() {
        this.setState({
            isDropOpen: !this.state.isDropOpen
        });
    }

    render() {
        return (
            <Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            <p id="header-text">Минимальное остовное дерево</p>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/info' id="nav-item-text" style={{marginTop: '5px'}}>
                                        <span className="fa fa-info fa-md"/> Инструкция</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contacts' id="nav-item-text" style={{marginTop: '5px'}}>
                                        <span className="fa fa-address-card fa-md"/> Контакты</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </Fragment>
        );
    }
}

export default Header;