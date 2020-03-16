const Web3 = require('web3');
const projectId = require('./config.js')['config']['projectId'];
const address = require('./config.js')['config']['address'];

class addressMonitor{
	constructor(projectId, monitoredAddress){
		//Websocket provider to subscribe to the blockchain event
		this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/' + projectId));
		//HttpProvider to retrieve transaction infos
		this.web3 = new Web3( new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + projectId));
		this.monitoredAddress = monitoredAddress.toLowerCase();
	}

	subscribe(topic){
		this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
			if (err) console.log(err);
		})
	}

	watchTransactions(){
		console.log("Monitoring pending transaction involving " + address + "...");
		this.subscription.on('data', async (txHash) => {
			try {
				let tx = await this.web3.eth.getTransaction(txHash);
				//Monitoring transactions to monitored address
				if (tx != null && tx.to != null && this.monitoredAddress == tx.to.toLowerCase()) {
					console.log({from: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
				} 
				//Monitoring transactions from monitored address
				else if (tx != null && tx.from != null && this.monitoredAddress == tx.from.toLowerCase()) {
					console.log({to: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
				}
			} catch (err) {
				console.error(err);
			}
		});
	}
}

let addressMonitor2 = new addressMonitor(projectId, address);
addressMonitor2.subscribe('pendingTransactions');
addressMonitor2.watchTransactions();