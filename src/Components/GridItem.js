import { ReactSVG } from "react-svg";

export default function GridItem({config}) {

  return (
    <div className="grid__item">
        <img className="grid__item-img" src={require(`../image/${config.image}`)} alt='img' />
        <p className="grid__item-name">{config.name}</p>
        <div className="grid__item-rating">
          <div className="rating-stars">
            {
              Array(...Array(Math.floor(Number(config.purchase.rating)))).map((e, i) => 
                <ReactSVG src={require('../image/Star-icon.svg').default} key={i} />)
            }
          </div>
          <div className="rating-amount">({config.purchase.amount})</div>
        </div>
        <div className="grid__item-price">
          <p>{config.price}$</p>
          {
            config.status[0] === 'Sale'
              ? <div>
                  {`-${config.status[1]}%`}
                </div>
              : <div className="new">
                  {config.status[0] === 'New arrival' ? ' New' : config.status[0]}
                </div>
          }
        </div>
      </div>
  )
}