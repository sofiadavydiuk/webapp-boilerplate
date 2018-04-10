import os from 'os';
import data from './../data/json/data'
export const router = require('express-promise-router')();

const PAGESIZE = 5;

router.get('/', (req, res) => {
    const initialData = {};
    initialData.kek = `Welcome to boilerplate on ${os.hostname()}!`;
    res.react(initialData);
});

router.get('/products', (req, res) => {
    const initialData = {};
    let products = [].concat(data.smartphones, data.tvs, data.tablets);

    if (typeof req.query.filter === "string" ){
        req.query.filter = [req.query.filter];
    }

    if (req.query.filter){
        products = products.filter(product => req.query.filter.includes(product.producent));
    }

    // if (req.query.sort){
    //     switch (req.query.sort){
    //         case ;
    //
    //     }
    //
    //
    // }

    // var foo = 0;
    // switch (foo) {
    //     case -1:
    //         console.log('negative 1');
    //         break;
    //     case 0: // foo is 0 so criteria met here so this block will run
    //         console.log(0);
    //     // NOTE: the forgotten break would have been here
    //     case 1: // no break statement in 'case 0:' so this case will run as well
    //         console.log(1);
    //         break; // it encounters this break so will not continue into 'case 2:'
    //     case 2:
    //         console.log(2);
    //         break;
    //     default:
    //         console.log('default');
    // }
    console.log(req.query.sort.value);


    console.log(req.query);

    const page = parseInt(req.query.page) || 0;
    initialData.products = products.slice(page * PAGESIZE, page * PAGESIZE + PAGESIZE);
    initialData.pageCount = Math.ceil(products.length/PAGESIZE);
    res.react(initialData);
});

router.get('/smartphones', (req, res) => {
    const initialData = {};
    const page = parseInt(req.query.page) || 0;
    initialData.smartphones = data.smartphones.slice(page * PAGESIZE, page * PAGESIZE + PAGESIZE);
    initialData.pageCount = Math.ceil(data.smartphones.length/PAGESIZE);
    res.react(initialData);
});

router.get('/tablets', (req, res) => {
    const initialData = {};
    const page = parseInt(req.query.page) || 0;
    initialData.tablets = data.tablets.slice(page * PAGESIZE, page * PAGESIZE + PAGESIZE);
    initialData.pageCount = Math.ceil(data.tablets.length/PAGESIZE);
    res.react(initialData);
});

router.get('/tvs', (req, res) => {
    const initialData = {};
    const page = parseInt(req.query.page) || 0;
    initialData.tvs = data.tvs.slice(page * PAGESIZE, page * PAGESIZE + PAGESIZE);
    initialData.pageCount = Math.ceil(data.tvs.length/PAGESIZE);
    res.react(initialData);
});

router.get(['/test', '/test2'], (req, res) => {
    const initialData = {};
    res.react(initialData);
});