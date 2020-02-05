import React from "react";
import "../styles/dashboard.css"
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from '../../images/logo plus.png';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
//iMPORTS ROUTING
import { dashboardRoutes } from '../../routes';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const psIgnored = new PerfectScrollbar(this.refs.mainPanel);
        }
    }



    render() {
        return (
            <div className="all">
                <Router>
                    <nav className="Header">
                        <div id="Logo">
                            <img src={Logo} alt="Logo"></img>
                        </div>
                        <ul className="Nav nav">
                            {
                                dashboardRoutes.map((prop, key) => {
                                    
                                    return(
                                        <NavLink className="Navitem" to={prop.layout + prop.path} key={key} activeClassName='Navitem-active'>
                                            <li className='nav-link text-center'>
                                                <Icon>
                                                    <prop.icon />
                                                </Icon>
                                                {prop.name}
                                            </li>
                                        </NavLink>
                                    );
                                })
                            }
                        </ul>
                        <div className="Tab_dr">
                            <IconButton className="iconos">
                                <MessageIcon style={{ fontSize: '1.2em' }} />
                            </IconButton>
                            <IconButton className="iconos">
                                <NotificationsIcon style={{ fontSize: '1.2em' }} />
                            </IconButton>
                            <IconButton className="iconos">
                                <SettingsIcon style={{ fontSize: '1.2em' }} />
                            </IconButton>
                            <div className="Circulo my-auto" id="usuario"></div>
                        </div>
                    </nav>
                    <div ref="mainPanel">
                        <Switch>
                            {
                                dashboardRoutes.map((prop, key) => {
                                    if (prop.layout === '/one-medical') {
                                        return(
                                            <Route 
                                                path={prop.layout + prop.path}
                                                component={prop.component}
                                                key={key}
                                            />
                                        );
                                    }
                                    return null;
                                })
                            }
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
export default Dashboard;