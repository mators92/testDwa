import * as React from 'react'
import app_routes from "../configuration/app_routes";
// @ts-ignore
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {getImieNazwisko, isAdmin} from "../Serwis";
import { UserOutlined } from '@ant-design/icons';
import {Avatar} from "antd";

export default class SideBar extends React.Component {

    render() {
        return(
            <div>
                {/*<div className="sidebar">*/}
                {/*    <div className={'sidebar-header'}>*/}
                {/*        <span>MENU</span>*/}
                {/*    </div>*/}
                {/*    <div className={'menuItems'}>*/}
                {/*        <a className="active" href="#home">Home</a>*/}
                {/*        <a href="#news">News</a>*/}
                {/*        <a href="#contact">Contact</a>*/}
                {/*        <a href="#about">About</a>*/}
                {/*    </div>*/}


                <div className={'sidebar'}>
                    <div id={'sidebar-header'}>
                        <Avatar size="small" icon={<UserOutlined />} style={{marginRight: '15px'}}/>
                        <span>{getImieNazwisko()}</span>
                    </div>
                    {
                        app_routes.APP_ROUTES().map((item: any) => (
                            (item.admin)?
                                (isAdmin())&&
                                    <div>
                                        <div className={'menuItems'}>
                                            <Link to={item.url}>
                                                <div className={(window.location.pathname === item.url) ? 'current' : ""}
                                                     onClick={() => {
                                                         console.log("go to " + item.name)
                                                     }}>
                                                    <i className={item.icon}></i> {<span>{item.name}</span>}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                            :
                            <div>
                                <div className={'menuItems'}>
                                    <Link to={item.url}>
                                        <div className={(window.location.pathname === item.url) ? 'current' : ""}
                                             onClick={() => {
                                                 console.log("go to " + item.name)
                                             }}>
                                            <i className={item.icon}></i> {<span>{item.name}</span>}
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        )
    }
}
