const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');
const Leader = require('../models/leaders');
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Leader.find({})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Leader.create(req.body)
    .then((leader)=>{
        console.log('Promotions Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Leader.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Leader.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put(cors.corsWithOptions,(req, res, next) => {
  Leader.findByIdAndUpdate(req.params.leaderId)
  .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = leaderRouter;