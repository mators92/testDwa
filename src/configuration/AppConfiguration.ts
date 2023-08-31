export default class AppConfiguration{

    static APP_NAME(){
        return  "OSP Rzeszów - Słocina"
    }

    static APP_VER(){
        return "v1.48"
    }

    static APP_UPDATE(){
        return "2023-08-31"
    }

    static APP_UPDATE_SHORT(){
        return this.APP_UPDATE().substr(0,10)
    }

    static HOST_API(){
        return `https://dyzury.osprzeszowslocina.pl/`

        // if((window.location.origin.indexOf('localhost') > -1) || (window.location.origin.indexOf('10.10.10.92') > -1)){
        //     return 'https://osp.netserwer.pl/'
        // } else {
        //     return `https://dyzury.osprzeszowslocina.pl/`
        // }
    }

}
