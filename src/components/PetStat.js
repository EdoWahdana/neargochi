import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { hungerbar, happinessbar, healthbar } from './StatImages'

function PetStat() {
	
	// State for this component
	const [hunger, setHunger] = useState();
	const [happiness, setHappiness] = useState();
	const [healthy, setHealthy] = useState();

	useEffect( async () => {
		if(contract) {
			// Set state from the value of UserContext
			setHunger(await contract.get_hunger());
			setHappiness(await contract.get_happines());
			setHealthy(await contract.health_check());			
		}
	});

	// Get the UserContext);
	const { walletConnection, contract } = useContext(UserContext);
	
	return (
		<div id="pet-stats">
		{
			walletConnection.getAccountId() ?
			<ul>
				<li><img id="hunger" src={(hunger > 4) ? hungerbar[4] : hungerbar[hunger]} /></li>
				<li><img id="happiness" src={(happiness > 4) ? happinessbar[4] : happinessbar[happiness]} /></li>
				<li><img id="health" src={healthbar[healthy]} /></li>
			</ul>
			: 
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul> 
		}
		</div>
	)	
}

export default PetStat 