
const dbcon = require('../dbconfig/dbconfig')
//create thork
exports.create_by_one = (req, res) => {

    try {
        const { lottery_id, installment_id, user_id, thork_date, thork_by_transfer, thork_by_cash} = req.body

        // if (!lottery_id || !installment_id || !user_id || !thork_date || !thork_by_transfer || !thork_by_cash) {
        //     return res.status(400).send({ message: "Please check data" })
        // }
dbcon.query(`select lottery_id, installment_id from tbthork where lottery_id=?
 and installment_id=?`,[lottery_id,installment_id],(error,data)=>{

    if(error) res.send("Error"+error)

    if(data===undefined || data.length ==0)
    {
        dbcon.query(`INSERT INTO tbthork (lottery_id,installment_id,user_id,thork_date,
            thork_by_transfer,thork_by_cash) VALUES(?,?,?,?,?,?)`,
            [lottery_id, installment_id, user_id, thork_date, thork_by_transfer, thork_by_cash], (error, result) => {

                if (error) res.send("You have error for create thork")

                return res.send({ data: result, message: "Thork have created" })
            })
    }
    else
    {
        res.send({data:data,message:"This lottery in this installment already thork"})
    }
 })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}
//create thork


//update 
exports.update_by_one = (req, res) => {

    try {
        const { lottery_id, installment_id, thork_by_transfer, thork_by_cash } = req.body

        if (!lottery_id || !installment_id || !thork_by_transfer || !thork_by_cash) {
            return res.status(400).send({ message: "Please check data" })
        }
        dbcon.query(`Update tbthork SET thork_by_transfer=?,thork_by_cash=? WHERE lottery_id =?
        and installment_id =?`,
            [thork_by_transfer, thork_by_cash, lottery_id, installment_id], (error, result) => {

                if (error) res.send("Error" + error)

                return res.send({ data: result, message: "updated" })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//delete

exports.delete = (req, res) => {
    try {
        const thork_id = req.body.thork_id

        if (!thork_id) {
            return res.status(400).send({ message: "Please provide id" })
        }

        dbcon.query(`Delete from tbthork where thork_id =?`, [thork_id], (error, result) => {
            if (error) res.send("You have error for delete thork")
            let message = ""

            if (result.affectedRows === 0) {
                message = "Not found data for delete"
            }
            else {
                message = "Deleted"
            }
            return res.send({ data: result, message: message })
        })
    } catch (error) {
        console.log(error)
        return res.send({ message: "Something wrong" })
    }

}

//get thork
exports.get = (req, res) => {
    try {
        const brance_id = req.params.brance_id
        dbcon.query(`
select
tblottery.lottery_id,tbseller.seller_name,
tbsell.sell_total,(tbsell.sell_total * tbsell.sell_persent)/100 as persent,
tbsell.sell_total-(tbsell.sell_total * tbsell.sell_persent)/100 as real_thork,
tbthork.thork_by_transfer,
tbthork.thork_by_cash,
(tbthork.thork_by_transfer+tbthork.thork_by_cash) as thork_total,
tbthork.thork_date,
tbthork.thork_id,tbinstallment.installment
from
tbinstallment inner join tbsell 
on tbinstallment.installment_id
=tbsell.installment_id
inner join tblottery
on tbsell.lottery_id = tblottery.lottery_id
inner join tbthork  inner join tbunit
inner join tbseller
on tblottery.lottery_id=tbthork.lottery_id
and tblottery.unit_id = tbunit.unit_id
and tblottery.seller_id = tbseller.seller_id
inner join tbbrance on
tbunit.brance_id = tbbrance.brance_id
WHERE tbbrance.brance_id = ?
`, [brance_id], (error, data) => {

            if (error) res.send("Error" + error)
            return res.send({ data: data, message: "Sucess" })
        })
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
