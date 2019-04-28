const { validationResult } = require('express-validator/check');
const db = require('../utils/database');
const oracledb = require('oracledb')
const Post = require('../models/post');
const moment = require('moment');
 exports.getPosts = async (req, res, next) => {
  console.log(req.body.cusip);
 const binds = {};
  const cusip = "'"+req.body.cusip+"'";
    // For a complete list of options see the documentation.
    const options = {
      outFormat: oracledb.OBJECT   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };
   await db.conn().then((conn) => {
    conn.execute('select * from cusip where cusip = '+cusip+'',binds,options).then((result) => {
      console.log(result);
        const rows = result.rows;
        console.log(rows);
        res.status(200).json({prodcuts:rows});  
      }).catch((err) => {
        console.log(err);
        res.status(500).json({'message': 'Server Error'})
      });
   },() => {});
  // // await db.xec.execute('select * from cusip where cusip = '+req.body.cusip+'').then((result) => {
  //   [rows,fieldData] = result;
  //   console.log(rows)
  //   res.status(200).json({prodcuts:rows});
  // }).catch((err) => {
  //   console.log(err);
  // });
 
};

exports.getByDate = async (req, res, next) => {
  console.log('date',moment(req.body.fromDate).format('YYYY-MM-DD'),moment(req.body.toDate).format('YYYY-MM-DD'));
 const fromDate = "'"+moment(req.body.fromDate).format('YYYY-MM-DD').toString()+"'"; 
 const toDate = "'"+moment(req.body.toDate).format('YYYY-MM-DD').toString()+"'";
 const cusipType = "'"+req.body.type+"'"; 
 
 let query = '';
 const binds = {};
 const options = {
  outFormat: oracledb.OBJECT   // query result format
  // extendedMetaData: true,   // get extra metadata
  // fetchArraySize: 100       // internal buffer allocation size for tuning
};
 if(req.body.type.toLowerCase() !== 'all') {
 query = 'select * from cusipmaturity where maturityDate  between '+fromDate+' and '+toDate+' and type = '+cusipType+''; 
 } else {
   query = "select * from cusipmaturity";
 } 
 await db.conn().then((conn) => {
  conn.execute(query,binds,options).then((result) => {
    console.log(result);
      const rows = result.rows;
      console.log(rows);
      res.status(200).json({prodcuts:rows});  
    }).catch((err) => {
      console.log(err);
      res.status(500).json({'message': 'Server Error'})
    });
 },() => {});
};
