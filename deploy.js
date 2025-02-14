const HDWaletProvider = require("@truffle/hdwallet-provider")
const {Web3} = require("web3")
const { interface , bytecode }  = require("./compile");

const provider = new HDWaletProvider(
    "someone yesterday buddy label your swift draft transfer quit miles right fit",
    "https://base-sepolia.infura.io/v3/3ea420b5677e4b94b02bc2b7a3bc6955"
)


const web3 = new Web3(provider)
const deploy  = async() => {
    try {

        const accounts = await web3.eth.getAccounts();
        const res = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data : bytecode, arguments : ["Hey there!"]})
                        .send({from : accounts[0], gas : 1000000})    
        console.log(res);
    }
    catch(e){
        console.log("Err: ", e);
        
    }
    
}

deploy();