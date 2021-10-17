import React, { useContext, useState } from 'react'
import Big from 'big.js'
import Loader from 'react-loader-spinner'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import { login, logout } from '../utils'
import { action } from './StatImages'
import UserContext from '../context/UserContext'

function ButtonPanel() {
	
	const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
	const [load, setLoad] = useState(false);
	
	const { walletConnection, contract, near } = useContext(UserContext);
	const { promiseInProgress } = usePromiseTracker({delay: 500});
	
	const logIn = () => {
		setLoad(true);
		trackPromise(
			walletConnection.requestSignIn(
				"neargochi.testnet",
				"Tamagotchi NEAR"
			),
		);
	}
	
	const logOut = () => {
		walletConnection.signOut();
		location.reload();
	}
	
	const meal = async () => {
		await contract.meal({});
	}
	
	const snack = async () => {
		await contract.snack({});
	}
	
	const medicine = async () => {
		await contract.medicine({});
	}
	
	return (
		<div id="button-panel">
			<img src={require("../assets/favicon.ico")} width="100"/>
			{ (walletConnection.getAccountId()) ? <p>Lets Play..!!</p> : <h5>Welcome to Tamagotchi Blockchain.</h5> }
			
			{
			//Show these buttons if logged in
				(walletConnection.getAccountId()) 
				? 
					<div id="button-grid">
						<button onClick={meal} id="btn"><img src={action.banana} style={{width: 20, paddingRight: 10}} />Meal</button>
						<button onClick={snack} id="btn"><img src={action.snack} style={{width: 20, paddingRight: 10}} />Snack</button>
						<button onClick={medicine} id="btn"><img src={action.medicine} style={{width: 20, paddingRight: 10}} />Medicine</button>
						<button id="btn">Play</button>
					</div>
				: 
					<p style={{fontSize: 10}}>Login to start playing..!!</p>
			}
			
			{ 
			// Show button login if not logged in, otherwise show logout button
				(!walletConnection.getAccountId())
					? promiseInProgress
						? <Loader type="ThreeDots" color="#2BAD60" width="50" /> 
						: <button
							id="btn"
							disabled={load} 
							onClick={logIn}> Log In
						  </button>
					: <button onClick={logOut} id="btn">Log Out</button>
			}
		</div>
	)
}

export default ButtonPanel