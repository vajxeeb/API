
const { threadId } = require('../dbconfig/dbconfig')
const dbcon = require('../dbconfig/dbconfig')


//create lottery...
exports.createlottery = (req, res) => {

    try {
        const { lottery_id, lottery_name, lottery_printname, lottery_refernumber, lottery_status,unit_id } = req.body

        if (!lottery_id) {
            return res.status(400).send({ error: true, message: "Please provide a lottery_id..." })
        }

        dbcon.query(`INSERT INTO tblottery VALUES (?,?,?,?,?,?,?)`,
            [lottery_id, lottery_name, lottery_printname, lottery_refernumber, lottery_status, unit_id,0], (error, data) => {

                if (error) {

                    res.send("Error for create")
                }
                else {

                    res.send(data)
                }
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//delete lottery....

exports.deletelottery = (req, res) => {

    try {
        const lottery_id = req.params.lottery_id

        if (!lottery_id) {
            return res.status(400).send({ error: true, message: "Please provide lottery_id" })
        }

        dbcon.query(`delete from tblottery  where lottery_id = ?`, [lottery_id],
            (error, results) => {

                if (error) {
                    res.send("Error for delete");
                }

                let message = "";

                if (results.affectedRows === 0) {
                    message = "Not found data to delete..."
                }
                else {
                    message = "data deleted"
                }

                return res.send({ error: true, data: results, message: message })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//update lottery

exports.updatelottery =  (req, res) => {

    try {
        const { lottery_name, lottery_printname, lottery_refernumber, lottery_status, unit_id, lottery_id } = req.body

        if (!lottery_id) {

            return res.status(400).send({ error: true, message: "Please provide lottery_id" })
        }

         dbcon.query(`UPDATE tblottery  SET lottery_name=?,lottery_printname=?,
                lottery_refernumber=?,lottery_status=?,unit_id=? WHERE lottery_id=?`,
            [lottery_name, lottery_printname, lottery_refernumber, lottery_status, unit_id, lottery_id],
            (error, results) => {
                if (error) {
                    res.send("Error for update");
                }
                let message = ""
                if (results.changeRows === 0) {
                    message = "lottery not found"
                }
                else {
                    message = "lottery updated"
                }

                return res.send({ error: true, data: results, message: message })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get lottery

exports.getlottery = (req, res) => {
    try {
        dbcon.query(`select * from tblottery `, (error, results) => {

            if (error) {
                res.send("Error for select ");
            }

            else {
                res.send(results)
            }
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}
exports.get_by_id = (req, res) => {
    try {
        const lottery_id = req.params.lottery_id
        dbcon.query(`select * from tblottery where lottery_id=? `, [lottery_id], (error, results) => {

            if (error) {
                res.send("Error for select ");
            }

            else {
                res.send(results)
            }
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}
//update seller id

exports.updateseller_id = (req, res) => {

    try {
        const { lottery_id, seller_id } = req.body

        if (!lottery_id || !seller_id) {
            return res.status(400).send({ error: true, message: "Please provide lottery_id or seller_id." })
        }

        dbcon.query(`Update tblottery SET seller_id =? where lottery_id=?`, [seller_id, lottery_id], (error, results) => {

            if (error) res.send("Error for update")

            else {
                res.send({ error: false, data: results, message: "updated." })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ messsage: "Something wrong" })
    }
}

//get lottery free

exports.getlottery_free = (req, res) => {

    try {
        dbcon.query(`select * from tblottery where seller_id=0`, (error, results) => {

            if (error) res.send("Error for select");

            else {
                res.send(results)
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get by unit
exports.get_by_unit = (req, res) => {
    try {
        const unit_id = req.params.unit_id
        dbcon.query(`select lottery_id from tblottery where unit_id =?`
            , [unit_id], (error, data) => {
                if (error) res.send("Error" + error)

                res.send({ data: data, message: "Success" })
            })
    }
    catch
    {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}