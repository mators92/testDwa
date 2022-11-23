import * as React from 'react'
import app_routes from "../configuration/app_routes";
// @ts-ignore
import {Link} from "react-router-dom";
import {getImieNazwisko} from "../Serwis";
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

export default class SideNav extends React.Component {

    onClose = () => {
        // alert('ok');
        // @ts-ignore
        document.getElementById("sidenav").style.width = "0px";
    }

    render() {
        return(
            <div id="sidenav" className="sidenav">
                <a className="closebtn" onClick={this.onClose}><i className={'fa fa-bars'}/></a>
                <div id={'sidebar-header'}>
                    <Avatar size="small" icon={<UserOutlined />} style={{marginRight: '15px'}}/>
                    <span style={{display: 'inline-block'}}>{getImieNazwisko()}</span>
                    {/*<span>MENU</span>*/}
                </div>


                <div className={'sidenav'}>
                    <a className="closebtn" onClick={this.onClose}><i className={'fa fa-bars'}/></a>
                    {
                        app_routes.APP_ROUTES().map((item: any) => (
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
                {/*<div className={'menuItems'}>*/}
                {/*    <a className="active" href="#home">Home</a>*/}
                {/*    <a href="#news">News</a>*/}
                {/*    <a href="#contact">Contact</a>*/}
                {/*    <a href="#about">About</a>*/}
                {/*</div>*/}
            </div>

        )
    }
}
