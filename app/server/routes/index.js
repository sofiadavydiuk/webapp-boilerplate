import os from 'os';
import data from './../data/json/data'
import {HTTPError} from "../helpers/utils";
export const router = require('express-promise-router')();

const PAGESIZE = 5;

let datas = {
    products: [].concat(data.smartphones, data.tvs, data.tablets),
    smartphones: data.smartphones,
    tablets: data.tablets,
    tvs: data.tvs,
};

router.get('/', (req, res) => {
    const initialData = {};
    initialData.kek = `Welcome to boilerplate on ${os.hostname()}!`;
    res.react(initialData);
});

router.get('/:category', (req, res, next) => {
    const initialData = {};

    let products = datas[req.params.category];

    if(products === undefined) {
        return next();
    }


    if (typeof req.query.filter === "string" ){
        req.query.filter = [req.query.filter];
    }

    if (req.query.filter){
        products = products.filter(product => req.query.filter.includes(product.producent));
    }

    const page = parseInt(req.query.page) || 0;
    initialData.products = products.slice(page * PAGESIZE, page * PAGESIZE + PAGESIZE);
    initialData.pageCount = Math.ceil(products.length/PAGESIZE);
    res.react(initialData);
});

router.get(['/test', '/test2', '/test3'], (req, res) => {
    const initialData = {};
    res.react(initialData);
});