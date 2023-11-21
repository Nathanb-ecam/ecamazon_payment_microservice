import React from 'react'

import {FormData} from '../utils/FormModels'





interface Props{
    formData: FormData;
    handleChange : (e:any) => void ;
    handleSubmit : (e:any) => void ;
}



function MethodForm({formData, handleChange, handleSubmit} : Props) {
  return (
    <form onSubmit={handleSubmit}>
        <p>
            <label>Card Number :</label>
            <input type="text" name="cardNumber" id="cardNumber" value={formData.cardNumber} onChange={handleChange}  required />
        </p>
        <p>
            <label>Three Digit Code :</label>
            <input type="number" name="threeDigitCode" id="threeDigitCode" value={formData.threeDigitCode} onChange={handleChange} pattern="\d{3}" required />
        </p>
        <p>
            <label>Type :</label>
            <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} required />
        </p>
        <p>
            <label>User_id</label>
            <input type="number" name="user_id" id="user_id" value={formData.user_id} onChange={handleChange} required />
        </p>
        <input type="submit" value="Ajouter" />
    </form>
  )
}

export default MethodForm;