//web3 connection functions
import Web3 from "web3";
import Web3Modal from "web3modal";

//check if web3 connection but not trigger connection positively
export const connectionChanges = async() => {
  //call switchNetwork 
  //enable accountschange
  try{
        window.ethereum.on("accountsChanged", (accounts) => {
            fetchAccount();
            fetchBalance();
            postBalanceHistory(); 
        });
    } catch(err){
        console.log(err)
    }
}

const fetchWeb3 = async() => {
  if(!window.ethereum) throw new Error("No crypto wallet found!");
  let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } 
    const web3 = new Web3(provider);
    return web3;
}

export const fetchAccount = async() => {
  const web3 = await fetchWeb3();
  try { 
    const accounts = await web3.eth.getAccounts();
    const account = web3.utils.toChecksumAddress(accounts[0]);
    return account;
  } catch(err) {
    console.log(err)
  }
}

export const fetchBalance = async() => {
  const web3 = await fetchWeb3();
  const account = await fetchAccount();
  try { 
    const balInWei = await web3.eth.getBalance(account);
    const balanceWhole = web3.utils.fromWei(balInWei);
    const balance = parseFloat(balanceWhole).toFixed(5);
    return balance;
  } catch(err) {
    console.log(err);
  }
}
//common internal functions in calling order
export const postBalanceHistory = async() => {
  const web3 = await fetchWeb3();
  const account = await fetchAccount();
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    let balanceRecord = new Array(0);
    let recordNum;
    if(blockNumber > 10000) {
        recordNum = 11;
    } else {
        recordNum = Math.floor(blockNumber / 1000);
    }
     for (let i = 0; i < recordNum; i++){
        let displayBlock = blockNumber - i * 1000;
        await web3.eth.getBalance(account, displayBlock, async(err, balance) => {
          if(err) {
            console.log(err)
          } else {
            balance = parseFloat(web3.utils.fromWei(String(balance), 'ether')).toFixed(5);
            let value = `${displayBlock} : ${balance}`;
            balanceRecord.push(value);
          }
        })
      }   
      return balanceRecord;
  } catch (err) {
    console.log(err);
  }
}

const switchNetwork = async(web3) => {
    if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(4) }], // chainId must be in hexadecimal numbers
          })
          .then (async() => {
            fetchAccount(web3);
            fetchBalance(web3);
            postBalanceHistory(web3);
            }).catch(err => {
              console.log(err);
            }
          );
        } catch (error) {
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '4',
                    rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(error);
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      } 
}

//start a connection to the web3 provider positively
export const connect = async() => {
  if(!window.ethereum) throw new Error("No crypto wallet found!");
  try{
      const web3 = await fetchWeb3();
      const chainId = await fetchChainId();   
      if (chainId !== 4) {
          switchNetwork(web3);
      }
      fetchAccount(web3);
      fetchBalance(web3);
      postBalanceHistory(web3); 
      window.ethereum.on("accountsChanged", (accounts) => {
          fetchAccount(web3);
          fetchBalance(web3);
          postBalanceHistory(web3); 
      });
  } catch(err){
      console.log(err)
  }
}

const getWeb3Modal = async() => {
  const providerOptions = {
      //for wallet other than metamask only but required
  };
  const web3Modal = new Web3Modal({
      network: 'rinkeby',
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
  return web3Modal;
}

const connectWeb3 = async() => {
  if(!window.ethereum) throw new Error("No crypto wallet found!");
  try{
      const web3Modal = await getWeb3Modal();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      return web3;
  } catch(err) {
      console.log(err);
  }
  }

  const fetchChainId = async() => {
  const web3 = await connectWeb3();
  const chainId = await web3.eth.net.getId();
  return chainId;
}

export const connectAccount = async() => {
  const web3 = await connectWeb3();
  try { 
    const accounts = await web3.eth.getAccounts();
    const account = web3.utils.toChecksumAddress(accounts[0]);
    return account;
  } catch(err) {
    console.log(err)
  }
}

export const connectForBalance = async() => {
  const web3 = await connectWeb3();
  const account = await connectAccount();
  try { 
    const balInWei = await web3.eth.getBalance(account);
    const balanceWhole = web3.utils.fromWei(balInWei);
    const balance = parseFloat(balanceWhole).toFixed(5);
    return balance;
  } catch(err) {
    console.log(err);
  }
}
