import { ReactSVG } from "react-svg";

export default function OptionButton ({option, optionState, filterState, ...props}) {
    const state = optionState[0];
    const setState = optionState[1];
    
    const handlerClick = () => {
        const listOptions = state.filter(item => item !== option);
        setState(listOptions);
        if (Object.keys(option)[0].toLowerCase() === 'price') {
            filterState[1](previosState => ({
                ...previosState,
                price: {
                    from: '',
                    to: ''
                }
            }))
        } else {
            filterState[1](previosState => ({
                ...previosState,
                [Object.keys(option)[0].toLowerCase()]: ''
            }))
        }
        
    }

    return (
        <div className="option-item">
            <span>{`${Object.keys(option)}: ${Object.values(option)}`}</span>
            <button onClick={handlerClick}>
                <ReactSVG src={require('../image/Close-filter-item-icon.svg').default} />
            </button>
        </div>
    )
}