# addressMonitoring

Js script to watch pending transactions involving an address on the blockchain.  

The script needs an Infura project ID and an ethereum address as parameters.  

It is currently set to monitor on ropsten testnet but you can switch to others modifying the provider URL. 


# Setup

Clone the git repository  

```
git clone https://github.com/raphaelpg/addressMonitoring.git
```

Install node packages  

```
cd addressMonitoring

npm install
```

Edit the `config.js` file with your infura project ID and the address you want to monitor.  
Then launch addressMonitoring.js  

```
node addressMonitoring.js
```