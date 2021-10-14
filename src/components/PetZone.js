import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context/UserContext'
import { MonkeySpinning, MonkeySick, MonkeyIdle } from './MonkeyImages'

function PetZone() {
	
	const [weight, setWeight] = useState();
	const { contract } = useContext(UserContext);
	const pet = document.getElementById("pet");
	
	const animateMonkey = (max, seconds, animation) => {
		let counter = 0;
		const interval = setInterval( () => {
			if(i == max) clearInterval(interval);
			pet.src = animation.counter;
		}, seconds);
	}
	
	useEffect(async () => {
		if(contract) setWeight(await contract.get_weight());
		
		animateMonkey(6, 100);
	});
	console.log(MonkeyIdle);
	
	return (
		<div id="pet-zone">
			<img className="pet" id="pet" src={MonkeyIdle} width="100" />
		</div>
	)
}

export default PetZone