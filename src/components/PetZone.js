import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context/UserContext'
import { MonkeySpinning, MonkeySick, MonkeyIdle } from './MonkeyImages'

function PetZone() {
	
	const [weight, setWeight] = useState();
	const { contract } = useContext(UserContext);
	const pet = document.getElementById("pet");
	
	useEffect(async () => {
		if(contract) setWeight(await contract.get_weight());
		
		let i = 0;
		const interval = setInterval( () => {
			if(i == 5) clearInterval(interval);
			pet.src = MonkeySpinning[i++];
		}, 500);
	});
	
	return (
		<div id="pet-zone">
			<img className="pet" id="pet" src={MonkeyIdle[0]} width="100" />
		</div>
	)
}

export default PetZone