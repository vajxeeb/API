const dbcon = require('../dbconfig/dbconfig')
const { param } = require('../routes/lottery.route')

//create user

exports.create = (req, res) => {

    try {
        const { user_name, user_phone, permision_id, brance_id,password } = req.body

        if (!user_name || !user_phone || !permision_id || !brance_id||!password) {
            return res.status(400).send({ message: "Please provide user info" })
        }

        dbcon.query(`insert into tbuser(user_name,user_phone,permision_id,brance_id,password) values(?,?,?,?,?)`,
            [user_name, user_phone, permision_id, brance_id,password], (error, result) => {

                if (error) res.send("Error for create")

                return res.send({ data: result, message: "Created" })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

//update user 

exports.update = (req, res) => {
    try {
        const { user_name, user_phone, permision_id, brance_id, user_id,password } = req.body

        if (!user_name || !user_phone || !permision_id || !brance_id || !user_id||!password) {
            return res.status(400).send({ message: "Please provide user info" })
        }

        dbcon.query(`update tbuser set user_name=?,user_phone=?,permision_id=?,brance_id=?,password=? where user_id=?`,
            [user_name, user_phone, permision_id, brance_id,password, user_id], (error, result) => {

                if (error) res.send("Error for update")

                return res.send({ data: result, message: "Updated" })
            })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}
//delete
exports.delete = (req, res) => {
    try {
        const  user_id = req.params.user_id

        if (!user_id) {
            return res.status(400).send({ message: "Please provide user id" })
        }

        dbcon.query(`delete from tbuser where user_id=?`,
            [user_id], (error, result) => {

                if (error) res.send("Error for delete")

                return res.send({ data: result, message: "Deleted" })
            })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}
//get user
exports.get = (req, res) => {
    try {
        
        dbcon.query(`select * from tbuser`,
            (error, result) => {

                if (error) res.send("Error for select")

                return res.send({ data: result, message: "Sucess" })
            })
    } catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Something wrong" })
    }
}




