export default function FilterSubmitButton (props) {
    const filterState = props.filterState[0];
    const setFilterState = props.filterState[1];
    const setOptionState = props.optionState;

    const handlerChange = (e) => {
        if (props.mode === 'Reset') {
            setFilterState({
                price: {
                    from: '',
                    to: ''
                },
                size: [],
                type: [],
                color: []
            })
        } else {
            let price, size, type, color;
            if (filterState.price.from || filterState.price.to) {
                price = {
                    'Price': 
                    (filterState.price.from ? `${filterState.price.from}` : '0') + 
                    ' - ' + 
                    (filterState.price.to ? `${filterState.price.to}` : '0')
                }
            }
            if (filterState.size.length !== 0) {
                size = {
                    'Size': filterState.size
                }
            }
            if (filterState.type.length !== 0) {
                type = {
                    'Type': filterState.type
                }
            }
            if (filterState.color.length !== 0) {
                color = {
                    'Color': filterState.color
                }
            }
            const asd = [price, size, type, color].filter(item => item)
            if (props.setStateFiterModal) {
                props.setStateFiterModal(false)
            }
            setOptionState(asd)
        }
    }

    return (
        <button 
            className={"modal__filter-button" + 
                (props.mode === 'Reset' ? ' reset' : ' apply')
            }
            disabled={
                props.mode === 'Apply' &&
                filterState.price.from === '' && 
                filterState.price.to === '' &&
                filterState.size === '' &&
                filterState.type === '' &&
                filterState.color === '' ? true : false
            }
            onClick={handlerChange}
        >
            {props.mode}
        </button>
    )
}