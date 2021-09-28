
const dbcon = require('../dbconfig/dbconfig')


//create company

exports.createcompany = (req,res) =>{

    try{
    const {company_name,company_street,company_add_village,company_add_district,
          company_add_province,company_phone,company_email,company_fax} = req.body;
    
    dbcon.query(`INSERT INTO tbcompany (company_name,company_street,company_add_village,
        company_add_district,company_add_province,company_phone,company_email,company_fax)
        VALUES (?,?,?,?,?,?,?,?)`,[company_name,company_street,company_add_village,company_add_district,
        company_add_province,company_phone,company_email,company_fax],(error,result) => {
        
            if(error)
            {
               res.send("You have erro for create company")
            }
            return res.send({error:false,data:result,message:"created."})
        });
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }
}

exports.getcompany = (req,res) =>{
   
    try{
    dbcon.query(`SELECT * FROM tbcompany`,(error,result) => {
        
            if(error)
            {
                res.send("You have error for select company")
            }
            else
            {

             res.send(result)  

            }
        });
    }catch(error)
    {
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }
}

exports.updatecompany = (req,res) =>{

    try{
    const {company_id,company_name,company_street,company_add_village,company_add_district,
          company_add_province,company_phone,company_email,company_fax} = req.body;
    
         
    dbcon.query(`UPDATE tbcompany SET company_name=?,company_street=?,company_add_village=?,
        company_add_district=?,company_add_province=?,company_phone=?,company_email=?,company_fax=? WHERE company_id = ?`,[company_name,company_street,company_add_village,company_add_district,
        company_add_province,company_phone,company_email,company_fax,company_id],(error,result) => {
        
            if(error)
            {
               res.send("You have error for update company")
            }
           
            return res.send({error:false,data:result,message:"updated."})
        });
    }catch(error){
        console.log(error)
        return res.status(500).send({message:"Something wrong"})
    }
}