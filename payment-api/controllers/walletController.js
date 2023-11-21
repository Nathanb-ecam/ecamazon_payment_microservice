// let Wallet = require('../models/walletModel.js')


// exports.listWallet = function (req,res){
//     Wallet.findAll({ attributes: ['wallet_id','wallet']} )
//         .then(data => {
//             // console.log(data.toJSON());
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(500).json({ message: err.message })
//     })
// }


// exports.addWallet = async function(req,res){
//     const {wallet} = req.body;

//     if(user){
//         let wallet = Wallet.build({ wallet:wallet["wallet"],user_id:wallet["user_id"] })
//         // save object in DB
//         await wallet.save()
//             .then(data => res.json({message: "Succesfully added payment method"}))
//             .catch(err => res.status(500).json({ message: err.message }))
//     }
// }




