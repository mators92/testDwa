export default class AppConfiguration{

    static APP_NAME(){
        return  "OSP Rzeszów - Słocina"
    }

    static APP_VER(){
        return "v1.0"
    }

    static APP_UPDATE(){
        return "2020-02-01 12:00"
    }

    static APP_UPDATE_SHORT(){
        return this.APP_UPDATE().substr(0,10)
    }

    static HOST_API(){
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
            return 'http://centos7.top:8080/admin/api/'
        else
            return '/admin/api/'
    }

}
