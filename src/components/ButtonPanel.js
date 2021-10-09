import React from 'react'
import { login, logout } from '../utils'

function ButtonPanel({ walletConnection }) {
	
	const logIn = () => {
		walletConnection.requestSignIn(
			"tamagochi-server.testnet",
			"Tamagotchi NEAR"
		);
	}
	
	return (
		<div id="button-panel">
			<img src="" />
			<h4>Welcome to Tamagotchi Blockchain.</h4>
			{ walletConnection.getAccountId() 
				? <button id="btn">Log Out</button> 
				: <button onClick={logIn} id="btn">Log In</button>
			}
			
		</div>
	)
}

export default ButtonPanel