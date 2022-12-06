import * as React from 'react'
import {Link} from "react-router-dom";
import logo from "./../logo.svg"
import {login} from "../Serwis";
import {message} from "antd";

interface Props{
    //
}

interface State {
    login: any,
    password: any
}

export default class LoginView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            login: null,
            password: ''
        }
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        login(this.state.password, this.state.login).then(res => {
            if (res.status === 200){
                console.log(res)
                let data = res.data
                data.password = this.state.password
                localStorage.setItem('sesjaUzytkownikaSystemuOSP', JSON.stringify({imie: res.data[0].IMIE, nazwisko: res.data[0].NAZWISKO, numer: this.state.login, dostep: res.data[0].DOSTEP, c: res.data[0].PRAW_C}))
                window.location.reload()
                //this.props.history.push('/')
            } else {
                // console.log('error')
                message.error('Error');
            }
        }).catch(error => {
            // console.log('Zle dane logowania');
            message.error('Złe dane logowania');
            // toast.error("Błąd logowania!");
        });
        //localStorage.setItem('sesjaUzytkownika', JSON.stringify(this.state))
        //window.location.reload()
        //console.log('zalogowano')

    }

    onChangeUsername = (login: any) => {
        this.setState({login: login.target.value});
    }

    onChangePassword = (pass: any) => {
        this.setState({password: pass.target.value});
    }

    render() {
        let {login, password} = this.state;

        return(
            <div className={'loginView'}>
                <div className={'loginComponent'}>
                    {/*<img src={logo} alt={'logo'} className={'logo'} style={{width: '320px'}}/>*/}
                    <h1>OSP Rzeszów - Słocina</h1>
                    <div className={'loginContainer'}>
                        <form onSubmit={this.onSubmit}>
                            <label>Login:</label>
                            <div><input required type={'text'} className={"form-control"} value={login}
                                        onChange={this.onChangeUsername}
                            />
                            </div>
                            <label>Hasło:</label>
                            <div><input required type={'password'} className={'form-control'} value={password}
                                        onChange={this.onChangePassword}
                            />
                            </div>
                            <div>
                                <button
                                    type={'submit'} className={'btn'}>ZALOGUJ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
