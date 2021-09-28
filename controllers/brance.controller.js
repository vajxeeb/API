
const dbcon = require('../dbconfig/dbconfig')

//create brance

exports.createbrance = (req, res) => {

    try {
        const { brance_name, brance_no, brance_address } = req.body;

        dbcon.query(`INSERT INTO tbbrance (brance_name,brance_no,brance_address)
         VALUES (?,?,?)`, [brance_name, brance_no, brance_address], (error, result) => {

            if (error) {
                res.send("You have error for create brance")
            }
            else {
                res.send(result)
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get brance

exports.getbrance = (req, res) => {

    try {
        dbcon.query(`SELECT * FROM tbbrance`, (error, result) => {

            if (error) {
                res.send("You have error to select brance")
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }

}

//update brance
exports.updatebrance = (req, res) => {

    try {
        const { brance_id, brance_name, brance_no, brance_address } = req.body;
     const data =   dbcon.query(`UPDATE tbbrance SET brance_name=?,brance_no=?,
    brance_address=? where brance_id = ?`
            , [brance_name, brance_no, brance_address, brance_id], (error, result) => {

                if (error) {
                    res.send("Error"+error)
                }
                else {
                    res.send({ data: result, message: "Brance have updated" })
                }
            });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//delete brance

exports.detelebrance = (req, res) => {

    try {
        const brance_id = req.params.brance_id

        if (!brance_id) {
            return res.send(400).send({ error: false, message: "Please provide brance_id." })
        }

        dbcon.query(`DELETE FROM tbbrance WHERE brance_id = ?`, [brance_id], (error, result) => {

            if (error) {
                res.send("You have error to delete brance")
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}