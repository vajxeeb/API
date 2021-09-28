
const dbcon = require('../dbconfig/dbconfig')

//get all sell from num6

exports.get  = (req,res)=>{
    try
    {
        const brance_id = req.params.brance_id
dbcon.query(`
SELECT 
tbinstallment.installment,
tbsell.sell_n6,tbwin.win_nout,tbsell.sell_date,
tblottery.lottery_id,tblottery.seller_id
from tbinstallment inner join tbsell
on tbinstallment.installment_id =tbsell.installment_id
inner join tbwin on tbinstallment.installment_id= tbwin.installment_id
inner join tblottery on tbwin.lottery_id = tblottery.lottery_id
inner join tbunit on tblottery.unit_id = tbunit.unit_id
inner join tbbrance on tbunit.brance_id = tbbrance.brance_id
where tbbrance.brance_id = ?
`,[brance_id],(error,data)=>{

    if(error) res.send("Error"+error)

    return res.send({data:data,message:"Success"})
})
    }catch(error)
    {
        console.log(error)

        return res.status(500).send({message:"Something wrong"})
    }
}