import React, { useContext, useEffect, useState } from 'react'
import Big from 'big.js'
import Loader from 'react-loader-spinner'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import { login, logout } from '../utils'
import { action } from './StatImages'
import UserContext from '../context/UserContext'

function ButtonPanel({ stateChanger }) {
	
	const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
	const [load, setLoad] = useState(false);
	const [guess, setGuess] = useState();
	const [panel, setPanel] = useState(false);
	const [played, setPlayed] = useState("");
	
	const { walletConnection, contract, near } = useContext(UserContext);
	const { promiseInProgress } = usePromiseTracker({delay: 500});
	
	const clearPlayed = () => {
		setPlayed("");
	}
	
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
		await contract.meal({}, BOATLOAD_OF_GAS, Big('0').times(10 ** 24).toFixed());
		stateChanger();
	}
	const mealPromise = () => { trackPromise(meal()) }
	
	const snack = async () => {
		await contract.snack({}, BOATLOAD_OF_GAS, Big('0').times(10 ** 24).toFixed());
		stateChanger();
	}
	const snackPromise = () => { trackPromise(snack()) }
	
	const medicine = async () => {
		await contract.medicine({}, BOATLOAD_OF_GAS, Big('0').times(10 ** 24).toFixed());
		stateChanger();
	}
	const medicinePromise = () => { trackPromise(medicine()) }	
	
	const play = async (e) => {
		let facing = await contract.play({value: parseInt(e)}, BOATLOAD_OF_GAS, Big('0').times(10 ** 24).toFixed());
		(facing) ? setGuess(true) : setGuess(false);
		setPlayed("played");
		stateChanger();
	}
	const playPromise = (e) => { trackPromise(play(e.target.value)) }
	
	const PlayPanel = () => (
		<div id="button-grid">
			<p style={{fontSize: 15}}>GUESS THE DIRECTION MONKEY WILL BE FACING : </p>
			
			<button onClick={e => playPromise(e).then(clearPlayed)} id="btn" value={0}>
				<img src={action.arrowLeft} style={{width: 20, paddingRight: 10}} />
				LEFT
			</button>
			<button onClick={e => playPromise(e).then(clearPlayed)} id="btn" value={1}>
				RIGHT
				<img src={action.arrowRight} style={{width: 20, paddingRight: 10}} />
			</button>
			<button onClick={() => panel ? setPanel(false) : setPanel(true)}>X</button>
		</div>
	);
	
	
	return (
		<div id="button-panel">
			<img src={require("../assets/favicon.ico")} width="100"/>
			{ (walletConnection.getAccountId()) ? <p>Lets Play..!!</p> : <h5>Welcome to Tamagotchi Blockchain.</h5> }
			
			{ (guess == true && played == "played")
				? <p style={{fontSize: 15, color: "green"}}>CONGRATULATIONS!! YOU GUESSED IT CORRECTLY </p>
				: null
			}
			
			{ (guess == false && played == "played")
				? <p style={{fontSize: 15, color: "red"}}>SNAP!! BETTER LUCK NEXT TIME </p>
				: null
			}
			
			{
			//Show these buttons if logged in
				(walletConnection.getAccountId()) 
				?
					promiseInProgress
						? <Loader type="ThreeDots" color="#2BAD60" width="50" /> 
						:
							panel 
							? <PlayPanel />
							:
								<div id="button-grid">
									<button onClick={mealPromise} id="btn"><img src={action.banana} style={{width: 20, paddingRight: 10}} />Meal</button>
									<button onClick={snackPromise} id="btn"><img src={action.snack} style={{width: 20, paddingRight: 10}} />Snack</button>
									<button onClick={medicinePromise} id="btn"><img src={action.medicine} style={{width: 20, paddingRight: 10}} />Medicine</button>
									<button onClick={() => panel ? setPanel(false) : setPanel(true)} id="btn"><img src={action.play} style={{width: 20, paddingRight: 10}} />Play</button>
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