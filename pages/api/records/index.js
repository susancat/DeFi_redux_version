import { connect } from '../../../connection/dbconnection';
import Record from "../../../models/record";

export default async function handler(req, res) {
  await connect();//if put this inside the try/catch will be much slower

  if (req.method === 'GET') { 
    try {
      const account = req.query.account;
      console.log(account)
      const fetchBalances = await Record.findOne({account: account}).exec();
      res.status(200).json(fetchBalances);
    } catch(err) {
      res.status(500).json(err);
    }
  } else if(req.method === 'POST') { 
    try{
      const { account, balances  } = req.body;
      const existingAccount = await Record.findOne({account: account}).exec();
      if(existingAccount) {
        await Record.findOneAndUpdate({account: account}, 
          {
            balances: balances
          }, (err, updatedAccount) => {
            if(err) {
              console.log(err);
            } else {
              console.log("updated")
            }
          }
          )
      } else {
        const newRecords = { account, balances }
        await Record.create(newRecords, (err, newly) => {
          if (err) {
              console.log(err)
          }else {
              res.status(200).json(newly + "new record created");
          }
        });
      } 
    } catch (err) {
    res.status(500).json(err);
   }
  } 
}
