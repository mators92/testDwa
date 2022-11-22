import * as React from 'react'
import Content from "../globalComponent/Content";
import {scrollToTop} from "../Serwis";

export default class InfoView extends React.Component {

    componentDidMount() {
        scrollToTop();
    }

    render() {
        return(
            <Content>
                <h2>Informacje</h2>

            </Content>
        )
    }
}
