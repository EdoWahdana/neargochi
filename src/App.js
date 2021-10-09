import React from 'react'
import GameContainer from './components/GameContainer'
import ButtonPanel from './components/ButtonPanel'

function App({ walletConnection }) {
	return (
		<>
			<GameContainer />
			<ButtonPanel walletConnection={walletConnection} />
		</>
	)
}

export default App