import * as React from 'react'
import Content from "../globalComponent/Content";
import {Button, Col, Row} from "react-bootstrap";
import './../styles/ustawienia.css';
import {getNumer, login, scrollToTop, zmienHaslo} from "../Serwis";

interface Props {

}

interface State {
    stareHaslo: any,
    noweHaslo: any,
    repNoweHaslo: any,
    czyNowe: boolean
}

export default class UstawieniaView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            stareHaslo: '',
            noweHaslo: '',
            repNoweHaslo: '',
            czyNowe: false
        }
    }

    componentDidMount() {
        scrollToTop();
    }

    czyNoweHaslo = () => {
        this.setState({ czyNowe: Boolean(this.state.stareHaslo && this.state.noweHaslo && this.state.repNoweHaslo) });
    };

    onChangeStareHaslo = (e: string) => {
        this.setState({ stareHaslo: e }, () => this.czyNoweHaslo());
    };

    onChangeNoweHaslo = (e: string) => {
        this.setState({ noweHaslo: e }, () => this.czyNoweHaslo());
    };

    onChangeRepNoweHaslo = (e: string) => {
        this.setState({ repNoweHaslo: e }, () => this.czyNoweHaslo());
    };

    zmienHaslo=()=>{
        console.log('zgadza sieeee')
        zmienHaslo(this.state.noweHaslo).then(res => {
            if (res.status === 200){
                this.setState({
                    stareHaslo: '',
                    noweHaslo: '',
                    repNoweHaslo: ''
                });
                // toast.success("Hasło zostało zmienione");
                //this.props.history.push('/')
            } else {
                console.log('error')
            }
        }).catch(error => {
            console.log('Zmiana hasla blad');
        });
    }

    onZmien=()=>{
        if ((this.state.noweHaslo===this.state.repNoweHaslo) && (this.state.noweHaslo))
        {
            login(this.state.stareHaslo, getNumer()).then(res => {
                if (res.status === 200){
                    this.zmienHaslo();
                } else {
                    console.log('error')
                }
            }).catch(error => {
                console.log('Zle dane logowania');
                // toast.error("Złe stare hasło!");
            });
        }
        else
        {
            // toast.error("Popraw nowe hasła!");
        }
    }

    render() {
        let {stareHaslo, noweHaslo, repNoweHaslo} = this.state;

        return(
            <Content>
                <div className={'ustawieniaPage'}>
                <h2 style={{textAlign: 'center'}}>Ustawienia</h2>

                <Row>
                    <Col>
                        <h5>Zmiana hasła</h5>

                        <div className={"col-md-5"}>
                            <label>Stare hasło:</label>
                            <input
                                className={"form-control"}
                                //placeholder={'Podaj temat...'}
                                // required
                                type={"password"}
                                value={stareHaslo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeStareHaslo(e.target.value)}
                            />
                        </div>

                        <div className={"col-md-5"}>
                            <label>Nowe Hasło:</label>
                            <input
                                className={"form-control"}
                                //placeholder={'Podaj temat...'}
                                // required
                                type={"password"}
                                value={noweHaslo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeNoweHaslo(e.target.value)}
                            />
                        </div>

                        <div className={"col-md-5"}>
                            <label>Powtórz nowe hasło:</label>
                            <input
                                className={"form-control"}
                                //placeholder={'Podaj temat...'}
                                // required
                                type={"password"}
                                value={repNoweHaslo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeRepNoweHaslo(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={'btnZmianaHasla'}>
                            <Button variant={'primary'} size={'sm'} onClick={this.onZmien}>
                                <><i className="fa fa-floppy-o" /> Zmień hasło</>
                            </Button>
                        </div>
                    </Col>
                </Row>

                </div>
            </Content>
        )
    }
}
