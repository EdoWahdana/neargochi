import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'

function PetStat() {
	
	// State for this component
	const [hunger, setHunger] = useState();
	const [happiness, setHappiness] = useState();
	const [healthy, setHealthy] = useState();

	// Get the UserContext);
	const { walletConnection, contract } = useContext(UserContext);
	
	// Define image asset path for every stats
	const hungerPath = '../assets/Icons/hungerbar/';
	const happinessPath = '../assets/Icons/happinessbar/'
	const healthPath = '../assets/Icons/healthbar/';
	
	useEffect( async () => {
		if(contract) {
			// Set state from the value of UserContext
			setHunger(await contract.get_hunger());
			setHappiness(await contract.get_happines());
			setHealthy(await contract.health_check());			
		}
	});
	
	return (
		<div id="pet-stats">
		{ 
			contract ?
			<ul>
				<li><img id="hunger" src={hungerPath + hunger + ".png"} /></li>
				<li><img id="happiness" src={happinessPath + happiness + ".png"} /></li>
				<li><img id="health" src={healthPath + healthy + ".png"} /></li>
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