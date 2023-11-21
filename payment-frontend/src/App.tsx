import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import AppNavbar from './components/AppNavbar';
import PaymentList from './components/PaymentList';

function App() {
  return (
      <>
        <AppNavbar></AppNavbar>
        <PaymentList title="Payments"></PaymentList>
      </>
  );
}

export default App;
