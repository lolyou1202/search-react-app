import { ReactSVG } from "react-svg";
//компонент кнопки вызова модального окна фильтрации или сортировки
export default function FilterButton (props) {
    //функция изменения стейта модального окна true/false
    const trueStateModal = (setState) => {
        setState(true)
    }
    //вызов функции
    const handleStateModal = function (e) {
        trueStateModal(props.stateModal)
    }

    return (
        <button 
            className={`filter__button ${props.mode}` + (props.state && props.state.length > 0 ? ` filtered` : '')}
            onClick={handleStateModal}
        >
            <ReactSVG 
                className="filter-icon"
                src={require(`../image/${props.image}`)}
            />
            <span>
                {props.content}
                {props.state && props.state.length > 0 ? ` (${props.state.length})` : ''}
            </span>
        </button>
    )
}