import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { BountyPoster } from './components/Bounty_Poster'
import { NewBounty } from './components/New_Bounty'

function App() {
  const [bounties, setBounties] = useState([])

  const getBounties = () => {
    axios.get("/api/bounties")
    .then(res => {
      console.log(res.data) 
      setBounties(res.data)
    })
      .catch(err => console.log(err))
  }
  const addBounty = (newBounty) => {
    axios.post("/api/bounties/", newBounty)
    .then(res => {
      setBounties(prevBoard => [...prevBoard, res.data])
    })
    .catch(err => console.log(err))
  }
  const deleteBounty = (bountyId) => {
    axios.delete(`/api/bounties/${bountyId}`)
    .then(res => {
      setBounties(prevBoard => prevBoard.filter(bounty => bounty._id !== bountyId))
    })
    .catch(err => console.log(err))
  }

  const editBounty = (bountyUpdates, bountyId) => {
    axios.put(`/api/bounties/${bountyId}`, bountyUpdates)
      .then(res => {
        console.log(res)
        setBounties(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBounties()
  }, [])
    console.log(bounties)
  return (
    <>
      <div>
        <NewBounty 
        submit={addBounty} 
        btnTxt = "Post Bounty"
        />
        {bounties.map(bounty => 
        <BountyPoster 
          {...bounty} 
          key={bounty._id} 
          deleteContract={deleteBounty}
          editContract = {editBounty}
          />
        )}
      </div>
    </>
  )
}


export default App