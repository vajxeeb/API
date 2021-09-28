const dbcon = require('../dbconfig/dbconfig')


//show report lottery free

exports.reportall = (req, res) => {

    try {
        
        const brance_id = req.params.brance_id
        dbcon.query(`SELECT tblottery.lottery_id,tblottery.lottery_name,
tblottery.lottery_printname,tblottery.lottery_refernumber,
tblottery.lottery_status,tblottery.unit_id,tbunit.unit,
tbbrance.brance_name
from tblottery  inner join tbunit
on tblottery.unit_id=tbunit.unit_id inner join tbbrance
on tbunit.brance_id = tbbrance.brance_id where tbbrance.brance_id =? and seller_id = 0`,
            [brance_id], (error, data) => {
                if (error) res.send("Error")

                return res.send({ data: data, message: "Sucess" })
            })
    } catch (error)
    {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//show report lottery free

exports.report_by_unit = (req, res) => {

    try {
        const brance_id = req.params.brance_id
        const unit = req.params.unit
        dbcon.query(`SELECT tblottery.lottery_id,tblottery.lottery_name,
tblottery.lottery_printname,tblottery.lottery_refernumber,
tblottery.lottery_status,tblottery.unit_id,tbunit.unit,
tbbrance.brance_name
from tblottery  inner join tbunit
on tblottery.unit_id=tbunit.unit_id inner join tbbrance
on tbunit.brance_id = tbbrance.brance_id where tblottery.seller_id = 0 and 
 tbbrance.brance_id =? and 
 tbunit.unit =?`,
            [brance_id, unit], (error, data) => {
                if (error) res.send("Error")
                return res.send({ data: data, message: "Sucess" })
            })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}
