import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedItems = state.items.concat(action.item);

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;
    if(exisingCartItem){
      updatedItem = {
        ...exisingCartItem,
        amount:exisingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = {...action.item};
      updatedItems = state.items.concat(action.item);
    }


    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// import {useReducer} from 'react';

// import CartContext from './cart-context';

// const defaultCartState = {
//   items:[],
//   totalAmount:0
// }

// const cartReducer = (state,action) => {
//   if(action.type === 'ADD'){
//     const updatedItems = state.items.concat(action.item);
//     const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
//     return {
//       items:updatedItems,
//       totalAmount:updatedTotalAmount
//     }
//   }
//   return defaultCartState;
// };

// const CartProvider = props => {
//   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

//   const addItemToCartHandler = item => {
//     dispatchCartAction({type:'ADD', item:item})
//   };

//   const removeItemFromCartHandler = id => {
//     dispatchCartAction({type:'REMOVE', id:id})
//   };

//   const cartContext = {
//     items:cartState.items,
//     totalAmount: cartState.totalAmount,
//     addItem:addItemToCartHandler,
//     removeItem:removeItemFromCartHandler
//   }

//   return <CartContext.Provider value={cartContext}>
//     {props.children}
//   </CartContext.Provider>
// };

// export default CartProvider;
