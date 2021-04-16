import React from 'react'
import Provider from "./lib/components/Provider";
import {createStore} from "redux";
import FirstSon from "./FirstSon";
import SecondSon from "./SecondSon";
import ThirdSon from "./ThirdSon";

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {...state, value: state.value + action.payload}
    case 'decrement':
      return {...state, value: state.value - action.payload}
    default:
      return state
  }
}

const initState = {value: 1}

const store = createStore(reducer, initState)

function App() {
  return (
    <Provider store={store}>
      <div>
        <FirstSon/>
        <SecondSon/>
        <ThirdSon/>
      </div>
    </Provider>
  );
}

export default App;
