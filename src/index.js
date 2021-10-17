import React from 'react'
import ReactDOM from 'react-dom'
import regeneratorRuntime from 'regenerator-runtime'
import getConfig from './config.js'
import * as nearAPI from 'near-api-js'
import { login, logout } from './utils'
import App from './App'
import UserContext from './context/UserContext'

const { connect } = nearAPI

async function initContract() {
	const nearConfig = getConfig('testnet');	
	
	// Connect to wallet
	const near = await nearAPI.connect({
		keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
		...nearConfig
	});
	
	// Make object to pass to components
	const walletConnection = new nearAPI.WalletConnection(near);
	
	// Store the authorized account object
	const account = walletConnection.account();
  
	// Initialize contract by contract name in config file
	const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
		viewMethods: ['health_check', 'get_weight', 'get_hunger', 'get_happines'],
		changeMethods: ['meal', 'medicine', 'snack', 'play'],
		sender: walletConnection.getAccountId()
	});
  
	// Wrap all into one User object
	return { walletConnection, contract, near };
}

window.nearInitPromise = initContract()
	.then( ({ walletConnection, contract, near }) => {
		ReactDOM.render (
			<UserContext.Provider value={{ walletConnection: walletConnection, contract: contract, near: near }}>
				<App />
			</UserContext.Provider>, 
			document.getElementById('root')
		)

	});