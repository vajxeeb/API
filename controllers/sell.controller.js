
const xlsx = require('xlsx')
const dbcon = require('../dbconfig/dbconfig')



exports.createtotal_sell = async (req, res) => {
    try {

        if (req.file == undefined) {

            return res.status(400).send("Please upload an excel file!");
        }
        //....path of excel file.............
        let path = __basedir + "/" + req.file.filename;
        let workbook = xlsx.readFile(path);
        let WSH = workbook.SheetNames[0]
        let worksheet = workbook.Sheets[WSH];

        const installment_cell = 'D1';
        const date_cell = 'F1';

        //// ........get date and installment.........
        const desired_cell_installment = worksheet[installment_cell];
        const installment_value = (desired_cell_installment ? desired_cell_installment.v : undefined);
        const desired_cell_date = worksheet[date_cell];
        const date_value = (desired_cell_date ? desired_cell_date.v : undefined);

        //convert date from excel to js
        var date1 = new Date(Math. round((date_value - (25567 + 1)) * 86400 * 1000));
        var converted_date = date1. toISOString(). split('T')[0];

        const columnA_Id = [];
        const columnB_Sn1 = [];
        const columnC_Sn2 = [];
        const columnD_Sn3 = [];
        const columnE_Sn4 = [];
        const columnF_Sn5 = [];
        const columnG_Sn6 = [];


        //push lottery number to array
        for (let z in worksheet) {

            //get id
            if (z.toString()[0] === 'B') {
                columnA_Id.push(worksheet[z].v);
            }
            //Total sells
            if (z.toString()[0] === 'C') {
                columnB_Sn1.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'D') {
                columnC_Sn2.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'E') {
                columnD_Sn3.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'F') {
                columnE_Sn4.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'G') {
                columnF_Sn5.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'H') {
                columnG_Sn6.push(worksheet[z].v);

            }
        }

        //delete title and subtitle
        columnA_Id.splice(0, 2)
        columnA_Id.splice(columnA_Id.length - 2, 2)

        columnB_Sn1.splice(0, 2)
        columnB_Sn1.splice(columnB_Sn1.length - 2, 2)

        columnC_Sn2.splice(0, 2)
        columnC_Sn2.splice(columnC_Sn2.length - 1, 1)

        columnD_Sn3.splice(0, 2)
        columnD_Sn3.splice(columnD_Sn3.length - 1, 1)

        columnE_Sn4.splice(0, 2)
        columnE_Sn4.splice(columnE_Sn4.length - 1, 1)


        columnF_Sn5.splice(0, 1)
        columnF_Sn5.splice(columnF_Sn5.length - 1, 1)

        columnG_Sn6.splice(0, 1)
        columnG_Sn6.splice(columnG_Sn6.length - 1, 1)

        const { installment_max_id, installment_max_idpass1 } = req.body

        //chcek installment  
        dbcon.query(`select installment from tbinstallment where installment=?`, [installment_value], (error, result) => {
            if (error) res.send("Error to query installment")

            if (result === undefined || result.length == 0) {

                dbcon.query(`insert into tbinstallment (installment) VALUES (?)`, [installment_value], (error, result) => {

                    if (error) res.send("Error create installment");

                })

                for (let i = 0; i < columnA_Id.length; i++) {

                    const sell_total = columnB_Sn1[i] + columnC_Sn2[i] + columnD_Sn3[i] + columnE_Sn4[i] + columnF_Sn5[i] + columnG_Sn6[i]

                    dbcon.query(`select installment_id, lottery_id from tbsell where installment_id =?  AND lottery_id=?`,

                        [installment_max_idpass1, columnA_Id[i]], (error, result) => {

                            if (error) res.send("Error in check installment and lottery id")

                            if (result === undefined || result.length == 0) {

                                //create

                                //create
                                dbcon.query(`insert into tbsell (lottery_id,installment_id,sell_n1,sell_n2,
                                    sell_n3,sell_n4,sell_n5,sell_n6,sell_total,sell_date)  VALUES (?,?,?,?,?,?,?,?,?,?)`,
                                    [columnA_Id[i], 25, columnB_Sn1[i], columnC_Sn2[i],
                                    columnD_Sn3[i], columnE_Sn4[i], columnF_Sn5[i], columnG_Sn6[i], sell_total, converted_date]
                                    , (error) => {
                                        if (error) {
                                            res.send("Error to create total_sell");

                                        }
                                    });


                            }
                            else {
                                return res.send({ error: true, data: result, message: "this installment already have. Please choose new field" })
                            }
                        })
                }
            }

            else {

                for (let i = 0; i < columnA_Id.length; i++) {
                    const sell_total = columnB_Sn1[i] + columnC_Sn2[i] + columnD_Sn3[i] + columnE_Sn4[i] + columnF_Sn5[i] + columnG_Sn6[i]
                     const persent = 0
                     if(sell_total>750000) persent = 21
                     else persent = 20
                    //check..
                    dbcon.query(`select installment_id, lottery_id from tbsell where installment_id =?  AND lottery_id=?`,
                        [installment_max_id, columnA_Id[i]], (error, result) => {

                            if (error) {
                                res.send("Error"+error)

                            }
                            if (result === undefined || result.length == 0) {

                                //create
                                dbcon.query(`insert into tbsell (lottery_id,installment_id,sell_n1,sell_n2,
                                     sell_n3,sell_n4,sell_n5,sell_n6,sell_total,sell_date)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                    [columnA_Id[i], 25, columnB_Sn1[i], columnC_Sn2[i],
                                    columnD_Sn3[i], columnE_Sn4[i], columnF_Sn5[i], columnG_Sn6[i], sell_total, converted_date,persent]
                                    , (error) => {
                                        if (error) {
                                            res.send("Error"+error);
                                        }
                                    });

                            }

                            else {

                                return res.send({ error: true, data: result, message: "this installment already have. Please choose new field" })
                            }
                        })   
                }
            }
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

//get sell total where lottery id

exports.get_by_lottery_installment = (req, res) => {
    try {
        const lottery_id = req.params.lottery_id
        const installment = req.params.installment
        const brance_id = req.params.brance_id
        const unit_id = req.params.unit_id
        dbcon.query(`
        select sell_total 
from
tbinstallment inner join tbsell
ON tbinstallment.installment_id = tbsell.installment_id
inner join tblottery on tbsell.lottery_id
= tblottery.lottery_id
inner join tbunit ON tblottery.unit_id = tbunit.unit_id
inner join tbbrance ON tbunit.brance_id = tbbrance.brance_id
where tbbrance.brance_id=? AND tbunit.unit_id=? AND
tblottery.lottery_id=? AND installment = ?;
        `, [brance_id, unit_id, lottery_id, installment], (error, data) => {

            if (error) res.send("Error" + error)

            return res.send({ data: data, message: "Success" })
        })

    } catch (error) {

    }
}

//get sell total by installment and unit

exports.get_by_installment_unit = (req, res) => {

    try {
        const installment = req.params.installment
        const brance_id = req.params.brance_id
        const unit = req.params.unit
        dbcon.query(`
select
tblottery.lottery_id,tbsell.sell_total
from tbinstallment inner join tbsell
ON tbinstallment.installment_id = tbsell.installment_id
inner join tblottery on tbsell.lottery_id
= tblottery.lottery_id
inner join tbunit ON tblottery.unit_id = tbunit.unit_id
inner join tbbrance ON tbunit.brance_id = tbbrance.brance_id
where tbbrance.brance_id=? AND tbunit.unit=? AND
tbinstallment.installment = ?
`, [brance_id, unit, installment],(error,data) =>{

    if(error) res.send("Error"+error)

    res.send({data:data,message:"Success"})
})
    } catch (error) {
        console.log(error)

        return res.send({ message: "Wrong" })
    }
}