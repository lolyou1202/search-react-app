//компонент инпута для выбора диапазона цены в модальном окне фильтрации
export default function FilterRangePriceButton(props) {
    const state = props.activity[0];
    const setState = props.activity[1];
    //функция изменения цены в стейте фильтрации при изменении данных в инпут
    const handlerChange = (e) => {
        const value = e.target.value;
        if (props.from) {
            setState(previosState => ({
                ...previosState,
                price: {
                    ...previosState.price,
                    from: value
                }
            }))
        } else {
            setState(previosState => ({
                ...previosState,
                price: {
                    ...previosState.price,
                    to: value,
                }
            }))
        }
    }

    return (
        <div className="rangePrice-block">
            <label>{props.label}</label>
            <input 
                value={props.from ? state.price.from : state.price.to}
                onChange={handlerChange}
                type="text" 
                pattern = '[0-9]*\.?[0-9]*' 
                className="rangePrice-input" 
                placeholder={props.label === 'From' ? 'Minimum price' : 'Maximum price'}
            />
            <p>$</p>
            <hr />
        </div>
    )
}