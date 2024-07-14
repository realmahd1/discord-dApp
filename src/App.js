import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'

// ABIs
import Dappcord from './abis/Dappcord.json'

// Config
import config from './config.json'

// Socket
const socket = io('ws://localhost:3030');

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null)
  const [dappcord, setDappcord] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const dappcord = new ethers.Contract(config[network.chainId].Dappcord.address, Dappcord.abi, provider)
    setDappcord(dappcord)

    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <main>

      </main>
    </div>
  );
}

export default App;
