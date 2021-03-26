import * as React from 'react'
import Content from "../globalComponent/Content";
// @ts-ignore
import {Link} from "react-router-dom";

export default class Page404 extends React.Component {

    render() {
        return(
            <Content>
                <h3 style={{width: '100%'}}><i className={"fa fa-exclamation-triangle"}></i> <span>Nie ma takiego adresu w aplikacji!</span></h3>
                <p><Link to={"/"} style={{display: 'block'}}>Kliknij tutaj aby powrócić</Link></p>
            </Content>
        )
    }
}
