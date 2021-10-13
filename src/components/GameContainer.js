import React from 'react'
import PetStat from './PetStat'
import PetZone from './PetZone'
import UserAction from './UserAction'

function GameContainer({ contract }) {
	return (
		<div id="container">
			<div id="game-wrapper">
				<PetStat contract={contract} />
				<PetZone />
				<UserAction />
			</div>
		</div>
	)
}

export default GameContainer