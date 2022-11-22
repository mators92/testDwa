import * as React from 'react';
import {Link} from "react-router-dom";
import {getImieNazwisko, wyloguj} from "../Serwis";
import {Col, Row} from "react-bootstrap";

export default class Header extends React.Component {

    onMenu = () => {
        //alert('ok');
        // @ts-ignore
        document.getElementById("sidenav").style.width = "250px";
    }

    render() {
        return(
        <div className = {'header'} >
            <button id={'menuButton'} onClick={this.onMenu}>
                <span onClick={this.onMenu}><i className={'fa fa-bars'}/></span>
            </button>


                {/*<span onClick={this.onMenu} className="navbar-toggler-icon"><i className={'fa fa-bars'}/></span>*/}


            {/*<Row>*/}
            {/*    <Col>{getImieNazwisko()}</Col>*/}
            {/*</Row>*/}

            {/*<div className={'pull-right'}>*/}
            <div className={'push'}>
                {/*<Link to={'/login'}><span id={"wyloguj-btn"}><i className={"fa fa-power-off"}/> Wyloguj</span></Link>*/}
                <button type="button" className="onDesktop btn btn-danger" onClick={() => wyloguj()}><i className={"fa fa-power-off"}/> Wyloguj</button>
                <button type="button" className="onMobile btn btn-danger" onClick={() => wyloguj()}><i className={"fa fa-power-off"}/></button>
            </div>

            {/*</div>*/}

        </div>
        )
    }
}
