const express = require('express')
const app = express();

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const dbCon = require('./dbconfig/dbconfig')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//chect connect.....
dbCon.connect(function (err) {
  if (err) {
    console.log("connect faild");
  }
  if (!err) {
    console.log("connected");
  }
});



const lottery = require('./routes/lottery.route')
const company = require('./routes/company.route')
const brance = require('./routes/brance.route')
const installment = require('./routes/installment.route')
const lottery_out = require('./routes/lottery_out.route');
const move_lottery = require('./routes/move_lottery.route')
const win = require('./routes/win.route')
const sell = require('./routes/sell.route');
const seller = require('./routes/seller.route')
const persent = require('./routes/persent.route')
const thork = require('./routes/thork.route')
const unit = require('./routes/unit.route')
const user = require('./routes/user.route')
const report_lottery_free = require('./routes/report_lottery_free.route')
const report_lottery_notsell = require('./routes/report.lottery.not.sell.route')
const selllessthan = require('./routes/report.selllessthan.route')
const report_num6 = require('./routes/report.num6.route')
const report_lottery_sell = require('./routes/report_lottery_sell.route');
const swaggerJSDoc = require('swagger-jsdoc');
global.__basedir = __dirname + "/";

app.use('/', lottery)
app.use('/', company)
app.use('/', brance)
app.use('/', installment)
app.use('/', lottery_out)
app.use('/', move_lottery)
app.use('/', win)
app.use('/', sell)
app.use('/', seller)
app.use('/', persent)
app.use('/', thork)
app.use('/', unit)
app.use('/', user)
app.use('/', report_lottery_free)
app.use('/', report_lottery_notsell)
app.use('/', selllessthan)
app.use('/', report_num6)
app.use('/', report_lottery_sell)

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Excel_Finance_API"
    },
  servers: [
    {
      url: "http://localhost:8000"
    }
  ],
},
 apis: ['./routes/*.js']
  //apis: ['server.js']
}

const swaggerDocs = swaggerJSDoc(option)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/', (req, res) => {
  
  dbCon.query(`select max(installment_id) as mid from tbinstallment`,(error,data)=>{

  //res.send(data)
 })
})

console.log("Hello Git")

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server Running on port ${port}`))
module.exports = app;
