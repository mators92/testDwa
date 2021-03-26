import * as React from 'react';
import {Link} from "react-router-dom";

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
            {/*    <Col>1 of 3</Col>*/}
            {/*    <Col xs={6}>2 of 3 (wider)</Col>*/}
            {/*    <Col>3 of 3</Col>*/}
            {/*</Row>*/}

            {/*<div className={'pull-right'}>*/}
            <div className={'push'}>
                {/*<Link to={'/login'}><span id={"wyloguj-btn"}><i className={"fa fa-power-off"}/> Wyloguj</span></Link>*/}
                <Link to={'/login'}><button type="button" className="btn btn-danger"><i className={"fa fa-power-off"}/> Wyloguj</button></Link>
            </div>

            {/*</div>*/}

        </div>
        )
    }
}
