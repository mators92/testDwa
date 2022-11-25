export default class AppConfiguration{

    static APP_NAME(){
        return  "OSP Rzeszów - Słocina"
    }

    static APP_VER(){
        return "v1.3"
    }

    static APP_UPDATE(){
        return "2022-11-25 17:45"
    }

    static APP_UPDATE_SHORT(){
        return this.APP_UPDATE().substr(0,10)
    }

    static HOST_API(){
        return 'https://osp.netserwer.pl/'
    }

}
