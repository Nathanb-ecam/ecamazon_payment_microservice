import React, { useEffect, useState } from 'react'
import MethodForm from './MethodForm';
import { FormData } from '../utils/FormModels';




interface Props{
  formData: FormData;
}

function SendPaymentMethod({formData} : Props) {
    const [response, setResponse] = useState(null);

    console.log("rendering send ")
    useEffect(() => {
          const postPaymentMethod = async () => {
          try {
    
            const response = await fetch('http://localhost:3000/api/payment-method', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            const result = await response.json();
            setResponse(result);
            console.log("WORKED",result)

          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
          }
        };
    
        postPaymentMethod();
    
        return () => {

        };
    
      }, []);


  return (
      <div>
        Add a payment method
        {/* {response} */}
      </div>  
    )
}

export default SendPaymentMethod;