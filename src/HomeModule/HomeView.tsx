import * as React from 'react'
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
import {dodajDyspozycyjnosc, getKalendarz, getNumer} from "../Serwis";
import {Children} from "react";

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
    dyspozycja: any
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
            dyspozycja: null
        }
    }

    componentDidMount() {
        this.pobierzEventy();
    }

    pobierzEventy = () => {
        getKalendarz().then((response) => {
            this.setState({events: this.przeksztalcResponseDoKalendarza(response.data)});
        }).catch((e) => {
            console.log('error')
        })
    }

    przeksztalcResponseDoKalendarza = (response: any) => {
        // kopiowanie tablicy ze zmienionymi polami by pasowały do kalendarza
        let arr = Array.from(response, (item: any) => {

            return {
                id: item.numer,
                title: item.IMIE + ' ' + item.NAZWISKO,
                desc: 'description',
                start: new Date(item.data_gotowosci),
                end: new Date(item.data_gotowosci),
                allDay: true,
            }
        });

        console.log(arr)

        return arr
    }

    changeNavigate = (e: any) => {
        this.setState({scrollDate: moment(e).format("YYYY-MM-DD")});
    }

    handleSelectEvent = (event: any) => {
        // scrollToTop();
        // this.setState({showEventForm: false}, () => {
        //     this.setState({eventObject: event, isItEditon: true, showEventForm: true}, () => {
        //         console.log(this.state.eventObject);
        //     });
        // });
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
            if(e.id === getNumer())
                czyJest = true
        })

        return czyJest
    }

    handleSelectSlot = (slot: any) => {
        // alert('ok')
        // let sloti = slot;
        // sloti.end = sloti.start;
        console.log(slot)

        if(this.czyJuzZapisanyNaTenDzien(slot)) {
            alert('Już jesteś dyspozycyjny w tym dniu')
        } else {
            this.setState({dyspozycja: this.formatDateFromObject(slot.start), showFormularz: true});
        }

        // this.setState({eventObject: sloti, isItEditon: false});
        // this.showEventForm();
    }

    onClickZapisz = (data: any) => {
        dodajDyspozycyjnosc(data.numer, data.kiedy).then((response) => {
            this.setState({showFormularz: false});
            this.pobierzEventy();
        }).catch((e) => {
            console.log('error');
        })
    }

    render() {

        let {allowToSelect, events, scrollDate, stepValue, timeslotsValue, today, showFormularz, dyspozycja} = this.state;
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
                <Calendar
                    style={{minHeight: '500px'}}
                    culture='pl'
                    messages={translation}
                    selectable={allowToSelect}
                    events={events}
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
                    // onSelectSlot={(slotInfo) => console.log(slotInfo)}

                    // components={{
                    //     dateCellWrapper: function noRefCheck(){}
                    // }}

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

                    {
                        showFormularz &&
                        <PopupWrapper header={'Dodaj dyspozycyjność'}
                                      shouldNotCloseWithoutClick={true} withoutOverflowY={false}
                                      onClose={() => this.setState({showFormularz: false})}
                        >
                            <DodajDyspozycyjnosc handleClickAnuluj={() => this.setState({showFormularz: false})} handleClickWyslij={this.onClickZapisz} dyspozycja={dyspozycja}/>
                        </PopupWrapper>
                    }
                </div>
            </Content>
        )
    }
}
