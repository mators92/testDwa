import React, {Component} from 'react';
import {Button, ButtonToolbar, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Select from "react-select";
import {getNumer} from "../Serwis";
// import Req from "../../../../sharedComponents/formComponents/Req";
// import Datepicker from "../../../../sharedComponents/formComponents/Datepicker";
// import {
//     displayNotificationError,
//     displayNotificationInfo, displayNotificationSuccess, displayNotificationWarning
// } from "../../../../utilities/notifications/NotificationsManager";

interface Props{
    dyspozycja?:any,
    handleClickAnuluj : () => void;
    handleClickWyslij : (data: any) => void
}

interface State{
    tresc: string,
    kontrahentWarunek: string,
    waznyOd: any,
    waznyDo: any,
    czyPonownie: boolean,
    dlaB2B: boolean,
    czyNaEmail: boolean,
    czyMob: boolean,
    kontrahenci: any,
    showPopup: boolean,
    pageableObject: any,
    size: number,
    page: number,
    bezterminowo: boolean,
    plik: any,
    opis: string
}

class DodajDyspozycyjnoscV2 extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tresc: '',
            kontrahentWarunek: '',
            waznyOd: new Date().toJSON().substr(0,10),
            waznyDo: null,
            czyPonownie: false,
            dlaB2B: false,
            czyNaEmail: false,
            czyMob: false,
            kontrahenci: [],
            showPopup: false,
            pageableObject: {
                currentPage: 0,
                currentSize: 0,
                totalElements: 0
            },
            size: 20,
            page: 0,
            bezterminowo: true,
            plik: null,
            opis: ''
        }
    }

    componentDidMount() {
        // displayNotificationInfo('Formularz statycznyy','Nie jest obsłużony')
        let {dyspozycja} = this.props;

        if(dyspozycja){
            // this.setState({
            //     tresc: baner.komunikat,
            //     kontrahentWarunek: baner.kontrahent,
            //     waznyOd: baner.waznyOd,
            //     waznyDo: baner.waznosc,
            //     czyPonownie: baner.niePokazuj,
            //     dlaB2B: baner.czyKomunikatB2b,
            //     czyNaEmail: baner.czyEmail,
            //     czyMob: baner.czyMob
            // })
        }
    }

    onChangeTresc = (e: any) => {
        this.setState({tresc: e.target.value});
    }

    onChangeKontrahent = (e: any) => {
        this.setState({kontrahentWarunek: e.target.value});
    }

    onChangeDateOd = (e: any) => {
        let {waznyDo} = this.state;

        if(e > waznyDo){
            this.setState({waznyDo: null});
        }

        this.setState({waznyOd: e});
    }

    onChangeDate = (e: any) => {
        let {waznyOd} = this.state;
        this.setState({waznyDo: (e === '' || e < waznyOd)? null : e});
    }

    onClickWyslij = (dzien: any, noc: any) => {
        let data = {
            numer: getNumer(),
            data: this.props.dyspozycja,
            dzien: dzien,
            noc: noc
        }

        this.props.handleClickWyslij(data)
        // AdminService.addKomunikat(data).then((response) => {
        //     this.setState({showPopup: false, kontrahenci: []});
        //     displayNotificationSuccess('Pomyślnie wysłano komunikat', '');
        // }).catch((e) => {
        //     displayNotificationError('Wystąpił błąd podczas próby wysłania komunikatu', '')
        // })
    }

    onClickSprawdz = (page = this.state.page, size = this.state.size) => {


    }

    onChangeSizeInTable = (size: number) => {
        this.setState({
            size
        }, () => this.onClickSprawdz())
    };

    onChangePageInTable = (page: number, size: number) => {
        this.setState({
            page: page - 1,
            size: size
        }, () => this.onClickSprawdz())
    };

    columns = [{
        dataField: 'nazwa',
        text: 'Nazwa'
    }, {
        dataField: 'adres1',
        text: 'Adres',
        formatter: (cell: any, row: any) => (
            cell + ' ' + row.adres2
        )
    }];

    onDrop(files: any) {

    }

    onChangeInput = (key: string, value: any) => {
        // let {klientModel}: any = this.state;
        // klientModel[key] = value;
        // this.setState({klientModel});
    };

    render() {
        let {dyspozycja} = this.props;

        return (
            <div id={'AdminKomunikatyForm'}>
                <Form>
                    <Row>
                        <Col>
                            <p>Wybierz w jakich godzinach jesteś dyspozycyjny w dniu <b>{dyspozycja}</b></p>
                            {/*<p>Czy jesteś dyspozycyjny w dniu <b>{dyspozycja}</b> w godzinach <b>06:00 - 18:00</b> oraz czy czas dojazdu do remizy to max <b>10min</b>?</p>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className={'btnCzasWybor'}>
                                {/*<ButtonToolbar>*/}
                                    <Button variant={'warning'} size={'sm'}
                                        onClick={()=>{this.onClickWyslij('1', '0')}}
                                    >
                                        <>6:00 - 18:00 (dzień)</>
                                        {/*<><i className="fa fa-floppy-o" /> 06:00 - 18:00</>*/}
                                    </Button>
                                    <Button variant={'primary'} size={'sm'}
                                            onClick={()=>{this.onClickWyslij('0', '1')}}
                                    >
                                        <>18:00 - 6:00 (noc)</>
                                    </Button>
                                    <Button variant={'success'} size={'sm'}
                                            onClick={()=>{this.onClickWyslij('1', '1')}}
                                    >
                                        <>6:00 - 6:00 (24h)</>
                                    </Button>
                                {/*</ButtonToolbar>*/}
                            </div>
                        </Col>
                    </Row>

                </Form>


            </div>
        );
    }
}

export default DodajDyspozycyjnoscV2;