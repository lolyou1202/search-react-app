import { useCallback } from 'react';
import GridItem from './GridItem';

export default function GridList({sortMethod, filterMethod, gridItems, searchMethod}) {
    const searching = useCallback((gridItems) => {
        if (searchMethod[1] !== '') {
            const asd = gridItems.filter(item => item.name.toLowerCase().includes(searchMethod[1]))
            gridItems = asd;
        }
        return gridItems
    }, [searchMethod])
    const filtering = useCallback((gridItems) => {
        let searchingGridItems = searching(gridItems)
        if (filterMethod.price.from !== '' || filterMethod.price.to !== '') {
            const price = searchingGridItems.filter(item => {
                let from = filterMethod.price.from;
                let to = filterMethod.price.to;
                if (from === '') {
                    from = 0;
                }
                if (to === '') {
                    to = Infinity;
                }
                return item.price >= from && item.price <= to
            })
            searchingGridItems = price;
        }
        if (filterMethod.size.length !== 0) {
            let size = searchingGridItems.filter(item => {
                let counter = 0;
                for (let i = 0; i < item.size.length; i++) {
                    if (filterMethod.size.includes(item.size[i]) === true) {
                        counter++
                    }
                }
                counter === filterMethod.size.length ? counter = true : counter = false
                return counter
            });
            searchingGridItems = size;
        }
        if (filterMethod.type.length !== 0) {
            let type = searchingGridItems.filter(item => {
                let counter = 0;
                for (let i = 0; i < item.status.length; i++) {
                    if (filterMethod.type.includes(item.status[i]) === true) {
                        counter++
                    }
                }
                counter === filterMethod.type.length ? counter = true : counter = false
                return counter
            });
            searchingGridItems = type;
        }
        if (filterMethod.color.length !== 0) {
            let color = searchingGridItems.filter(item => {
                let counter = 0;
                for (let i = 0; i < item.color.length; i++) {
                    if (filterMethod.color.includes(item.color[i]) === true) {
                        counter++
                    }
                }
                counter === filterMethod.color.length ? counter = true : counter = false
                return counter
            });
            searchingGridItems = color;
        }

        return searchingGridItems
    }, [searching, filterMethod])
    
    const sorting = useCallback((gridItems) => {
        let filteringGridItems = filtering(gridItems);
        
        switch (sortMethod) {
            case 'Popular': 
                filteringGridItems.sort((a, b) => - parseFloat(a.purchase.rating) + parseFloat(b.purchase.rating));
                break
            case 'Top selling': 
                filteringGridItems.sort((a, b) => - parseFloat(a.purchase.buy) + parseFloat(b.purchase.buy));
                break
            case 'Price: Low to High': 
                filteringGridItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break
            case 'Price: High to Low': 
                filteringGridItems.sort((a, b) => - parseFloat(a.price) + parseFloat(b.price));
                break
            default: break
        }

        return filteringGridItems
    }, [filtering, sortMethod])
    return (
        <div className="grid__block">
            {sorting(gridItems).map(item => <GridItem config={item} key={item.id} />)}
        </div>
    )
}
