
const dbcon = require('../dbconfig/dbconfig')

//get lottery sell in each installment by unit or all unit

exports.get = (req,res)=>{
    try
    {
        const {brance_id,installment,unit}=req.params
dbcon.query(`
SELECT 
tbinstallment.installment,
tblottery.lottery_id,tblottery.lottery_name,
tblottery.lottery_printname,tblottery.lottery_refernumber,
tblottery.lottery_status,tbunit.unit,
tbbrance.brance_id,tbbrance.brance_name
FROM
tbinstallment inner join tbsell
on tbinstallment.installment_id =tbsell.installment_id
inner join tblottery on
tbsell.lottery_id = tblottery.lottery_id
inner join tbunit on
tblottery.unit_id = tbunit.unit_id
inner join tbbrance on
tbunit.brance_id = tbbrance.brance_id
where tbbrance.brance_id = ? AND tbsell.sell_total>0 
AND tbinstallment.installment=? AND tbunit.unit=?
 `,[brance_id,installment,unit],(error,data)=>{

    if(error) res.send("Error"+error)
    res.send({data:data,message:"Success"})
 })
    }catch(error)
    {
        console.log(error)
        return res.send({message:"Wrong"})
    }
}