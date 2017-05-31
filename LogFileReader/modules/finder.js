'use strict';
var fs = require('fs');
var path = require('path');
var reader = require('./csvreader');

var file_pattern = /.csv$/i;
var log_path = 'C:\\Users\\Mars\\Downloads\\logs\\test\\';
var file_list = [];
var max_depth = 100;

function enumerate_all(root_path, pattern, depth = 0) {
    if (depth >= max_depth) return;
    var files = fs.readdirSync(root_path);
    if (files) {
        for (var i = 0; i < files.length; i++) {
            var file = path.join(root_path, files[i]);
            var fileStat = fs.statSync(file);
            if (file.match(pattern)) {
                var fileObject = {
                    'filename': file,
                    'size': fileStat.size,
                    'birthtime': fileStat.birthtime
                };
                reader.read(fileObject);
                file_list.push(fileObject);
            }
            else if (fileStat.isDirectory()) {
                enumerate_all(file, pattern, depth + 1);
            }
        }
    }
}

function enumerate_files() {
    file_list = [];
    enumerate_all(log_path, file_pattern);
    return file_list;
}

module.exports.default = enumerate_files

