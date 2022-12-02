import * as React from 'react'
import Content from "../globalComponent/Content";
import {scrollToTop} from "../Serwis";

export default class InfoView extends React.Component {

    componentDidMount() {
        scrollToTop();
    }

    render() {
        return(
            <Content>
                <h2 style={{textAlign: 'center'}}>Informacje</h2>
                <h4 style={{textAlign: 'center'}}>Strażak który wpisał się na dany dzień, deklaruje dostępność w godzinach <br/><br/>06:00 - 18:00<br/><br/></h4>
                <p>Dodanie dyspozycyjności na dany dzień <b>gwarantuje</b> miejsce w aucie podczas alarmu w godzinach 06:00 - 18:00.</p>
                <p>Na dany dzień mogą zapisać się maksymalnie 4 osoby (skład podstawowy) w tym przynajmniej jeden kierowca C.</p>
                <p>Zgłoszenie dyspozycyjności na dany dzień przez 4 osoby nie oznacza, że inni nie mogą stawić się na alarm. Oznacza to tylko tyle że te cztery osoby mają pierwszeństwo wyjazdu.</p>
                <h3>Instrukcja</h3>
                <p>Aby dodać dyspozycyjność należy kliknąć na dany dzień w kalendarzu i potwierdzić wybór dnia.</p>
                <p>Na urządzeniach mobilnych należy przytrzymać dany dzień.</p>
            </Content>
        )
    }
}
