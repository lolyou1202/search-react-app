import { useState } from "react";
import { ReactSVG } from "react-svg";
import FilterButton from "./Components/FilterButtons";
import OptionItem from "./Components/OptionItem";
import useHorizontalScroll from "./Components/HorizontalScroll";
import { ModalHeader, ModalSortItem } from "./Components/ModalSort";
import FilterInModalButton from "./Components/FilterInModalButton";
import FilterRangePriceButton from "./Components/FilterRangePriceButton";
import FilterSubmitButton from "./Components/FilterSubmitButton";
import GridList from "./Components/GridList";

export default function App() {
  //референс на блок горизонтального скролла
  const scrollRef = useHorizontalScroll();
  //стейт модального окна фильтрации
  const [stateFiterModal, setStateFiterModal] = useState(false);
  //стейт модального окна сортировки
  const [stateSortModal, setStateSortModal] = useState(false);
  //стейт поиска по товарам
  const [searchState, setSearchState] = useState(['', '']);
  //стейт общий стейт сортировки по элементам 
  const [sortState, setSortState] = useState('Popular');
  //стейт общий стейт фильтрации по элементам 
  const [filterState, setFilterState] = useState({
    price: {
      from: '',
      to: ''
    },
    size: [],
    type: [],
    color: []
  });
  //стейт option карточек после фильтрации
  const [filterOptionState, setfilterOptionState] = useState([]);
  //стейт всех карточек из списка
  const [gridItems] = useState([
    {
      id: 1,
      name: 'Product name 1',
      image: '1-item-card.jpg',
      purchase: {
        rating: 3.2,
        amount: 33,
        buy: 321
      },
      price: 600,
      status: ['Sale', '20'],
      size: ['S', 'M'],
      color: ['white', 'blue']
    },
    {
      id: 2,
      name: 'Product name 2',
      image: '1-item-card.jpg',
      purchase: {
        rating: 5,
        amount: 22,
        buy: 90
      },
      price: 200,
      status: ['New arrival'],
      size: ['S', 'L'],
      color: ['blue']
    },
    {
      id: 3,
      name: 'Product name 2',
      image: '1-item-card.jpg',
      purchase: {
        rating: 5,
        amount: 22,
        buy: 1111
      },
      price: 2222,
      status: ['New arrival'],
      size: ['L', 'XL'],
      color: ['gray']
    },
    {
      id: 4,
      name: 'Product name 20',
      image: '1-item-card.jpg',
      purchase: {
        rating: 5,
        amount: 22,
        buy: 6
      },
      price: 300,
      status: ['Sale', '40'],
      size: ['S', 'L', 'XXL'],
      color: ['gray', 'white']
    },
    {
      id: 5,
      name: 'Product name 32',
      image: '1-item-card.jpg',
      purchase: {
        rating: 5,
        amount: 22,
        buy: 32
      },
      price: 120,
      status: ['New arrival'],
      size: ['S', 'L', 'XXL'],
      color: ['gray']
    },
    {
      id: 6,
      name: 'Product name 2',
      image: '1-item-card.jpg',
      purchase: {
        rating: 5,
        amount: 22,
        buy: 111
      },
      price: 50,
      status: ['New arrival'],
      size: ['XXL'],
      color: ['blue']
    },
  ]);
  //console.log(filterOptionState)
  return (
    <div className="app">
      <h1 className="app__label">Search</h1>
      {/*Блок поиска по товарам*/}
      <div className="input__block">
        <input
          type='text'
          placeholder="Search product"
          value={searchState[0]}
          onChange={e => setSearchState(prev => [e.target.value, [...prev][1]])}
        />
        <ReactSVG 
          onClick={() => setSearchState(prev => [[...prev][0], prev[0]])} 
          className="search-icon" src={require('./image/Search-icon.svg').default} 
        />
        <ReactSVG 
          onClick={() => setSearchState(['', ''])} 
          className={"close-search-icon" + (searchState[0] ? ' visible' : '')} 
          src={require('./image/Close-search-icon.svg').default} 
        />
      </div>
      {/*Блок который можно скроллить*/}
      <div className="scroll__block">
        {/*Кнопки фильтрации и сортирови вызывающие одноимённые окна*/}
        <div className="filter__block">
          <FilterButton
            mode='filter-mode'
            stateModal={setStateFiterModal}
            state={filterOptionState}
            content='Filter'
            image='Filter-icon.svg'
          />
          <FilterButton
            mode='sorting-mode'
            stateModal={setStateSortModal}
            content={sortState}
            image='Sorting-icon.svg'
          />
        </div>
        {/*Лист всех карточек option*/}
        <div className={"filtered-options" +
            (filterOptionState.length > 0 ? ' visible' : '')
          } 
          ref={scrollRef}
        >
          {/*Заполнение списка option карточек из стейта*/}
          {filterOptionState.map((item, index) => 
            <OptionItem 
              option={item} 
              key={index} 
              optionState={[filterOptionState, setfilterOptionState]} 
              filterState={setFilterState} 
            />
          )}
        </div>
        {/*Лист всех элементов*/}
        <GridList 
          gridItems={gridItems} 
          sortMethod={sortState} 
          filterMethod={filterState} 
          searchMethod={searchState}
        />
      </div>
      <div className="modal__wrapper">
        {/*Модальное окно фильтрации*/}
        <div className={"modal modal__filter" + (stateFiterModal ? ' active' : '')}>
          <ModalHeader 
            stateModal={setStateFiterModal} 
            type='filter' 
            text='Filter' 
            closeIcon='Close-search-icon.svg' 
          />
          <div className="modal__main">
            {/*Выбор цены*/}
            <div className="modal__filter-block price__block">
              <label>Price</label>
              <div className="price__block-singlePrice">
                <FilterInModalButton mode='price' from='' to='100' text='Below 100$' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='price' from='100' to='200' text='100$ - 200$' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='price' from='200' to='750' text='200$ - 750$' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='price' from='750' to='' text='Above 750$' activity={[filterState, setFilterState]} />
              </div>
              <span>Or insert price range below</span>
              <div className="price__block-rangePrice">
                <FilterRangePriceButton from label='From' activity={[filterState, setFilterState]} />
                <FilterRangePriceButton to label='To' activity={[filterState, setFilterState]} />
              </div>
            </div>
            {/*Выбор размера*/}
            <div className="modal__filter-block size__block">
              <label>Size</label>
              <div className="buttons__block">
                <FilterInModalButton mode='size' text='XS' size='filter-size' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='size' text='S' size='filter-size' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='size' text='M' size='filter-size' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='size' text='L' size='filter-size' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='size' text='XL' size='filter-size' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='size' text='XXL' size='filter-size' activity={[filterState, setFilterState]} />
              </div>
            </div>
            {/*Выбор типа новизны*/}
            <div className="modal__filter-block product__block">
              <label>Product type</label>
              <div className="buttons__block">
                <FilterInModalButton mode='type' text='New arrival' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='type' text='Sale' activity={[filterState, setFilterState]} />
              </div>
            </div>
            {/*Выбор цвета*/}
            <div className="modal__filter-block color__block">
              <label>Color</label>
              <div className="buttons__block">
                <FilterInModalButton mode='color' className='white' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='color' className='blue' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='color' className='beige' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='color' className='brown' activity={[filterState, setFilterState]} />
                <FilterInModalButton mode='color' className='gray' activity={[filterState, setFilterState]} />
              </div>
            </div>
          </div>
          <div className="modal__filter-buttons">
            <FilterSubmitButton 
              mode='Reset' 
              filterState={[filterState, setFilterState]} 
              optionState={setfilterOptionState} 
            />
            <FilterSubmitButton 
              mode='Apply' 
              filterState={[filterState, setFilterState]} 
              optionState={setfilterOptionState} 
              setStateFiterModal={setStateFiterModal}
            />
          </div>
        </div>
        {/*Модальное окно сортировки*/}
        <div className={"modal modal__sorting" + (stateSortModal ? ' active' : '')}>
          <ModalHeader 
            stateModal={setStateSortModal} 
            type='sorting' 
            text='Sort' 
          />
          {/*Выбор вида сортировки*/}
          <div className="modal__main">
            <ModalSortItem 
              atribute='Popular' 
              activity={[sortState, setSortState]} 
              setStateSortModal={setStateSortModal}
            />
            <ModalSortItem 
              atribute='Top selling' 
              activity={[sortState, setSortState]} 
              setStateSortModal={setStateSortModal}
            />
            <ModalSortItem 
              atribute='Price: Low to High' 
              activity={[sortState, setSortState]} 
              setStateSortModal={setStateSortModal}
            />
            <ModalSortItem 
              atribute='Price: High to Low' 
              activity={[sortState, setSortState]} 
              setStateSortModal={setStateSortModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
