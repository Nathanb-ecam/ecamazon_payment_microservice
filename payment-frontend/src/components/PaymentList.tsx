// Navbar

import React from 'react';
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';


// const BASE_URL = "http://payment_API:3000/api"
// const api_ip = process.env.REACT_APP_API_CONTACT_POINT || 'localhost';
const api_ip = "localhost";
const BASE_URL = `http://${api_ip}:3000/api`;



interface Props{
    title:string;
}

function PaymentList({title}:Props){

    const [payments, setPayments] = useState<Array<{user_id:string;payment_id:string,method_id:string;amount:number;refund:boolean;}>>([]);

    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const response = await fetch(BASE_URL+"/payments");
          const result = await response.json();
          console.log("Payments", result.result)
          setPayments(result.result);
        //   payments.map((payment,index)=>{
        //       console.log("payment")
        //       console.log(payment.payment_id)
        //       console.log(payment.method_id)
        //       console.log(payment.user_id)
        //       console.log(payment.amount)
        //       console.log(payment.refund)

        //   }
        // )


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPayments();
    }, []);


    return (
        <>
            {/* {payments && JSON.stringify(payments, null, 2)} */}
            
            <Table bordered hover className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">User id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Refund</th>
                    </tr>
                </thead>
                <tbody>
                    {payments && payments.length>0 && payments.map((payment,index)=>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{payment.user_id ?? 'Null'}</td>
                            <td>{payment.amount ?? 'Null'}</td>
                            <td><input type="checkbox"  checked={payment.refund} disabled /></td>
                        </tr>
                    ))}

                </tbody>
            </Table>


        </>
      );}

export default PaymentList;
