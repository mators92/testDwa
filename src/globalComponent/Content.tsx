import * as React from 'react'
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

export default class Content extends React.Component {

    render() {
        return(
            <div id={'body'}>

                <Header/>

                <Menu/>

                <div className={'opakowanie'}>
                    <div className="content">
                        <div className={"page"}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer/>
                </div>

            </div>
        )
    }
}
