import React, { useState, useEffect, useContext } from 'react'
import { MonkeySpinning, MonkeySick, MonkeyIdle } from './MonkeyImages'
import UserContext from '../context/UserContext'

function PetZone() {
	
	const pet = document.getElementById("pet");
	
	const [weight, setWeight] = useState();
	const [health, setHealth] = useState();
	const { contract } = useContext(UserContext);
	
	const updateStat = async () => {
		if(contract) {
			setWeight(await contract.get_weight());
			setHealth(await contract.health_check());
		}
	}
	
	useEffect(async () => {
		updateStat()
			.then(() => {
				let i = 0;
				const interval = setInterval( () => {
					if(!health) {
						if(i == 2) clearInterval(interval);
						pet.src = MonkeySick[i++];
					} else {
						if(i == 5) clearInterval(interval);
						pet.src = MonkeySpinning[i++];				
					}
					
				}, 300);
				
				if(pet.width <= 300) pet.width = 100 + weight;
			});
	});
	
	return (
		<div id="pet-zone">
			<img className="pet" id="pet" width="100" />
		</div>
	)
}

export default PetZone