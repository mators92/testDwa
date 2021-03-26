import * as React from 'react'
import Content from "../globalComponent/Content";
import Box from "../globalComponent/Box";

export default class HomeView extends React.Component {

    render() {
        return(
            <Content>
                <Box>
                    <h2>Czysty template TOP</h2>
                    <p>Informacje:</p>
                    <p>Dodawanie podstron znajduje się w pliku app_routes.ts. To jest przykładowy Box.</p>
                    <p>Style stałych elementów znajdują się w pliku App.scss.</p>
                    <h3>Zmień rozmiar okna aby zobaczyć efekt.</h3>
                </Box>
                <Box title={'Przykładowy tekst'}>
                    <img src={'https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg'}/>
                    {/*style={{maxWidth: '500px'}}*/}
                </Box>
            </Content>
        )
    }
}
