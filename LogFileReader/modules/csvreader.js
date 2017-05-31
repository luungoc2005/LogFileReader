var Baby = require('babyparse');
var fs = require('fs');

function compare(a, b) {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    else {
        return 0;
    }
}

// file object returned by finder
//{
//    'filename': file,
//    'size': fileStat.size,
//    'birthtime': fileStat.birthtime,
//    'content'
//}
function read(fileObject, sortHeaders = true) {
    if (fileObject) {
        var content = fs.readFileSync(fileObject.filename, 'utf8');
        var parsed = [];
        Baby.parse(content, {
            step: function (result) {
                var data = result.data[0];
                // try to parse to date or number
                if (data) { // data is not empty
                    var isNull = true; // check if the entire array is null (e.g blank rows)
                    data = data.map(function (value) {
                        if (isNull && value) {
                            isNull = false;
                        }
                        if (isNaN(value)) {
                            if (isNaN(Date.parse(value))) {
                                return value;
                            } else {
                                return new Date(value);
                            }
                        }
                        else {
                            return parseFloat(value);
                        }
                    });

                    if (!isNull) {
                        parsed.push(data);
                    }
                }
            },
            complete: function () {
                var fileContent = {
                    '__headers': parsed[0],
                    '__default': parsed.slice(1)
                };
                // perform sorting on each header
                if (parsed && parsed[0]) {
                    var headers = parsed[0];

                    for (var i = 0; i < headers.length; i++) {
                        var asc_sorted = parsed.slice(1);

                        asc_sorted.sort(function (a, b) {
                            return compare(a[i], b[i]);
                        });
                        var desc_sorted = asc_sorted.slice(0).reverse();

                        fileContent[i + '_asc'] = asc_sorted;
                        fileContent[i + '_desc'] = desc_sorted;
                    }
                };
                fileObject.content = fileContent;
            }
        });
    };
};

module.exports.read = read;