export default function FilterPriceButton (props) {
    const state = props.activity[0];
    const setState = props.activity[1];

    const handlerClick = () => {
        if (props.mode === 'price') {
            if (state.price.from === props.from && state.price.to === props.to) {
                setState(previosState => ({
                    ...previosState,
                    price: {
                        from: '',
                        to: ''
                    }
                }))
            } else {
                setState(previosState => ({
                    ...previosState,
                    price: {
                        from: props.from,
                        to: props.to
                    }
                }))
            }
        }
        if (props.mode === 'size' || props.mode === 'type') {
            if (state[props.mode] === props.text) {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: ''
                }))
            } else {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: props.text
                }))
            }
        }
        if (props.mode === 'color') {
            if (state[props.mode] === props.className) {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: ''
                }))
            } else {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: props.className
                }))
            }
        }
    }
    
    return (
        <button 
            className={
                (props.className ? ` ${props.className}` : 'button-default') + 
                (props.size ? ` ${props.size}` : '') + 
                ((props.mode === 'price' && (state.price.from === props.from && state.price.to === props.to)) ? ' active' : '') + 
                (((props.mode === 'size' || props.mode === 'type') && (state[props.mode] === props.text)) ? ' active' : '') + 
                ((props.mode === 'color' && state[props.mode] === props.className) ? ' active' : '')
            }
            onClick={handlerClick}
        >
            {props.text}
        </button>
    )
}