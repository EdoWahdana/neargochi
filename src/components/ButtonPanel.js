import React, { useContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import { login, logout } from '../utils'
import { action } from './StatImages'
import UserContext from '../context/UserContext'

function ButtonPanel() {
	
	const [load, setLoad] = useState(false);
	const [balance, setBalance] = useState();
	
	const { walletConnection, contract, near } = useContext(UserContext);
	const { promiseInProgress } = usePromiseTracker({delay: 500});
	
	useEffect(async () => {
		if(walletConnection.getAccountId()) getBalance();
	});
	
	const getBalance = (async () => {
		const account = await near.account(walletConnection.getAccountId());
		setBalance(await account.getAccountBalance());
	});
	
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
		await contract.meal({}, 300000000000000, 100000000000000000000000);
	}
	
	const snack = async () => {
		await contract.snack({}, 300000000000000, 100000000000000000000000);
	}
	
	const medicine = async () => {
		await contract.medicine({}, 300000000000000, 100000000000000000000000);
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
						<button onClick={medicine} id="btn">Medicine</button>
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
					: 
					<div>
						<br/>
						<button onClick={logOut} id="btn">Log Out</button>
					</div>
			}
		</div>
	)
}

export default ButtonPanel