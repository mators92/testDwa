import * as React from 'react'
import Content from "../globalComponent/Content";
import {getUzytkownicy, scrollToTop} from "../Serwis";
import {message, Table} from "antd";
import './../styles/uzytkownicy.css';

interface Props{

}

interface State{
    uzytkownicy: any
}

export default class UzytkownicyView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            uzytkownicy: null
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

    render() {
        let {uzytkownicy} = this.state;

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
                title: 'PrawoJazdy C',
                dataIndex: 'PRAW_C',
                key: 'praw',
                // render: (text) => <a>{text}</a>,
            }
        ]

        return(
            <Content>
                <div className={'uzytkownicyModule'}>
                    <Table columns={columns} dataSource={uzytkownicy}/>
                </div>
            </Content>
        )
    }
}
