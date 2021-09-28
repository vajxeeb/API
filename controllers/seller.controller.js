
const dbcon = require('../dbconfig/dbconfig')


//create seller or register  for seller

exports.createseller = (req, res) => {
    try {

        const {seller_id,seller_name, seller_age,seller_job, seller_phone, seller_address} = req.body
       
        const lottery_id = req.params.lottery_id

        if (!seller_name || !seller_phone) {
            return res.status(400).send({ message: "Please check a seller info" })
        }

        dbcon.query(`insert into tbseller(seller_name,seller_age,
                seller_job,seller_phone,seller_address)
                VALUES(?,?,?,?,?)`, [seller_name, seller_age,
            seller_job, seller_phone, seller_address], (error, result) => {

                if (error) res.send("You have error to create seller")
                else
                {
                    
                    dbcon.query(`Update tblottery set lottery_status = 'Not free',seller_id =? where lottery_id=?`,[seller_id,lottery_id],
                    (error,data)=>{
                        if(error) return res.status(400).send({message:"Error"})
                    })
                }
                return res.send({data:result, message: "seller have created" })

            })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something wrong" })
    }

}
//update seller or register  for seller

exports.update = (req, res) => {
    try {
        const {seller_name, seller_age,
            seller_job, seller_phone, seller_address,seller_id} = req.body

        if (!seller_name || !seller_phone) {
            return res.status(400).send({ message: "Please check a seller info" })
        }

        dbcon.query(`update tbseller SET persent_id=?,seller_name=?,seller_age=?,
                seller_job=?,seller_phone=?,seller_address=? where seller_id =?,
                VALUES(?,?,?,?,?,?)`, [seller_name, seller_age,
            seller_job, seller_phone, seller_address,seller_id], (error, result) => {

                if (error) res.send("You have error to create seller")

                return res.send({data:result, message: "seller have created" })

            })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something wrong" })
    }

}
//delete seller or register info 

exports.deleteseller = (req, res) => {

    try {
        const seller_id = req.params.seller_id

        if (!seller_id) {
            return res.status(400).send({ message: "Please provide a seller_id" })
        }

        dbcon.query(`delete from tbseller where seller_id=?`, [seller_id], (error, result) => {

            if (error) res.send("You have error when delete seller")

            return res.send({ data:result,message: "Seller have deleted" })
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something wrong" })
    }

}

//get all seller 

exports.getallseller = (req, res) => {
    try {
        dbcon.query(`select * from tbseller`, (error, result) => {

            if (error) res.send("You have error to select seller")

            return res.send(result)
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}