import * as React from 'react'
import {Link} from "react-router-dom";
import logo from "./../logo.svg"

export default class LoginView extends React.Component {

    onSubmit = () => {

    }

    render() {
        return(
            <div className={'loginView'}>
                <div className={'loginComponent'}>
                    <img src={logo} alt={'logo'} className={'logo'} style={{width: '320px'}}/>
                    <div className={'loginContainer'}>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <label>Login:</label>
                            <div><input required type={'text'} className={"form-control"} value={'username'}
                                        //onChange={this.onChangeUsername}
                            />
                            </div>
                            <label>Hasło:</label>
                            <div><input required type={'password'} className={'form-control'} value={'password'}
                                        //onChange={this.onChangePassword}
                            />
                            </div>
                            <div>
                                <Link to={'/start'}>
                                    <button
                                        type={'submit'} className={'btn'}>ZALOGUJ
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
