import * as React from 'react'

interface Props {
    title?: string
}

export default class Box extends React.Component<Props> {

    render() {
        return(
            <div className={this.props.title? 'boxZtitle':'box'}>
                {this.props.title &&
                    <div id={"boxTitle"}>
                        <h5>{this.props.title}</h5>
                    </div>
                }
                <div id={'boxBody'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
