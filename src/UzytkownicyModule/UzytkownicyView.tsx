import * as React from 'react'
import Content from "../globalComponent/Content";
import {delUser, dodajUzytkownika, getUzytkownicy, isEmpty, scrollToTop} from "../Serwis";
import {Button, message, Modal, Table} from "antd";
import './../styles/uzytkownicy.css';
import {UserAddOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {ButtonToolbar} from "react-bootstrap";

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

    onDodaj = () => {
        let {imie, nazwisko, numer} = this.state;
        let ok = true;

        if(isEmpty(imie) || isEmpty(nazwisko) || isEmpty(numer)){
            ok = false;
            message.warn('Uzupełnij pola!');
        }

        if(ok) {
            dodajUzytkownika(imie, nazwisko, numer).then((response) => {
                message.success("Dodano użytkownika");
                this.pobierzUzytkownikow();
            }).catch((e) => {
                message.error('Error');
            })
            this.onCancelModal();
        }

    }

    onDelete = (nr: any) => {

        if (window.confirm('Czy na pewno usunąć użytkownika?')){
            delUser(nr).then((response) => {
                message.success('Usunięto użytkownika');
                this.pobierzUzytkownikow();
            }).catch((e) => {
                message.error('Error');
            })
        } else {

        }

    }

    onEdit = (nr: any) => {
        alert('W budowie...');
    }

    renderYesOrNo = (cell: any, row: any) => {
        if(cell === '1'){
            return <span className={'warTak'}>tak</span>
        } else {
            return <span className={'warNie'}>nie</span>
        }
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
                render: this.renderYesOrNo,
            },
            {
                title: 'Prawko C',
                dataIndex: 'PRAW_C',
                key: 'prawC',
                render: this.renderYesOrNo,
            },
            {
                title: 'Akcje',
                dataIndex: 'NUMER',
                key: 'akcja',
                width: '150px',
                render: (nr: any) => <ButtonToolbar className={'TableButtons'}>
                    <Button onClick={() => this.onEdit(nr)}
                            title={'Kliknij aby edytować użytkownika'}
                            className={'edit'}
                    >
                        <EditOutlined />
                    </Button>
                    <Button onClick={() => this.onDelete(nr)}
                            title={'Kliknij aby usunąć użytkownika'}
                            className={'delete'}
                    >
                        <DeleteOutlined />
                    </Button>
                </ButtonToolbar>,
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
                    onOk={this.onDodaj}
                    okText="Dodaj"
                    cancelText={'Anuluj'}
                    onCancel={this.onCancelModal}
                >
                    <div className="dodajModal">
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
