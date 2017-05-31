'use strict';
var express = require('express');
var router = express.Router();

var finder = require('../modules/finder');
var reader = require('../modules/csvreader');

var file_list = finder.default();
var file_info = file_list.map(function (fileObject, index) {
    return {
        'index': index,
        'filename': fileObject.shortname,
        'birthtime': fileObject.birthtime.getTime()
    }
});

/* GET home page. */
router.get('/', function (req, res) {
    var filter = req.query.filter;
    var start = req.query.start;
    var end = req.query.end;

    var response = file_info;

    if (filter) {
        filter = String(filter).toLowerCase()
        response = response.filter(function (item) {
            return (String(item.filename).toLowerCase().indexOf(filter) > -1);
        });
    }

    if (start && !isNaN(Date.parse(start))) {
        start = Date.parse(start);
        response = response.filter(function (item) {
            return (item.birthtime >= start);
        });
    }

    if (end && !isNaN(Date.parse(end))) {
        end = Date.parse(start);
        response = response.filter(function (item) {
            return (item.birthtime <= end);
        });
    }

    res.json(response);
});

router.get('/:fileIndex/', function (req, res) {
    if (!isNaN(req.params.fileIndex)) {
        var fileIndex = parseInt(req.params.fileIndex);
        var sorting = req.query.sorting;
        var filter = req.query.filter;
        var start = req.query.start;
        var count = req.query.count;

        var content;
        if (file_list[fileIndex]) {
            if (!file_list[fileIndex].content) {
                reader.read(file_list[fileIndex]); // lazy load the file

                // invalidate the cache after 5 mins
                setTimeout(function () {
                    file_list[fileIndex].content = null;
                }, 300000);
            }
            if (sorting && file_list[fileIndex].content[sorting]) {
                content = file_list[fileIndex].content[sorting];
            }
            else {
                content = file_list[fileIndex].content.__default;
            }
            if (content) {
                if (filter) {
                    filter = String(filter).toLowerCase();
                    content = content.filter(function (data) {
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (String(data[i]).toLowerCase().indexOf(filter) > -1) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    });
                }
                if (start) {
                    start = parseInt(start);
                    content = content.slice(start);
                }
                if (count && parseInt(count) < content.length) {
                    count = parseInt(count);
                    content = content.slice(0, count);
                }
            }

            res.json({
                'headers': file_list[fileIndex].content.__headers,
                'content': content
            });
        }
        else {
            res.status(400).json({
                'error': 'File does not exist'
            });
        }
    }
});

module.exports = router;