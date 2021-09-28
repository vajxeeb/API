
const xlsx = require('xlsx')
const dbcon = require('../dbconfig/dbconfig')

exports.createtotal_win = async (req, res) => {

    try {

        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        //....path of excel file.............
        let path = __basedir + "/" + req.file.filename;
        let workbook = xlsx.readFile(path)
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
        //valaible for conatain lottery number value
        const columnA_Id = [];

        const columnH_Pn1 = [];
        const columnI_Pn2 = [];
        const columnJ_Pn3 = [];
        const columnK_Pn4 = [];
        const columnL_Pn5 = [];
        const columnM_Pn6 = [];

        //push lottery number to array
        for (let z in worksheet) {

            //get id
            if (z.toString()[0] === 'B') {
                columnA_Id.push(worksheet[z].v);
            }

            //Total win
            if (z.toString()[0] === 'J') {
                columnH_Pn1.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'K') {
                columnI_Pn2.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'L') {
                columnJ_Pn3.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'M') {
                columnK_Pn4.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'N') {
                columnL_Pn5.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'O') {
                columnM_Pn6.push(worksheet[z].v);
            }
        }

        //delete title and subtitle
        columnA_Id.splice(0, 2)
        columnA_Id.splice(columnA_Id.length - 2, 2)

        columnH_Pn1.splice(0, 1)
        columnH_Pn1.splice(columnH_Pn1.length - 1, 1)

        columnI_Pn2.splice(0, 1)
        columnI_Pn2.splice(columnI_Pn2.length - 1, 1)

        columnJ_Pn3.splice(0, 1)
        columnJ_Pn3.splice(columnJ_Pn3.length - 1, 1)

        columnK_Pn4.splice(0, 1)
        columnK_Pn4.splice(columnK_Pn4.length - 1, 1)

        columnL_Pn5.splice(0, 1)
        columnL_Pn5.splice(columnL_Pn5.length - 1, 1)

        columnM_Pn6.splice(0, 1)
        columnM_Pn6.splice(columnM_Pn6.length - 1, 1)

        const { win_out, installment_max_id, installment_max_idpass1 } = req.body
        //chcek installment

        dbcon.query(`select installment from tbinstallment where installment=?`, [installment_value], (error, result) => {
            if (error) res.send("Error to query installment")

            if (result === undefined || result.length == 0) {

                dbcon.query(`insert into tbinstallment (installment) VALUES (?)`, [installment_value], (error) => {

                    if (error) res.send("Error create installment");
                })

                //check values
                if (!win_nout) {
                    return res.status(400).send({ error: true, message: "Please provide number_out or installment_id" })
                }
                //check

                for (let i = 0; i < columnA_Id.length; i++) {

                    const win_total = columnH_Pn1[i] + columnI_Pn2[i] + columnJ_Pn3[i] + columnK_Pn4[i] + columnL_Pn5[i] +columnM_Pn6[i]
                    dbcon.query(`select installment_id, lottery_id from tbwin where installment_id =?  AND lottery_id=?`,
                        [installment_max_idpass1, columnA_Id[i]], (error, result) => {

                            if (error) res.send("Error in check installment and lottery id11")

                            if (result === undefined || result.length == 0) {

                                //create

                                dbcon.query(`insert into tbwin (lottery_id,installment_id,win_n1,win_n2,
                                    win_n3,win_n4,win_n5,win_n6,win_total,win_nout,win_date)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                    [columnA_Id[i], 25, columnH_Pn1[i], columnI_Pn2[i],
                                    columnJ_Pn3[i], columnK_Pn4[i], columnL_Pn5[i], columnM_Pn6[i],win_total, win_out, converted_date]
                                    , (error) => {
                                        if(error){
                                            res.send("Error to create total_win");
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
                //get max id
                dbcon.query(`select max(installment_id) from tbinstallment where installment =?`, [installment_value], (error, result) => {
                    if (error) res.send("Error query maxid");
                })

                //check values
                if (!win_nout) {
                    return res.status(400).send({ error: true, message: "Please provide number_out or installment_id" })
                }

                //check
                for (let i = 0; i < columnA_Id.length; i++) {

                    const win_total = columnH_Pn1[i] + columnI_Pn2[i] + columnJ_Pn3[i] + columnK_Pn4[i] + columnL_Pn5[i] +columnM_Pn6[i]
                    dbcon.query(`select installment_id, lottery_id from tbwin where installment_id =?  AND lottery_id=?`,
                        [5, columnA_Id[i]], (error, result) => {

                            if (error) res.send("Error in check installment and lottery id 22")
                            
                            if (result === undefined || result.length == 0) {

                                //create

                                dbcon.query(`insert into tbwin (lottery_id,installment_id,win_n1,win_n2,
                                    win_n3,win_n4,win_n5,win_n6,win_total,win_nout,win_date)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                    [columnA_Id[i], 25, columnH_Pn1[i], columnI_Pn2[i],
                                    columnJ_Pn3[i], columnK_Pn4[i], columnL_Pn5[i], columnM_Pn6[i],win_total,win_out,converted_date]
                                    , (error) => {
                                        if(error){
                                            res.send("Error to create total_win");
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
        console.log(error);
        res.status(500).send({ message: "Could not create file: " + req.file.orginalfile })
    }
}
