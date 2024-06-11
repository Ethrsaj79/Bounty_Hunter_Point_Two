import { useState } from "react"
export const NewBounty = (props) => {
    const emptyContract = {
        name: props.name || "", 
        type: props.type || "", 
        living: props.living || true, 
        price: props.price || 0, 
        paymentType: props.paymentType || ""
    }
    const [inputs, setInputs] = useState(emptyContract)

    const handleChange = (e) => {
        const {name, value, _id} = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(emptyContract)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            value={inputs.name} 
            onChange={handleChange} 
            placeholder="Target Name"/>
            <input 
            type="text" 
            name="type" 
            value={inputs.type} 
            onChange={handleChange} 
            placeholder="Target Profession"/>
            <input 
            type="number" 
            name="price" 
            value={inputs.price} 
            onChange={handleChange} 
            placeholder="Unit of Payment"/>
            <input 
            type="text" 
            name="paymentType" 
            value={inputs.paymentType} 
            onChange={handleChange} 
            placeholder="Form of Payment"/>
            <button>{props.btnTxt}</button>
        </form>
    )
}