import React, { useEffect, useState }	 from 'react'
import GameContainer from './components/GameContainer'
import ButtonPanel from './components/ButtonPanel'

function App() {
	
	const [click, setClick] = useState(false);
	
	function change() {
		click ? setClick(false) : setClick(true);
	}
	
	return (
		<>
			<GameContainer  />
			<ButtonPanel stateChanger={change} />
		</>
	)
}

export default App