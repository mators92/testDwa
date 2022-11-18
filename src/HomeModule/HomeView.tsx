import * as React from 'react'
import Content from "../globalComponent/Content";
import Box from "../globalComponent/Box";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import './../styles/kalendarz.scss';
// import "bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "moment/locale/pl";

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
    loader: boolean
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
            loader: false
        }
    }

    changeNavigate = (e: any) => {
        // if((moment(this.state.scrollDate).format('MM') !== moment(e).format('MM')) && this.state.wybranaOsobaKalendarz !== null) {
        //     // this.setState({scrollDate: new Date(e)}, () =>
        //     this.setState({scrollDate: moment(e).format("YYYY-MM-DD")}, () =>
        //         // @ts-ignore
        //         getRaporty('', '', this.state.wybranaOsobaKalendarz.id, '', moment(this.state.scrollDate).startOf('month').format('YYYY-MM-DD'), moment(this.state.scrollDate).endOf('month').format('YYYY-MM-DD')).then((response) => {
        //             this.setState({events: this.przeksztalcResponseDoKalendarza(response.data), allowToSelect: false});
        //         }).catch((e) => {
        //             console.log('error');
        //         })
        //     );
        // } else {
        //     this.setState({scrollDate: moment(e).format("YYYY-MM-DD")});
        //     // this.setState({scrollDate: new Date(e)});
        // }
    }

    handleSelectEvent = (event: any) => {
        // scrollToTop();
        // this.setState({showEventForm: false}, () => {
        //     this.setState({eventObject: event, isItEditon: true, showEventForm: true}, () => {
        //         console.log(this.state.eventObject);
        //     });
        // });
    }

    handleSelectSlot = (slot: any) => {
        // let sloti = slot;
        // // sloti.end = sloti.start;
        // console.log(slot)
        // this.setState({eventObject: sloti, isItEditon: false});
        // this.showEventForm();
    }

    render() {

        let {allowToSelect, events, scrollDate, stepValue, timeslotsValue, today} = this.state;
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
                    views={['month', 'week', 'day', 'agenda']}
                    step={stepValue}
                    timeslots={timeslotsValue}
                    date={scrollDate}
                    onNavigate={(e) => this.changeNavigate(e)}

                    min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)}

                    onSelectEvent={event => this.handleSelectEvent(event)}
                    onSelectSlot={(slotInfo) => this.handleSelectSlot(slotInfo)}
                    // onSelectSlot={(slotInfo) => console.log(slotInfo)}

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
                </div>
            </Content>
        )
    }
}
