import axios from "axios";
import moment from "moment";
// import HOST_API from "./configuration/AppConfiguration";

const HOST_API = 'https://osp.netserwer.pl/';

export const isLogged = () => {
    if (localStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return true
    } else {
        return false
    }
}

export const isAdmin = () => {
    if (JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP).dostep === '1'){
        return true
    } else {
        return false
    }
}

export const czyMamC = () => {
    if (JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP).c === '1'){
        return true
    } else {
        return false
    }
}

export const getSesja = () => {
    return JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP)
}

export const getImieNazwisko = () => {
    if (localStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP).imie + ' ' + JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP).nazwisko
    } else {
        return ''
    }
}

export const getNumer = () => {
    if (localStorage.sesjaUzytkownikaSystemuOSP !== undefined){
        return JSON.parse(localStorage.sesjaUzytkownikaSystemuOSP).numer
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

export const zmienHaslo = (nowe: any) => {
    return axios({
        method: 'post',
        url: HOST_API + "zmianahasla.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            nr: getNumer(),
            nowe: nowe
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

export const getUzytkownicy = () => {
    return axios({
        method: 'get',
        url: HOST_API + "uzytkownicy.php"
    })
}

export const getUzytkownik = (numer: any) => {
    return axios({
        method: 'get',
        url: HOST_API + "uzytkownik.php/?numer="+numer
    })
}

export const zmienPrawo = (numer: any, pb: boolean, pc: boolean) => {
    return axios({
        method: 'POST',
        url: HOST_API + "updatePrawo.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            numer: numer,
            pb: pb? 1 : 0,
            pc: pc? 1 : 0
        }
    })
}

export const dodajUzytkownika = (imie: string, nazwisko: string, numer: string) => {
    return axios({
        method: 'post',
        url: HOST_API + "insertuser.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            imie: imie,
            nazwisko: nazwisko,
            numer: numer
        }
    })
}

export const delUser = (numer: string) => {
    return axios({
        method: 'delete',
        url: HOST_API + "deleteuser.php",
        headers: {"Content-Type": "text/plain"},
        data: {
            numer: numer
        }
    })
}

export const wyloguj = () => {
    localStorage.removeItem('sesjaUzytkownikaSystemuOSP')
    //window.location('/')
    //window.location.reload()
    window.location.replace('/')
    //this.props.history.push('/')
    console.log('wylogowano')
}

export const scrollToTop = () => {
    let scrollStep = -window.scrollY / (100 / 10)
    let scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
        }
        else clearInterval(scrollInterval);
    }, 10);
}

export const isEmpty = (value: any) => {
    return value === undefined || value === null || value === '' || value === 'null';
}