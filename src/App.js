import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'

// ABIs
import Dappcord from './abis/Dappcord.json'

// Config
import config from './config.json'
import Servers from './components/Servers'
import Channels from './components/Channels'

// Socket
const socket = io('ws://localhost:3030');

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null)
  const [dappcord, setDappcord] = useState(null)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const dappcord = new ethers.Contract(config[network.chainId].Dappcord.address, Dappcord.abi, provider)
    setDappcord(dappcord)

    const totalChannels = await dappcord.totalChannels()
    const channels = []

    for (let i = 1; i <= totalChannels; i++) {
      const channel = await dappcord.getChannel(i)
      channels.push(channel)
    }

    setChannels(channels)

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
        <Servers />
        <Channels provider={provider} account={account}
          dappcord={dappcord} channels={channels} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} />
      </main>
    </div>
  );
}

export default App;
