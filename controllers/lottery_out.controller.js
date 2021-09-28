
const dbcon = require('../dbconfig/dbconfig')

//log lottery out

exports.log_lottery_out = (req,res) =>{

    try{
    const lottery_id= req.params.lottery_id

    if(!lottery_id)
    {
        return res.status(400).send({error:true,message:"Please provide lottery_id."})
    }

    dbcon.query(`Update tblottery Set lottery_status ='Empty',seller_id = 0 Where lottery_id = ? `,[lottery_id],(error,results) =>{

        if(error) res.send("Error for log out lottery");

        else
        {
            res.send({error:false,data:results,message:"logouted"})
        }
    })
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }
}