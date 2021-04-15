import React from 'react'

const FirstSon = () => {
  return <div>大儿子</div>
}

const SecondSon = () => {
  return <div>二儿子</div>
}

const ThirdSon = () => {
  return <div>三儿子</div>
}

function App() {
  return (
    <div>
      <FirstSon/>
      <SecondSon/>
      <ThirdSon/>
    </div>
  );
}

export default App;
