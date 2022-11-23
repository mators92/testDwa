export default class app_routes{

    static APP_ROUTES() {return [
        {
            icon: "fa fa-calendar",
            name: "Kalendarz",
            url:"/kalendarz",
            admin: false,
        },
        {
            icon: "fa fa-users",
            name: "Użytkownicy",
            url:"/uzytkownicy",
            admin: true,
        },
        {
            icon: "fa fa-cog",
            name: "Ustawienia",
            url:"/ustawienia",
            admin: false,
        },
        {
            icon: "fa fa-info",
            name: "Informacje",
            url:"/info",
            admin: false,
        },

    ]}
}
