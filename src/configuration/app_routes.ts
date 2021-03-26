export default class app_routes{

    static APP_ROUTES() {return [
        {
            icon: "fa fa-dashboard",
            name: "Start",
            url:"/start",
            nested:false,
        },
        {
            icon: "fa fa-id-card-o",
            name: "Klienci",
            url:"/klienci",
            nested:false,
        },
        {
            icon: "fa fa-money",
            name: "Promocje",
            url:"/promocje",
            nested:false,
        },
        {
            icon: "fa fa-building",
            name: "Oddziały",
            url:"/oddzialy",
            nested:false,
        },
        {
            icon: "fa fa-info",
            name: "Informacje",
            url:"/info",
            nested:false,
        },

    ]}
}
