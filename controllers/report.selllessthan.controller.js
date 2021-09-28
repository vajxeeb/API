
const dbcon = require('../dbconfig/dbconfig')

//get all lottery that get less than 150000

exports.get_all_in_installment = (req, res) => {

    try {
        const installment = req.params.installment
const brance_id = req.params.brance_id
        dbcon.query(`
SELECT 
tbinstallment.installment,tbsell.sell_total,
tbwin.win_total,tbwin.win_nout,tblottery.lottery_id,
tblottery.seller_id
From
tbinstallment inner join tbsell 
on tbinstallment.installment_id = tbsell.installment_id
 inner join tbwin on tbinstallment.installment_id = tbwin.installment_id
 inner join tblottery on tbwin.lottery_id =
 tblottery.lottery_id inner join tbunit 
 on tblottery.unit_id =tbunit.unit_id inner join tbbrance
 on tbunit.brance_id = tbbrance.brance_id 
 where sell_total>150000 and tbbrance.brance_id = ? and
 tbinstallment.installment = ? 
`, [brance_id,installment], (error, data) => {

            if (error) res.send("Error" + error)

            return res.send({ data: data, message: "Success" })
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}

//get sell less than 150000 in installment by unit
exports.get_all_in_installment_by_unit = (req, res) => {

    try {
        const installment = req.params.installment
        const unit = req.params.unit
        const brance_id = req.params.brance_id
        dbcon.query(`
SELECT 
tbinstallment.installment,tbsell.sell_total,
tbwin.win_total,tbwin.win_nout,tblottery.lottery_id,
tblottery.seller_id
From
tbinstallment inner join tbsell 
on tbinstallment.installment_id = tbsell.installment_id
 inner join tbwin on tbinstallment.installment_id = tbwin.installment_id
 inner join tblottery on tbwin.lottery_id =
 tblottery.lottery_id inner join tbunit 
 on tblottery.unit_id =tbunit.unit_id inner join tbbrance
 on tbunit.brance_id = tbbrance.brance_id 
 where sell_total>150000 and tbbrance.brance_id = ? and
 tbinstallment.installment = ? and tbunit.unit= ?
`, [brance_id,installment, unit], (error, data) => {

            if (error) res.send("Error" + error)

            return res.send({ data: data, message: "Success" })
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}