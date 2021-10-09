import React from 'react'
import hunger from '../assets/Icons/hungerbar/hungerbar100.png'
import health from '../assets/Icons/healthbar/healthbar100.png'
import happiness from '../assets/Icons/happinessbar/happinessbar100.png'

function PetStat() {
	return (
		<div id="pet-stats">
			<ul>
				<li><img id="hunger" src={hunger} alt="hunger" /></li>
				<li><img id="health" src={health} /></li>
				<li><img id="happiness" src={happiness} /></li>
			</ul>
		</div>
	)	
}

export default PetStat 