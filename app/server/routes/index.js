import os from 'os';
import data from './../data/json/data'
export const router = require('express-promise-router')();

const PAGESIZE = 4;
router.get('/', (req, res) => {
    const initialData = {};
    initialData.kek = `Welcome to boilerplate on ${os.hostname()}!`;
    console.log(initialData.pageCount);
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
    initialData.tablets = data.tablets.slice(page * PAGESIZE, PAGESIZE);
    initialData.tablets = data.tablets;
    initialData.pageCount = Math.ceil(data.tablets.length/PAGESIZE);
    res.react(initialData);
});

router.get('/tvs', (req, res) => {
    const initialData = {};
    const page = parseInt(req.query.page) || 0;
    initialData.tvs = data.tvs;
    initialData.pageCount = Math.ceil(data.tvs.length/PAGESIZE);
    initialData.tvs = data.tvs.slice(page * PAGESIZE, PAGESIZE);
    res.react(initialData);
});

router.get(['/test', '/test2'], (req, res) => {
    const initialData = {};
    res.react(initialData);
});