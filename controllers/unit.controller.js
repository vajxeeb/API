
const dbcon = require('../dbconfig/dbconfig')



//create unit
exports.create = (req,res)=>{

    try{

        const {brance_id,unit,unit_own} = req.body

        if(!brance_id||!unit||!unit_own)
        {
            return res.status(400).send({message:"Please provide unit info"})
        }

        dbcon.query(`insert into tbunit(brance_id,unit,unit_own)
        values (?,?,?)`,[brance_id,unit,unit_own],(error,result)=>{

            if(error) res.send("Error for create")

            return res.send({data:result,message:"Created"})
        })

    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }
}


//update unit

exports.update = (req,res)=>{
    try{

        const {brance_id,unit,unit_own,unit_id} = req.body

        if(!brance_id||!unit||!unit_own||!unit_id)
        {
            return res.status(400).send({message:"Please provide unit info"})
        }

        dbcon.query(`update tbunit set brance_id=?,unit=?,unit_own=? where unit_id=?`,
        [brance_id,unit,unit_own,unit_id],(error,result)=>{

            if(error) res.send("Error for update")

            return res.send({data:result,message:"Updated"})
        })

    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }

}
//delete 
exports.delete = (req,res)=>{

    try
    {
        const unit_id = params.body.unit_id

        if(!unit_id)
        {
            return res.status(400).send({message:"Please provide unit_id"})
        }
        dbcon.query(`delete from tbunit where unit_id =?`,[unit_id],(error,result)=>{

            if(error) res.send("Error for delete")

            let message = ""
            if(result.affectedRows===0){
                message = "Not found data for delete"
            }
            else
            {
                message = "Deleted"
            }

            return res.send({data:result,message:message})
        })
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"something wrong"})
    }
    

}
//get
exports.get = (req,res)=>{

    try
    {
        const brance_id = req.params.brance_id
        dbcon.query(`select * from vunit where brance_id =? `,[brance_id],(error,result)=>{

            if(error) throw error//res.send("Error for delete")

            let message = ""
            if(result.affectedRows===0 || result.length ==0){
                message = "Empty"
            }
            else
            {
                message = "Found data"
            }

            return res.send({data:result,message:message})
        })
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"something wrong"})
    }
}
//get


//get where cause
exports.get_by_id = (req,res)=>{
const brance_id = req.params.brance_id
const unit_id =req.params.unit_id
    try
    {
        if(!unit_id)
        {
            return res.status(400).send({message:"Please provide unit id"})
        }
        dbcon.query(`select * from vunit where brance_id=? and unit_id= ?`,[brance_id,unit_id],(error,result)=>{

            if(error) res.send("Error for select")

            let message = ""
            if(result.affectedRows===0 || result.length ==0){
                message = "Empty"
            }
            else
            {
                message = "Found data"
            }

            return res.send({data:result,message:message})
        })
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"something wrong"})
    }
}
