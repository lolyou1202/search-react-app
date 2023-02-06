import { ReactSVG } from "react-svg";

export default function FilterButton (props) {

    const trueStateModal = (setState) => {
        setState(true)
    }
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