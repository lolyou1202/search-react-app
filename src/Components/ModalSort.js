import { ReactSVG } from "react-svg";
//компонент headerа у модальных окон
export function ModalHeader (props) {
    //функция закрытия модального окна при нажатии на крест
    const falseStateModal = (setState) => {
        setState(false)
    }
    //вызов функции
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
//компонент элемента сортировки в модальном окне сортировки
export function ModalSortItem ({setStateSortModal, atribute, ...props}) {
    const state = props.activity[0]
    const setState = props.activity[1]
    //изменение стейта сортировки при нажатии
    const handlerChange = () => {
        if (atribute !== state) {
            setState(atribute);
        }
        setStateSortModal(false)
    }

    return (
        <div 
            className={'modal__sorting-item' +
                (atribute === state ? ' active' : '')}
            onClick={handlerChange}
        >
            <p>{atribute}</p>
            <ReactSVG src={require('../image/choosed.svg').default} />
        </div>
    )
}