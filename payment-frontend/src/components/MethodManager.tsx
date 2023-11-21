import React, { useEffect, useState } from 'react'
import MethodForm from './MethodForm';
import SendPaymentMethod from './SendPaymentMethod';

function  MethodManager(){
    const [submited,setSubmited] = useState(false);
    const [formData,setFormData] = useState({
        'cardNumber' : '',
        'threeDigitCode' : '',
        'type' : '',
        'user_id' : 0,

    });

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    const handleMethodSubmit = (e:any) => {
        e.preventDefault();
        console.log(formData);
        setSubmited(true);
        
        
    };





  return (
    <>
    <MethodForm handleChange={handleChange} handleSubmit={handleMethodSubmit} formData={formData}></MethodForm>
    {submited && <SendPaymentMethod formData={formData}></SendPaymentMethod>}
    </>
  )
}

export default MethodManager