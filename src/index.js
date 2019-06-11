"use strict";

var Transform = require("stream").Transform;
var util      = require("util");
var fs        = require("fs");

// deletePartial.DeleteLineStream(lines)
function DeleteLineStream(numOfLines) {
    if (!(this instanceof DeleteLineStream)) {
        return new DeleteLineStream(numOfLines);
    }
    Transform.call(this);
    this._numOfLines = numOfLines || 1;
    this._removed    = 0;
}

util.inherits(DeleteLineStream, Transform);

DeleteLineStream.prototype._transform = function (chunk, encoding, done) {

    // eslint-disable-next-line eqeqeq
    if (this._removed != this._numOfLines) {
        var lines = chunk.toString().split("\n");
        var len   = lines.length;

        while (len--) {
            // eslint-disable-next-line eqeqeq
            if (this._removed == this._numOfLines) {
                break;
            }
            this._removed++;
            lines.shift();
        }

        this.push(lines.join("\n"));
    } else {
        this.push(chunk);
    }

    done();
};

// depreciated deletePartial.deleteLine(options)
function deleteLine (filePath, options = {}) {
    // eslint-disable-next-line no-console
    console.warn("node-delete-partial", "'deletePartial' will be depreciated in future releases. Please use 'deletePartialSync'...");
    var lines = options.lines || 1;

    fs.readFile(filePath, function (err, data) {
        if (!err) {
            data = data.toString();
            // console.log(data.split("\n").length)

            for (var i = 0; i < lines; i++) {
                var position = data.toString().indexOf("\n");
                if (position !== -1) {
                    data = data.substr(position + 1);
                }
            }

            fs.writeFile(filePath, data, function (err2) {
                if (err2) {
                    // eslint-disable-next-line no-console
                    console.log (err2);
                }
            });
        } else {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    });
}

// deletePartial.deletePartialSync(path[, options], cb)
function deletePartialSync (arg1, arg2, arg3) {
    var filePath = typeof arg1 === "string" ? arg1 : undefined;
    var options = typeof arg2 === "object" ? arg2 : {};
    var cb = typeof arg3 === "function" ? arg3 : undefined;
    var lines = options.lines || 1;

    fs.readFile(filePath, function (err, data) {
        if (!err) {
            data = data.toString();
            // console.log(data.split("\n").length)

            for (var i = 0; i < lines; i++) {
                var position = data.toString().indexOf("\n");
                if (position !== -1) {
                    data = data.substr(position + 1);
                }
            }

            fs.writeFile(filePath, data, function (err2) {
                if (err2) {
                    cb && cb(err2)
                }
                cb && cb()
            });
        } else {
            // eslint-disable-next-line no-console
            cb && cb(err)
        }
    });
}

module.exports = {
    deletePartialStream: DeleteLineStream,
    deletePartialSync: deletePartialSync,
    deletePartial: deleteLine
};
