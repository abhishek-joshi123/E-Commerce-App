
export const initialState = {
    basket: [],
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

 
const reducer = (state, action) => {

    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id)
            }
        default:   
            return state
    } 
}

export default reducer