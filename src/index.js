import React from 'react'
import ReactDOM from 'react-dom'
import regeneratorRuntime from 'regenerator-runtime'
import getConfig from './config.js'
import * as nearAPI from 'near-api-js'
import { login, logout } from './utils'
import App from './App'

const { networkId } = getConfig(process.env.NODE_ENV || 'testnet')
const { connect } = nearAPI

const config = {
	networkId: "testnet",
	nodeUrl: "https://rpc.tesnet.near.org",
	walleturl: "https://wallet.testnet.near.org",
	helperUrl: "https://helper.testnet.near.org",
	explorerUrl: "https://explorer.testnet.near.org"
}

async function initContract() {
	const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');	
	
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
		callMethods: ['meal', 'medicine', 'snack'],
		sender: walletConnection.getAccountId()
	});
  
	return { walletConnection, contract };
}

window.nearInitPromise = initContract()
	.then( ({ walletConnection, contract }) => {
		ReactDOM.render (
			<App 
				walletConnection={walletConnection}
				contract={contract}
			/>, 
			document.getElementById('root')
		)

	});