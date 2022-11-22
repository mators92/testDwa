export default class app_routes{

    static APP_ROUTES() {return [
        {
            icon: "fa fa-calendar",
            name: "Kalendarz",
            url:"/kalendarz",
            nested:false,
        },
        {
            icon: "fa fa-cog",
            name: "Ustawienia",
            url:"/ustawienia",
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
