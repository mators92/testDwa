import React, {Children, useCallback} from 'react';
import Content from "../globalComponent/Content";
import Box from "../globalComponent/Box";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import './../styles/kalendarz.scss';
// import "bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "moment/locale/pl";
import PopupWrapper from "../globalComponent/PopupWrapper";
import DodajDyspozycyjnosc from "./DodajDyspozycyjnosc";
import {
    czyMamC,
    delEvent,
    dodajDyspozycyjnosc,
    dodajDyspozycyjnoscV2,
    getKalendarz,
    getNumer,
    scrollToTop
} from "../Serwis";
import {Modal, message, Alert, Row} from "antd";
import "antd/dist/antd.css";
import DodajDyspozycyjnoscV2 from "./DodajDyspozycyjnoscV2";
// import {Children} from "react";

interface Props {
    // match: any
}

interface State {
    events: any,
    stepValue: number,
    timeslotsValue: number,
    scrollDate: any,
    today: any,
    allowToSelect: boolean,
    loader: boolean,
    showFormularz: boolean,
    showFormularzV2: boolean,
    dyspozycja: any,
    dyspozycjaId: any,
    view: any,
    showModalUsun: boolean
}

export default class HomeView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            events: [],
            stepValue: 15,
            timeslotsValue: 2,
            scrollDate: moment().format("YYYY-MM-DD"),
            today: new Date(Date.now()),
            allowToSelect: true,
            loader: false,
            showFormularz: false,
            showFormularzV2: false,
            dyspozycja: null,
            dyspozycjaId: null,
            view: 'month',
            showModalUsun: false
        }
    }

    componentDidMount() {
        scrollToTop();
        this.pobierzEventy();
    }

    pobierzEventy = () => {
        getKalendarz().then((response) => {
            this.setState({events: this.przeksztalcResponseDoKalendarza(response.data)});
        }).catch((e) => {
            console.log('error')
        })
    }

    formatTitle = (item: any) => {
        if(moment(item.data_gotowosci).isAfter(moment('2023-06-21')) && moment(item.data_gotowosci).isBefore(moment('2023-06-29'))){
            if(item.dzien === '1' && item.noc === '1'){
                return (<>24h {item.IMIE} {item.NAZWISKO} 24h</>)
                // return (<>24h {item.IMIE} {item.NAZWISKO} <span className={'float-right'} style={{display: 'inline-block'}}>24h</span></>)
                // return <i className={'fa fa-moon-o'}/><i className={'fa fa-star'}/> + '24h ' + item.IMIE + ' ' + item.NAZWISKO
            } else if(item.dzien === '1' && item.noc === '0'){
                return (<><i className={'fa fa-sun-o'}/> {item.IMIE} {item.NAZWISKO} 6-18</>)
                // return (<><i className={'fa fa-sun-o'}/> {item.IMIE} {item.NAZWISKO} <span className={'float-right'} style={{display: 'inline-block'}}>6-18</span></>)
                {/*return <><i className={'fa fa-moon-o'}/> + '6-18 ' + item.IMIE + ' ' + item.NAZWISKO<>*/}
            } else if(item.dzien === '0' && item.noc === '1'){
                // return (<><i className={'fa fa-moon-o'}/> {item.IMIE} {item.NAZWISKO} <span className={'float-right'} style={{display: 'inline-block'}}>18-6</span></>)
                return (<><i className={'fa fa-moon-o'}/> {item.IMIE} {item.NAZWISKO} 18-6</>)
                // return '18-6 ' + item.IMIE + ' ' + item.NAZWISKO
            } else {
                return item.IMIE + ' ' + item.NAZWISKO
            }
        } else {
            return item.IMIE + ' ' + item.NAZWISKO
        }

    }

    przeksztalcResponseDoKalendarza = (response: any) => {
        // kopiowanie tablicy ze zmienionymi polami by pasowały do kalendarza
        let arr = Array.from(response, (item: any) => {

            return {
                id: item.ID,
                numer: item.numer,
                title: this.formatTitle(item),
                desc: 'description',
                start: new Date(item.data_gotowosci),
                end: new Date(item.data_gotowosci),
                allDay: true,
                c: item.PRAW_C,
                dzien: item.dzien,
                noc: item.noc
            }
        });

        console.log(arr)

        return arr
    }

    changeNavigate = (e: any) => {
        this.setState({scrollDate: moment(e).format("YYYY-MM-DD")});
    }

    handleSelectEvent = (event: any) => {
        scrollToTop();
        this.setState({scrollDate: moment(event.start).format("YYYY-MM-DD")});
        this.onChangeView('day')
        // this.setState({showModalDost: true})
    }

    formatDateFromObject = (obj: any) => {
        let day = obj.getDate();
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        let month = obj.getMonth() + 1;
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        let year = obj.getFullYear();

        // return (year + "." + month + "." + day)
        return (year + "-" + month + "-" + day)
    }

    czyJuzZapisanyNaTenDzien = (slot: any) => {
        let eve = this.state.events;
        let czyJest = false;

        let eventsPerDey = eve.filter((e: any) => moment(e.start).format("YYYY-MM-DD") === this.formatDateFromObject(slot.start))

        console.log(eventsPerDey)
        eventsPerDey.forEach((e: any) => {
            if(e.numer === getNumer())
                czyJest = e.id
        })

        return czyJest
    }

    czySkladNaDzien = (data: any) => {
        let eve = this.state.events;
        let zielony = false;

        if(moment(data).isAfter(moment('2023-06-21')) && moment(data).isBefore(moment('2023-06-29'))){
            let eventsPerDeyDzien = eve.filter((e: any) => (moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD")) && e.dzien === '1');
            let eventsPerDeyNoc = eve.filter((e: any) => (moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD")) && e.noc === '1');

            // console.log(moment(data).format("YYYY-MM-DD"), eventsPerDeyDzien.length, eventsPerDeyNoc.length)

            zielony = ((eventsPerDeyDzien.length >= 6) && (eventsPerDeyNoc.length >= 6));
        } else {
            let eventsPerDey = eve.filter((e: any) => moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD"));

            zielony = (eventsPerDey.length === 4)
        }


        return zielony
    }

    czySkladNaDzienV2 = (data: any) => {
        let eve = this.state.events;

        let eventsPerDeyDzien = eve.filter((e: any) => (moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD")) && e.dzien === '1');
        let eventsPerDeyNoc = eve.filter((e: any) => (moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD")) && e.noc === '1');

        return ((eventsPerDeyDzien.length >= 6) && (eventsPerDeyNoc.length >= 6))
    }

    czyJestNaC = (data: any) => {
        let eve = this.state.events;
        let czyJest = false;

        let eventsPerDey = eve.filter((e: any) => moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD"));

        let c = eventsPerDey.filter((e: any) => e.c === '1');
        if(c.length >= 1){
            czyJest = true;
        }

        return czyJest
    }

    ileOsob = (data: any) => {
        let eve = this.state.events;

        let eventsPerDey = eve.filter((e: any) => moment(e.start).format("YYYY-MM-DD") === moment(data).format("YYYY-MM-DD"));

        return eventsPerDey.length
    }

    handleSelectSlot = (slot: any) => {
        // console.log(slot)

        if(moment(slot.start).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD")){
            let id = this.czyJuzZapisanyNaTenDzien(slot)

            if(id) {
                message.info('Już jesteś dyspozycyjny w tym dniu');

                if(moment(slot.start).format("YYYY-MM-DD") >= moment().add(1, 'day').format("YYYY-MM-DD")){
                    this.setState({dyspozycja: this.formatDateFromObject(slot.start), dyspozycjaId: id, showModalUsun: true});
                }

            } else {

                if(moment(slot.start).isAfter(moment('2023-06-21')) && moment(slot.start).isBefore(moment('2023-06-29'))){
                    // dyspozycja ekstra w dniach 2023-06-22 - 2023-06-28
                    this.setState({dyspozycja: this.formatDateFromObject(slot.start), showFormularzV2: true});
                } else {
                    // po staremu
                    if(this.czySkladNaDzien(slot.start)){
                        message.info('Już jest skład podstawowy na ten dzień');
                    } else {
                        if(this.ileOsob(slot.start) === 3){
                            if(this.czyJestNaC(slot.start) || czyMamC()){
                                this.setState({dyspozycja: this.formatDateFromObject(slot.start), showFormularz: true});
                            } else {
                                message.warning('Potrzebna osoba z kat C');
                            }
                        } else {
                            this.setState({dyspozycja: this.formatDateFromObject(slot.start), showFormularz: true});
                        }
                    }
                }
            }

        } else {
            message.warn('Stara data! Wybierz inną datę.');
        }

    }

    onClickZapisz = (data: any) => {
        dodajDyspozycyjnosc(data.numer, data.kiedy).then((response) => {
            this.setState({showFormularz: false});
            this.pobierzEventy();
            message.success('Dodano dyspozycyjność');
        }).catch((e) => {
            //console.log('ok')
            this.setState({showFormularz: false});
            message.error(e.response.data);
        })
    }

    onClickZapiszV2 = (data: any) => {
        dodajDyspozycyjnoscV2(data).then((response) => {
            this.setState({showFormularzV2: false});
            this.pobierzEventy();
            message.success('Dodano dyspozycyjność');
        }).catch((e) => {
            //console.log('ok')
            this.pobierzEventy();
            this.setState({showFormularzV2: false});
            message.error(e.response.data);
        })
    }

    onChangeView = (newView: any) => {
        this.setState({view: newView});
    }

    eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
        // console.log(event);
        var backgroundColor = '';
        // var color = '';
        // var border = '';

        if(event.c === '1'){
            backgroundColor = '#5e5e5e'
        }

        if(event.numer === getNumer()){
            backgroundColor = '#d97b02'
        }

        // if(moment().format("YYYY-MM-DD") <= moment(event.start).format("YYYY-MM-DD")){
        //     if(event.c === '1'){
        //         backgroundColor = '#5e5e5e'
        //     }
        //
        //     if(event.id === getNumer()){
        //         backgroundColor = '#d97b02'
        //     }
        // } else {
        //     backgroundColor = 'rgba(171,171,171,0.45)'
        //     color = '#888888'
        //     border = '1px solid #888888'
        // }

        var style = {
            backgroundColor: backgroundColor,
            // color: color,
            // border: border
            // borderRadius: '0px',
            // opacity: 0.8,
            // color: 'black',
            // border: '0px',
            // display: 'block'
        };

        return {style: style};
    }

    usunDyspozycje = () => {
        let id = this.state.dyspozycjaId;

        delEvent(id).then((response) => {
            this.pobierzEventy();
            message.success('Usunięto dyspozycyjność');
            this.setState({showModalUsun: false, dyspozycjaId: null, dyspozycja: null});
        }).catch((e) => {
            //console.log('ok')
            this.setState({showModalUsun: false});
            message.error(e.response.data);
        })
    }

    render() {

        let {allowToSelect, events, scrollDate, stepValue, timeslotsValue, today, showFormularz, dyspozycja, view, showModalUsun, showFormularzV2} = this.state;
        const localizer = momentLocalizer(moment);

        const translation = {
            date: 'Data',
            time: 'Czas',
            event: 'Wydarzenie',
            allDay: 'Cały dzień',
            week: 'tydzień',
            work_week: 'tydzień roboczy',
            day: 'dzień',
            month: 'miesiąc',
            previous: 'poprzedni',
            next: 'następny',
            yesterday: 'wczoraj',
            tomorrow: 'jutro',
            today: 'dziś',
            agenda: 'lista',
        };

        const EventWrapperComponent = ({ children, value }: any) => {
            // console.log(value)
        return React.cloneElement(Children.only(children), {
                style: {
                    ...children.style,
                    background: (moment().format("YYYY-MM-DD") <= moment(value).format("YYYY-MM-DD")) ?
                        (moment().format("YYYY-MM-DD") === moment(value).format("YYYY-MM-DD")) ?
                            this.czySkladNaDzien(value) ? 'linear-gradient(45deg, rgba(144,238,144,1) 36%, rgba(144,238,144,1) 60%, rgba(255,249,7,1) 100%)' : 'linear-gradient(45deg, rgba(255,59,59,1) 40%, rgba(255,59,59,1) 70%, rgba(255,249,7,1) 100%)'
                            :
                            this.czySkladNaDzien(value) ? 'lightgreen' : '#f5aaaa'
                        :
                        '',
                    // backgroundColor: this.czySkladNaDzien(value) ?
                    //     (moment().format("YYYY-MM-DD") <= moment(value).format("YYYY-MM-DD"))? 'lightgreen' : ''
                    //     :
                    //     (moment().format("YYYY-MM-DD") <= moment(value).format("YYYY-MM-DD"))? '#f5aaaa' : '',
                },
            }
        )};

        return(
            <Content>
                {/*<Box>*/}
                {/*    <h2>Czysty template TOP</h2>*/}
                {/*    <p>Informacje:</p>*/}
                {/*    <p>Dodawanie podstron znajduje się w pliku app_routes.ts. To jest przykładowy Box.</p>*/}
                {/*    <p>Style stałych elementów znajdują się w pliku App.scss.</p>*/}
                {/*    <h3>Zmień rozmiar okna aby zobaczyć efekt.</h3>*/}
                {/*</Box>*/}
                {/*<Box title={'Przykładowy tekst'}>*/}
                {/*    <img src={'https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg'}/>*/}
                {/*    /!*style={{maxWidth: '500px'}}*!/*/}
                {/*</Box>*/}

                <div className={'kalendarzModule'}>
                    {(!this.czySkladNaDzien(moment().format('YYYY-MM-DD'))) &&
                        <Alert message="Pełna mobilizacja! Brak podstawowego składu." type="error" className={'alertBrakSkladu'}/>
                    }
                <Calendar
                    style={{minHeight: '500px'}}
                    culture='pl'
                    messages={translation}
                    selectable={allowToSelect}
                    events={events}
                    view={view}
                    onView={this.onChangeView}
                    views={['month', 'week', 'day']}
                    // views={['month', 'week', 'day', 'agenda']}
                    step={stepValue}
                    timeslots={timeslotsValue}
                    date={scrollDate}
                    onNavigate={(e) => this.changeNavigate(e)}
                    popup

                    min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)}

                    onSelectEvent={event => this.handleSelectEvent(event)}
                    onSelectSlot={(slotInfo) => this.handleSelectSlot(slotInfo)}

                    components={{dateCellWrapper: EventWrapperComponent}}
                    eventPropGetter={this.eventStyleGetter}

                    // components={{
                    //     event: this.formatEvent,
                    //     week: {
                    //         event: this.formatUrlEvent
                    //     },
                    //     month: {
                    //         event: this.formatUrlEvent
                    //     },
                    //     agenda: {
                    //         event: this.formatAgendaEvent
                    //     }
                    // }}
                    localizer={localizer}/>

                    <div className={'legenda'}>
                        <div className={'kolor'}>
                            <div className={'kd kolorJ'}/>
                            <label>Ja</label>
                        </div>
                        <div className={'kolor'}>
                            <div className={'kd kolorR'}/>
                            <label>Ratownik</label>
                        </div>
                        <div className={'kolor'}>
                            <div className={'kd kolorC'}/>
                            <label>Kierowca C</label>
                        </div>
                    </div>

                    {
                        showFormularz &&
                        <PopupWrapper header={'Dodaj dyspozycyjność'}
                                      shouldNotCloseWithoutClick={true} withoutOverflowY={false}
                                      onClose={() => this.setState({showFormularz: false})}
                        >
                            <DodajDyspozycyjnosc handleClickAnuluj={() => this.setState({showFormularz: false})} handleClickWyslij={this.onClickZapisz} dyspozycja={dyspozycja}/>
                        </PopupWrapper>
                    }

                    {
                        showFormularzV2 &&
                        <PopupWrapper header={'Dodaj dyspozycyjność'}
                                      shouldNotCloseWithoutClick={true} withoutOverflowY={false}
                                      onClose={() => this.setState({showFormularzV2: false})}
                        >
                            <DodajDyspozycyjnoscV2 handleClickAnuluj={() => this.setState({showFormularzV2: false})} handleClickWyslij={this.onClickZapiszV2} dyspozycja={dyspozycja}/>
                        </PopupWrapper>
                    }

                    <Modal
                        // className="QRModal"
                        title="Usuń dyspozycje"
                        visible={showModalUsun}
                        onOk={this.usunDyspozycje}
                        okText="Usuń"
                        cancelText={'Anuluj'}
                        onCancel={() => this.setState({showModalUsun: false, dyspozycjaId: null, dyspozycja: null})}
                    >
                        Jesteś dyspozycyjny w tym dniu.<br/>
                        Czy chcesz usunąć dyspozycje z dnia {dyspozycja}?
                    </Modal>

                    {/*<Modal*/}
                    {/*    // className="QRModal"*/}
                    {/*    title="Zeskanuj kod aby pobrać aplikacje mobilną"*/}
                    {/*    visible={showModalDost}*/}
                    {/*    onOk={() => {*/}
                    {/*        this.setState({ showModalDost: false });*/}
                    {/*    }}*/}
                    {/*    okText="zamknij"*/}
                    {/*    onCancel={() => this.setState({ showModalDost: false })}*/}
                    {/*>*/}
                    {/*    <div className="QRcode">*/}

                    {/*    </div>*/}
                    {/*</Modal>*/}

                </div>
            </Content>
        )
    }
}
