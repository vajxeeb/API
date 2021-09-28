
const dbcon = require('../dbconfig/dbconfig')

//report all in installment
exports.get_all_in_installment = (req,res)=>{
    try
    {
     const brance_id  = req.params.brance_id
     const installment = req.params.installment

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
where tbbrance.brance_id = ? AND tbsell.sell_total=0 
AND tbinstallment.installment=?
        `,[brance_id,installment],(error,data)=>{
            if(error) res.send("Error"+error)

            return res.send({data:data,message:"Success"})
        })
    }catch(error)
    {
        console.log(error)
        return res.send({message:"Something wrong"})
    }
}

//report all in installment by unit
exports.get_in_installment_by_unit = (req,res)=>{
    try
    {
     const brance_id = req.params.brance_id
     const installment = req.params.installment
     const unit = req.params.unit

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
        where tbbrance.brance_id = ? AND tbsell.sell_total=0 
        AND tbinstallment.installment=? AND tbunit.unit=?        
        `,[brance_id,installment,unit],(error,data)=>{
            if(error) res.send("Error"+error)

            return res.send({data:data,message:"Success"})
        })
    }catch(error)
    {
        console.log(error)
        return res.send({message:"Something wrong"})
    }
}