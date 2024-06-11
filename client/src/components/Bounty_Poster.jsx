import { useState } from "react"
import { NewBounty } from "./New_Bounty"
export const BountyPoster = (props) => {
    const {name, type, price, paymentType, _id} = props
    const [toggleEdit, setToggleEdit] = useState(false)

    const eToggle = () => setToggleEdit(prev => !prev)
    
    return (
    <div>
        { !toggleEdit ? 
        <>
            <h1>{name}</h1>
            <div>
                <p>{`Warning: ${type}, Extremely Dangerous, only for the most daring`}</p>
                <p>{`${price} ${paymentType} Offered, Dead or Alive`}</p>
            </div>
            <button onClick={() => props.deleteContract(_id)} className="delete-btn">Cancel Contract</button>
            <button onClick={eToggle} className="delete-btn">Edit Contract Details</button>
        </>
        :
        <>
        <NewBounty 
            name = {name}
            type = {type}
            price = {price}
            _id = {_id}
            paymentType = {paymentType}
            submit = {props.editContract}
            btnTxt={`Submit Contract Update`}
        />
        <button onClick={eToggle}>Close Update Form</button>
        </>
        }

    </div>
    )
}