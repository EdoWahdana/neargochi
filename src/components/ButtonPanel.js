import React from 'react'
import Loader from 'react-loader-spinner'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import { login, logout } from '../utils'
import { UserAction } from './UserAction'

function ButtonPanel({ walletConnection }) {
	
	const [load, setLoad] = React.useState(false);
	const { promiseInProgress } = usePromiseTracker({delay: 500});
	
	const logIn = () => {
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
	
	return (
		<div id="button-panel">
			<h4>Welcome to Tamagotchi Blockchain.</h4>
			
			//Show these buttons if logged in
			{
				walletConnection.getAccountId() 
				? 
					<div id="button-panel">
						<button onClick={meal} id="btn feed">Meal</button>
						<button onClick={snack} id="btn">Snack</button>
						<button onClick={medicine} id="btn">Medicine</button>
						<button onClick={play} id="btn">Play</button>
					</div>
				: <p>Login to start playing..!!</p>
			}

			// Show button login if not logged in, otherwise show logout button
			{ !walletConnection.getAccountId() 
				? promiseInProgress
					? <Loader type="ThreeDots" color="#2BAD60" width="50" /> 
					: <button
						id="btn"
						disabled={load} 
						onClick={ () => {
							setLoad(true); 
							login.then(() => setLoad(false));
						}}>Log In</button>
				 
				: <button onClick={logOut} id="btn">Log Out</button>
			}
		</div>
	)
}

export default ButtonPanel