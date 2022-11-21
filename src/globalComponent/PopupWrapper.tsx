import React from 'react';
// import {IconTimes} from "../icons/FontAwesome";

interface Props {
    header: string,
    children: any,
    onClose: () => void;
    withoutOverflowY?: boolean;
    shouldNotCloseWithoutClick?: boolean;
    classname?: string;
    maleOkno?: boolean
}

class PopupWrapper extends React.Component<Props> {

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = (key: any) => {
        if (!this.props.shouldNotCloseWithoutClick)
            if (key.keyCode === 27) {
                // ESC key
                this.props.onClose()
            }
    };

    onClickOutsidePopup = ({target}: any) => {
        if (!this.props.shouldNotCloseWithoutClick)
            if (target.id === 'POPUP_WRAPPER' || target.id === 'popup-close-icon')
                this.props.onClose()
    };

    render() {
        let {header, children, withoutOverflowY, classname, maleOkno} = this.props;

        return (
            <div id={classname? classname : 'POPUP_WRAPPER'} onClick={this.onClickOutsidePopup}>
                <div className={'popup-element' + ((maleOkno)? ' male' : '')}>
                    <div id={'popup-header'}>
                        <h1>
                            {header}
                        </h1>
                        <div id={'popup-close-icon'} onClick={() => this.props.onClose()} title={'Kliknij, aby zamknąć'}>
                            <i className="fa fa-times" />
                        </div>
                    </div>
                    <div id={'popup-body'} style={{overflowY: withoutOverflowY ? 'visible' : 'auto'}}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupWrapper;