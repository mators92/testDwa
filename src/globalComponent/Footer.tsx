import * as React from 'react'
import AppConfiguration from '../configuration/AppConfiguration';

export default class Footer extends React.Component {

    onMenu = () => {
        //alert('ok');
        // @ts-ignore
        document.getElementById("sidenav").style.width = "250px";
    }

    render() {
        return(
            <div id={'top-footer'}>
                <div id={'f-inner'}>
                    <span id={'f-icon'}>
                        {/*<img src={icon} />*/}
                    </span>
                    <span id={'f-name'}>
                        {AppConfiguration.APP_NAME()}
                    </span>
                    <span id={'f-update'}>
                    {AppConfiguration.APP_UPDATE()}
                    </span>
                    <span id={'f-ver'}>
                    {AppConfiguration.APP_VER()}
                    </span>
                    {/*<span id={'f-topsa'}>*/}
                    {/*    by <a href={"http://topsa.com.pl"} target={"_blank"}>topsa.com.pl</a>*/}
                    {/*</span>*/}
                </div>
            </div>
        )
    }
}
