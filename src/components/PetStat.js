import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'

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
	
	// Define image asset path for every stats
	const hungerPath = `Icons/hungerbar/${hunger}.png`;
	const happinessPath = `Icons/happinessbar/${happiness}.png`;
	const healthPath = `Icons/healthbar/${healthy}.png`;
	
	return (
		<div id="pet-stats">
		{
			contract ?
			<ul>
				<li><img id="hunger" src="%PUBLIC_URL%/Icons/hungerbar/0.png" /></li>
				<li><img id="happiness" src={process.env.REACT_APP_PUBLIC_URL + happinessPath} /></li>
				<li><img id="health" src={process.env.REACT_APP_PUBLIC_URL + healthPath} /></li>
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