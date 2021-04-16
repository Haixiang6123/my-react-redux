import React from "react";
import connect from "./lib/components/connect";
import FirstSon from "./FirstSon";

const FirstFather = (props) => {
  const {value, grandFatherValue, add, minus} = props

  return (
    <div className="father">
      <h2>大爸爸</h2>

      <p>
        <span>Store value: {value}</span>
        <span style={{marginLeft: 8}}>grandFatherValue: {grandFatherValue}</span>
      </p>

      <div>
        <button onClick={add}>store.value + 1</button>
        <button onClick={minus}>store.value - 1</button>
      </div>

      <FirstSon/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  value: state.value
})

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch({type: 'increment', payload: 1}),
  minus: () => dispatch({type: 'decrement', payload: 1})
})

export default connect(mapStateToProps, mapDispatchToProps)(FirstFather)
