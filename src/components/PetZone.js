import React from 'react'
import pet from '../assets/Monkey/Animations/monkey_faceforward.png'

function PetZone() {
	return (
		<div id="pet-zone">
			<img className="pet" id="pet" src={pet} width="100" />
		</div>
	)
}

export default PetZone