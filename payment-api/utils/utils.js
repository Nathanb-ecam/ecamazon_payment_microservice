exports.process_payment_method_input = function (body){
    valid_inputs = true;
    let inputErrMessages = [];
    for(let input in body){
        let result;
        let regex;
        let requiredType;
        switch(input){
            case 'type':
                regex = /^[a-zA-Z\s]+$/;
                requiredType = "STRING";
                break;
            case 'cardNumber':
                regex = /^(\d{4}\s){3}\d{4}$/;
                requiredType = "16 digit number with spaces. ex : 1234 5678 1234 5678";
                break;
            case 'threeDigitCode':
                regex = /^\d{3}$/;
                requiredType = "3 digit number";
                break;
            case 'user_id':
                regex = /^\d+$/;
                requiredType = "number";
                break;
            default:
                inputErrMessages.push(`Unknown key : ${input}`)
                valid_inputs = false;
                regex = /^\d+$/;
                break;
        }
        if(valid_inputs){
            result = regex.exec(body[input]);
            if(result==null){
                let errString = `${input} must be : ${requiredType}`
                inputErrMessages.push(errString)
            }
        }
    }
    if (inputErrMessages.length != 0){
        valid_inputs = false;
    }
    return [valid_inputs,inputErrMessages];
}