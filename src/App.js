import React from 'react'
import GameContainer from './components/GameContainer'
import ButtonPanel from './components/ButtonPanel'

function App({ walletConnection, contract }) {
	return (
		<>
			<GameContainer contract={contract} />
			<ButtonPanel walletConnection={walletConnection} />
		</>
	)
}

export default App