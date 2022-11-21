import axios from "axios";
import moment from "moment";
// import HOST_API from "./configuration/AppConfiguration";

const HOST_API = 'https://osp.netserwer.pl/';

export const isLogged = () => {
    if (sessionStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return true
    } else {
        return false
    }
}

export const getImieNazwisko = () => {
    if (sessionStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return JSON.parse(sessionStorage.sesjaUzytkownikaSystemuOSP).imie + ' ' + JSON.parse(sessionStorage.sesjaUzytkownikaSystemuOSP).nazwisko
    } else {
        return ''
    }
}

export const getNumer = () => {
    if (sessionStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return JSON.parse(sessionStorage.sesjaUzytkownikaSystemuOSP).numer
    } else {
        return ''
    }
}

export const login = (haslo: any, numer: number) => {
    return axios({
        method: 'POST',
        url: HOST_API + "login.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            nr: numer,
            pas: haslo
        }
    })
}

export const dodajDyspozycyjnosc = (numer: any, kiedy: any) => {
    return axios({
        method: 'POST',
        url: HOST_API + "insertDyspo.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            numer: numer,
            data: kiedy
        }
    })
}

export const getKalendarz = () => {
    return axios({
        method: 'POST',
        url: HOST_API + "getKalendarz.php",
        headers: {"Content-Type": "text/plain"}
    })
}

export const wyloguj = () => {
    sessionStorage.removeItem('sesjaUzytkownikaSystemuOSP')
    //window.location('/')
    //window.location.reload()
    window.location.replace('/')
    //this.props.history.push('/')
    console.log('wylogowano')
}