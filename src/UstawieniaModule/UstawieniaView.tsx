import * as React from 'react'
import Content from "../globalComponent/Content";
import {Button, Col, Row} from "react-bootstrap";
import './../styles/ustawienia.css';
import {getNumer, getSesja, getUzytkownik, login, scrollToTop, zmienHaslo, zmienPrawo} from "../Serwis";
import {message, Radio, RadioChangeEvent, Spin} from "antd";

interface Props {

}

interface State {
    stareHaslo: any,
    noweHaslo: any,
    repNoweHaslo: any,
    czyNowe: boolean,
    prawoJazdy: any,
    loading: boolean
}

export default class UstawieniaView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            stareHaslo: '',
            noweHaslo: '',
            repNoweHaslo: '',
            czyNowe: false,
            prawoJazdy: null,
            loading: false
        }
    }

    componentDidMount() {
        scrollToTop();
        this.pobierzUzytkownika();
    }

    pobierzUzytkownika = () => {
        this.setState({loading: true});
        getUzytkownik(getNumer()).then((response) => {
            this.setState({prawoJazdy: (response.data[0].PRAW_C === '1')? 2 : 1, loading: false});
        }).catch((e) => {
            message.error('Error');
            this.setState({loading: false});
        })
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
                message.success('Hasło zostało zmienione');
                //this.props.history.push('/')
            } else {
                console.log('error')
            }
        }).catch(error => {
            message.error('Zmiana hasla blad');
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
                message.error('Złe stare hasło!');
            });
        }
        else
        {
            message.warn('Popraw nowe hasła!');
        }
    }

    onChange = (e: RadioChangeEvent) => {
        // console.log('radio checked', e.target.value);
        this.setState({prawoJazdy: e.target.value})

        // console.log(getSesja())
        let ses = getSesja();

        if(e.target.value === 1){
            zmienPrawo(getNumer(), true, false).then((response) => {
                message.success('Zmiana zapisana');
                ses.c = '0';
                sessionStorage.setItem('sesjaUzytkownikaSystemuOSP', JSON.stringify(ses));
            }).catch((e) => {
                message.error('Error');
            })
        } else {
            zmienPrawo(getNumer(), true, true).then((response) => {
                message.success('Zmiana zapisana');
                ses.c = '1';
                sessionStorage.setItem('sesjaUzytkownikaSystemuOSP', JSON.stringify(ses));
            }).catch((e) => {
                message.error('Error');
            })
        }
    };

    render() {
        let {stareHaslo, noweHaslo, repNoweHaslo, prawoJazdy, loading} = this.state;

        return(
            <Content>
                <div className={'ustawieniaPage'}>
                <h2 style={{textAlign: 'center'}}>Ustawienia</h2>

                <h5>Prawo jazdy</h5>
                <Row style={{paddingBottom: '15px'}}>
                    <Col>
                        {loading? <Spin/> :
                            <Radio.Group onChange={this.onChange} value={prawoJazdy}>
                                <Radio value={1}>B</Radio>
                                <Radio value={2}>B + C</Radio>
                            </Radio.Group>
                        }
                    </Col>
                </Row>

                <Row>

                    <h5>Zmiana hasła</h5>

                    <Col md={12}>
                        <label>Stare hasło:</label>
                        <input
                            className={"inpUstawienia form-control"}
                            //placeholder={'Podaj temat...'}
                            // required
                            type={"password"}
                            value={stareHaslo}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeStareHaslo(e.target.value)}
                        />
                    </Col>

                    <Col md={12}>
                            <label>Nowe Hasło:</label>
                            <input
                                className={"inpUstawienia form-control"}
                                //placeholder={'Podaj temat...'}
                                // required
                                type={"password"}
                                value={noweHaslo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeNoweHaslo(e.target.value)}
                            />
                    </Col>

                    <Col md={12}>
                            <label>Powtórz nowe hasło:</label>
                            <input
                                className={"inpUstawienia form-control"}
                                //placeholder={'Podaj temat...'}
                                // required
                                type={"password"}
                                value={repNoweHaslo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeRepNoweHaslo(e.target.value)}
                            />
                    </Col>

                    <Col md={12}>
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
