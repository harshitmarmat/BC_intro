const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3')
const web3 = new Web3(ganache.provider())
const {interface , bytecode } = require('../compile')

let accounts;
let inbox ;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    console.log(accounts);
    
    inbox  = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({ data : bytecode, arguments : ['Hey there!'] }) 
                    .send({from : accounts[0],gas : 1000000})
})

describe('Inbox', () => { 
    it("deploys Contract", () => {
        assert.ok(inbox.options.address)
    }),
    it("contract default message" , async() => {
        const message = await inbox._methods.message().call();
        assert.equal(message,"Hey there!")
    })
    it('SetMessage', async()=> {
        await inbox._methods.setMessage("bye").send({ from : accounts[0]})
        const message = await inbox._methods.message().call()
        assert.equal(message,"bye")
    })
 })