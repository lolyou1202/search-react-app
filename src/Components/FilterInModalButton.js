//компонент кнопки выбора разной фильтрации в модальном окне
export default function FilterInModalButton (props) {
    const state = props.activity[0];
    const setState = props.activity[1];
    //функция изменения состояния фильтрации по какому то из атрибутов
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
            if (state[props.mode].includes(props.text)) {
                setState(prev => ({
                    ...prev,
                    [props.mode]: [...prev[props.mode]].filter(item => item !== props.text)
                }))
            } else {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: [...previosState[props.mode], props.text]
                }))
            }
        }
        if (props.mode === 'color') {
            if (state[props.mode].includes(props.className)) {
                setState(prev => ({
                    ...prev,
                    [props.mode]: [...prev[props.mode]].filter(item => item !== props.className)
                }))
            } else {
                setState(previosState => ({
                    ...previosState,
                    [props.mode]: [...previosState[props.mode], props.className]
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
                (((props.mode === 'size' || props.mode === 'type') && (state[props.mode].includes(props.text))) ? ' active' : '') + 
                ((props.mode === 'color' && state[props.mode].includes(props.className)) ? ' active' : '')
            }
            onClick={handlerClick}
        >
            {props.text}
        </button>
    )
}