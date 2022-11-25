import * as React from 'react'
import Content from "../globalComponent/Content";
import {getUzytkownicy, scrollToTop} from "../Serwis";
import {Button, message, Modal, Table} from "antd";
import './../styles/uzytkownicy.css';
import {UserAddOutlined} from '@ant-design/icons';

interface Props{

}

interface State{
    uzytkownicy: any,
    showModalDodaj: boolean,
    imie: string,
    nazwisko: string,
    numer: string
}

export default class UzytkownicyView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            uzytkownicy: null,
            showModalDodaj: false,
            imie: '',
            nazwisko: '',
            numer: ''
        }
    }

    componentDidMount() {
        scrollToTop();
        this.pobierzUzytkownikow();
    }

    pobierzUzytkownikow = () => {
        getUzytkownicy().then((response) => {
            this.setState({uzytkownicy: response.data});
        }).catch((e) => {
            message.error('Błąd')
        })
    }

    onShowModalDodaj = () => {
        this.setState({showModalDodaj: true});
    }

    onChangeImie = (e: any) => {
        this.setState({imie: e});
    }

    onChangeNazwisko = (e: any) => {
        this.setState({nazwisko: e});
    }

    onChangeNumer = (e: any) => {
        this.setState({numer: e});
    }

    onCancelModal = () => {
        this.setState({ showModalDodaj: false, imie: '', nazwisko: '', numer: '' });
    }

    render() {
        let {uzytkownicy, showModalDodaj, imie, nazwisko, numer} = this.state;

        const columns = [
            {
                title: 'Imie',
                dataIndex: 'IMIE',
                key: 'imie',
                // render: (text) => <a>{text}</a>,
            },
            {
                title: 'Nazwisko',
                dataIndex: 'NAZWISKO',
                key: 'nazwisko',
                // render: (text) => <a>{text}</a>,
            },
            {
                title: 'Numer',
                dataIndex: 'NUMER',
                key: 'numer',
                // render: (text) => <a>{text}</a>,
            },
            {
                title: 'Prawko B',
                dataIndex: 'PRAW_B',
                key: 'prawB',
                // render: (text) => <a>{text}</a>,
            },
            {
                title: 'Prawko C',
                dataIndex: 'PRAW_C',
                key: 'prawC',
                // render: (text) => <a>{text}</a>,
            }
        ]

        return(
            <Content>
                <div className={'uzytkownicyModule'}>
                    <Button size={'middle'} type={'primary'} onClick={this.onShowModalDodaj}><UserAddOutlined /> Dodaj użytkownika</Button>
                    <Table columns={columns} dataSource={uzytkownicy}/>
                </div>

                <Modal
                    // className="QRModal"
                    title="Dodaj użytkownika"
                    visible={showModalDodaj}
                    onOk={() => {
                        this.setState({ showModalDodaj: false });
                    }}
                    okText="zamknij"
                    onCancel={this.onCancelModal}
                >
                    <div className="QRcode">
                        <label>Imię:</label>
                        <input
                            className={"inpUstawienia form-control"}
                            // placeholder={'Imię...'}
                            required
                            type={"text"}
                            value={imie}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeImie(e.target.value)}
                        />

                        <label>Nazwisko:</label>
                        <input
                            className={"inpUstawienia form-control"}
                            // placeholder={'Nazwisko...'}
                            required
                            type={"text"}
                            value={nazwisko}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeNazwisko(e.target.value)}
                        />

                        <label>Numer:</label>
                        <input
                            className={"inpUstawienia form-control"}
                            // placeholder={'Nazwisko...'}
                            required
                            type={"text"}
                            minLength={9}
                            maxLength={9}
                            value={numer}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeNumer(e.target.value)}
                        />
                    </div>
                </Modal>

            </Content>
        )
    }
}
