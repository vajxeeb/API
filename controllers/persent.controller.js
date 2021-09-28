
const dbcon = require('../dbconfig/dbconfig')


//create persent 

exports.createpersent = (req, res) => {

    try {
        const { persent_id,persent_type, persent } = req.body

        if (!persent_id||!persent_type || !persent) {
            return res.status(400).send({ error: true, message: "Please provide persent info." })
        }

        dbcon.query(`INSERT INTO tbpersent(persent_id,persent_type,persent) VALUES (?,?,?)`, [persent_id,persent_type, persent], (error, data) => {

            if (error) res.send("You have error to create persent");

            return res.send({ data:data,message: "The persent have created" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }

}
//update persent

exports.updatepersent = (req, res) => {

    try {
        const { persent_type, persent,persent_id,  } = req.body

        if (!persent_type || !persent_id || !persent) {
            return res.status(400).send({ error: true, message: "Please provide persent_id and persent." })
        }

        dbcon.query(`UPDATE tbpersent SET persent_type=?,persent=? WHERE persent_id = ?`, [persent_type, persent, persent_id], (error, result) => {

            if (error) res.send("You have error for update persent")
            let message = ""
            if (result.changeRows === 0) {
                message = "Persent not found"
            }
            else {
                message = "Persent have updated"
            }
            return res.send({ data: result, message: message })
        })
    } catch (error) {
        console.log(error)
        return res.send({ message: "Something wrong" })
    }

}

//get persent 

exports.getallpersent = (req, res) => {

    try {
        dbcon.query(`select * from tbpersent`, (error, result) => {

            if (error) res.send("You have error for select persent")

            return res.send(result)
        })
    } catch (error) {

        console.log(error)

        return res.send({ message: "Something wrong" })
    }
}

//delete persent
exports.deletepersent = (req, res) => {

    try {
        const persent_id = req.body.params.persent_id

        if (!persent) {
            return req.status(400).send({ message: "Please provide a persent id" })
        }

        dbcon.query(`delete from tbpersent  where persent_id=?`, [persent_id], (error, result) => {

            if (error) res.send("You have error to delete persent")

            let message = ""
            if (result.affectedRows === 0) {
                message = "Not found data for delete"
            }
            else {
                message = "Persent have deleted"
            }
            return res.send({ data: result, message: message })
        })


    } catch (error) {
        consolel.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}