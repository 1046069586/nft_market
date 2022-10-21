import Web3 from 'web3'
import MintNFT from "../contracts/MintNFT.json"
import Market from "../contracts/Market.json"

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()   //Please use the 'eth_requestAccounts' RPC method instead.
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

export async function connectWallet() {
    loadWeb3();
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
} 

export async function loadContract(contractName) {
  loadWeb3();
  const web3 = window.web3
  const networkId = await web3.eth.net.getId()
  const networkData = contractName.networks[networkId]

  if(networkData) {
    const abi = contractName.abi
    const address = networkData.address
    const contract = new web3.eth.Contract(abi, address)
    return contract
  }else{
    console.log('no contract')
    return null
  }
  
}

export async function mint(tokenURI) {
  const account = await connectWallet()
  const nft = await loadContract(MintNFT)
  const market = await loadContract(Market)
  await nft.methods.mint(tokenURI).send({from:account})
  const tokenID = await nft.methods.tokenCount().call()
  console.log(tokenID)
   // approve marketplace to spend nft
  await nft.methods.setApprovalForAll(market.options.address, true).send({from:account})
   // add nft to marketplace
   const listingPrice = 1
  await market.methods.makeItem(nft.options.address, tokenID, listingPrice).send({from:account})
}

// By clicking approve, you are granting access to all of the NFTs you currently own on this contract and 
// any NFTs on this contract you may acquire in the future until you revoke this approval. The party to 
// whom you're granting approval will be able to transfer your NFTs from your wallet without further notice. 
// Proceed with caution.

export async function listItem(){
  const nft = await loadContract(MintNFT)
  const market = await loadContract(Market)
  const itemCount = await market.methods.itemCount().call()
  let items = []
  for (let i = 1; i <= itemCount; i++) {
    const item = await market.methods.items(i).call()
    // if (!item.sold) {
      // get uri url from nft contract
      const uri = await nft.methods.tokenURI(item.tokenId).call()
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      console.log(metadata)
      // get total price of item (item price + fee)
      const totalPrice = await market.methods.getTotalPrice(item.itemId).call()
      // Add item to items array
      items.push({
        totalPrice,
        itemId: item.itemId,
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        url: metadata.url
      })
    }
  // }
  return items
}

export async function buy(item){
  const account = await connectWallet()
  const market = await loadContract(Market)
  return await market.methods.purchaseItem(item.itemId).send({ value: item.totalPrice, from:account })
}

export async function myCreated(){
  const nft = await loadContract(MintNFT)
  const market = await loadContract(Market)
  const account = await connectWallet()
  // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
  const results =  await market.getPastEvents("Offered", {filter:{seller:account}, fromBlock: 0, toBlock: 'latest'})
  //Fetch metadata of each nft and add that to listedItem object.
  const createdItems = await Promise.all(results.map(async i => {
    // fetch arguments from each result
    i = i.returnValues
    // get uri url from nft contract
    const uri = await nft.methods.tokenURI(i.tokenId).call()
    // use uri to fetch the nft metadata stored on ipfs 
    const response = await fetch(uri)
    const metadata = await response.json()
    // get total price of item (item price + fee)
  
    // define listed item object
    let createdItem = {
      itemId: i.itemId,
      name: metadata.name,
      description: metadata.description,
      url: metadata.url
    }
    return createdItem
  }))
  return createdItems
}

export async function myCollected(){
  const nft = await loadContract(MintNFT)
  const market = await loadContract(Market)
  const account = await connectWallet()
  // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
  const results =  await market.getPastEvents("Bought", {filter:{buyer:account}, fromBlock: 0, toBlock: 'latest'})
  //Fetch metadata of each nft and add that to listedItem object.
  const purchases = await Promise.all(results.map(async i => {
    // fetch arguments from each result
    i = i.returnValues
    // get uri url from nft contract
    const uri = await nft.methods.tokenURI(i.tokenId).call()
    // use uri to fetch the nft metadata stored on ipfs 
    const response = await fetch(uri)
    const metadata = await response.json()
    // get total price of item (item price + fee)
  
    // define listed item object
    let purchasedItem = {
      itemId: i.itemId,
      name: metadata.name,
      description: metadata.description,
      url: metadata.url
    }
    return purchasedItem
  }))
  return purchases
} 