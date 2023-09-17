
export const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) || [],   
}

 
// selecter..
export const getBasketTotal = (basket) => {

    return basket?.reduce((amount, item) => {
        return amount + item.price;
    }, 0)
}


export const getBasketTotalPrice = (basket) => {

    return basket?.reduce((amount, item) => {
        return amount + Math.floor((item.price * 100)/(100 - item.discount));
    }, 0)
}

export const getBasketTotalDiscount = (basket) => {

    return basket?.reduce((amount, item) => {
        return amount + (Math.floor((item.price * 100)/(100 - item.discount)) - item.price);
        
    }, 0)
}   

export const filterAndModifyProducts = (basket) => {
    const productMap = new Map();
  
    basket.forEach(product => {
      const id = product.id;
      if (productMap.has(id)) {
        productMap.get(id).Quantity += 1;
      } else {
        productMap.set(id, { ...product, Quantity: 1 });
      }
    });
  
    const uniqueProducts = Array.from(productMap.values());
  
    return uniqueProducts;
}
 


const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'ADD_TO_BASKET':
            newState = {
                ...state,
                basket: [...state.basket, action.item],
            };
            break;
        case 'REMOVE_FROM_BASKET':
            newState = {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            };
            break;
        case 'MAKE_BASKET_EMPTY':
            newState = {
                ...state,
                basket: [],
            };
            break;
        case 'DECREMENT_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id : ${action.id}) as it is not in the basket!`
                );
            }
            newState = {
                ...state,
                basket: newBasket,
            };
            break;
        default:
            newState = state;
    }

    localStorage.setItem('basket', JSON.stringify(newState.basket));
    return newState;
};

export default reducer