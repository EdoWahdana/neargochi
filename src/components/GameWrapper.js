import React from 'react'
import PetStat from './PetStat'
import PetZone from './PetZone'
import UserAction from './UserAction'

function GameContainer() {
	return (
		<div id="container">
			<div id="game-wrapper">
				<PetStat />
				<PetZone />
				<UserAction />
			</div>
		</div>
	)
}

export default GameContainer