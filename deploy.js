/* 
    metamask test pass
    XFTjH5P74xJjFG4

*/

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const MNEMONIC = 'air fatal notice spoil patient afford imitate dry virus crime cost negative';
const NETWORK = 'https://rinkeby.infura.io/v3/9ea7b1d313414f3dbd5c57e3afc82ef4';

const provider = new HDWalletProvider(MNEMONIC, NETWORK);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there'] 
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        });

    console.log('contract deployes to', result.options.address);
};

deploy();