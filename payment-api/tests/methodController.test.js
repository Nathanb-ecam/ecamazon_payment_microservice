const {process_payment_method_input} = require('../utils/utils.js');
// test('adds 1 + 2 to equal 3', () => {
//     expect(1 + 2).toBe(3);
//   });

test('process_payment_method_inputs', () => {
    let body = {
        "type":"VISA",
        "cardNumber":"1234 5678 8901 2343",
        "threeDigitCode":"333",
        "user_id":"14"
    }
    const [areInputsValid,inputErrMessages] = process_payment_method_input(body)
    expect(areInputsValid).toBe(true);
    expect(inputErrMessages).toHaveLength(0);
  });

  
test('process_payment_method_inputs', () => {
    let body = {
        "type":"VISA",
        "cardNumber":"1234 5678 8901 234",
        "threeDigitCode":"33",
        "user_id":"14"
    }
    const [areInputsValid,inputErrMessages] = process_payment_method_input(body)
    expect(areInputsValid).toBe(false);
    expect(inputErrMessages).toHaveLength(2);
  });


  