﻿'use strict';
var express = require('express');
var router = express.Router();

var finder = require('../modules/finder');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
