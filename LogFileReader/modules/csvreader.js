var Baby = require('babyparse');
var fs = require('fs');

function read(fileObject, sortHeaders = true) {
    // file object returned by finder
    //{
    //    'filename': file,
    //    'size': fileStat.size,
    //    'birthtime': fileStat.birthtime,
    //    'content'
    //}
    if (fileObject) {
        var content = fs.readFileSync(fileObject.filename, 'utf8');
        var parsed = [];
        Baby.parse(content, {
            step: function (result) {
                var data = result.data;
                // try to parse to date
                data = data.map(function (value) {
                    if (isNaN(Date.parse(value))) {
                        return value;
                    } else {
                        return new Date(value);
                    }
                });
                parsed.push(data);
            },
            complete: function () {
                fileObject.content = {
                    '__default': parsed
                };
            }
        });
    };
};

module.exports.read = read;