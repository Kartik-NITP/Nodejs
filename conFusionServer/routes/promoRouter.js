const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const cors = require('./cors');
const mongoose = require('mongoose');
const Promo = require('../models/promotions');
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promo.find({})
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Promo.create(req.body)
    .then((promo)=>{
        console.log('Promotions Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Promo.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
promoRouter.route('/:promotionId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promo.findById(req.params.promotionId)
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promotionId);
})
.put(cors.corsWithOptions,(req, res, next) => {
  Promo.findByIdAndUpdate(req.params.promotionId)
  .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Promo.findByIdAndRemove(req.params.promotionId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promoRouter;