
const { query } = require('express')
const dbcon = require('../dbconfig/dbconfig')


//create installment

exports.createinstallment = (req, res) => {

    try {
        const installment = req.body.installment

        if (!installment) {
            return res.status(400).send({ error: false, message: "Please provide installment." })
        }

        dbcon.query(`INSERT INTO tbinstallment (installment) VALUES (?)`, [installment], (error, result) => {

            if (error) {
                res.send("You have error for create installment")
            }
            return res.send({ data: result, message: "created" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get installment 

exports.getinstallment = (req, res) => {

    try {
        dbcon.query(`SELECT * from tbinstallment`, (error, result) => {

            if (error) res.send("You have error for select installment");

            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}

//update installment 

exports.updateinstallment = (req, res) => {

    try {
        const { installment_id, installment } = req.body

        if (!installment_id || !installment) {
            return res.status(400).send({ error: true, message: "Please provide installment_id and installment." })
        }

        dbcon.query(`Update tbinstallment SET installment = ? WHERE installment_id = ?`, [installment, installment_id], (error, result) => {

            if (error) res.send("You have error for update");

            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }

}

//delete installment

exports.deleteinstallment = (req, res) => {

    try {
        const installment_id = req.body.installment_id

        if (!installment_id) {
            return res.status(400).send({ error: true, message: "Please provide installment." })
        }

        dbcon.query(`delete from tbinstallment where installment_id = ?`, [installment_id], (error, result) => {

            if (error) res.send("You have error for delete");

            return res.send({ data: result, message: "deleted" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//get installment max id

exports.getmaxid = (req, res) => {

    try {
        dbcon.query(`select max(installment_id) from tbinstallment`, (error, result) => {

            if (error) res.send("Error");

            else {

                res.send(result)
            }

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }

}
exports.getmaxid_maxidpass1 = (req, res) => {

    try {
        dbcon.query(`select max(installment_id) as maxid, max(installment_id)+1 as maxidpass1 from tbinstallment`, (error, result) => {

            if (error) res.send("You have error for select maxid")

            else {

                res.send(result)
            }

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}
