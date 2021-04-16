import React, {useState} from 'react'
import Provider from "./lib/components/Provider";
import {createStore} from "redux";
import FirstFather from "./FirstFather";
import SecondFather from "./SecondFather";

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

function GrandFather() {
  const [grandFatherValue, setGrandFatherValue] = useState(2)

  return (
    <Provider store={store}>
      <div className="grandFather">
        <h1>爷爷</h1>
        <button onClick={() => setGrandFatherValue(grandFatherValue + 1)}>grandFatherValue + 1</button>
        <button onClick={() => setGrandFatherValue(grandFatherValue - 1)}>grandFatherValue - 1</button>
        <FirstFather grandFatherValue={grandFatherValue}/>
        <SecondFather/>
      </div>
    </Provider>
  );
}

export default GrandFather;
