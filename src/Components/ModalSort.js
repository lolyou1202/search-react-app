import { ReactSVG } from "react-svg";

export function ModalHeader (props) {

    const falseStateModal = (setState) => {
        setState(false)
    }
    const handleStateModal = function (e) {
        falseStateModal(props.stateModal)
    }
    
    return (
        <div className={`modal__${props.type}-header modal__header`}>
                <p>{props.text}</p>
                <ReactSVG
                    onClick={handleStateModal}
                    src={require('../image/Close-search-icon.svg').default}
                />
        </div>
    )
}

export function ModalSortItem ({setStateSortModal, ...props}) {
    
    const handlerChange = (e) => {
        if (props.atribute !== props.activity[0]) {
            props.activity[1](props.atribute);
        }
        setStateSortModal(false)
    }

    return (
        <div 
            className={'modal__sorting-item' +
                (props.atribute === props.activity[0] ? ' active' : '')}
            onClick={handlerChange}
        >
            <p>{props.atribute}</p>
            <ReactSVG src={require('../image/choosed.svg').default} />
        </div>
    )
}