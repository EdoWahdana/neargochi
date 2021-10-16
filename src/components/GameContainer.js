import React from 'react'
import PetStat from './PetStat'
import PetZone from './PetZone'

function GameContainer() {
	return (
		<div id="container">
			<div id="game-wrapper">
				<PetStat />
				<PetZone />
			</div>
		</div>
	)
}

export default GameContainer