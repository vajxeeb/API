const dbCon = require("../dbconfig/dbconfig");

//move lottery


exports.move_lottery = (req, res) => {


    const { lottery_id, unit_id } = req.body

    if (!lottery_id || !unit_id) {
        return res.status(400).send({ error: true, message: "Please provide lottery_id or unit_id." })
    }

    try {
        dbCon.query(`Update tblottery SET unit_id = ? WHERE lottery_id=?`, [unit_id, lottery_id], (error, results) => {

            try {
                if (error) res.send("Error for move lottery")

                else {
                    res.send({ error: false, data: results, message: "Moved." })
                }
            } catch (ex) {
                console.log("error: " + ex.message)
            }
        })
    } catch (ex) {
        console.error("error" + ex.message)
    }
}