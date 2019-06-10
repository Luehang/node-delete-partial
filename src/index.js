"use strict";

var Transform = require("stream").Transform;
var util      = require("util");

function DeleteLineStream(options) {
    var numOfLines = options.lines;
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

var fs = require('fs');

function deleteLine (filePath, options = {}) {
    var lines = options.lines || 1;

    fs.readFile(filePath, function (err, data) {
        if (!err) {
            data = data.toString();
            // console.log(data.split('\n').length)

            for (var i = 0; i < lines; i++) {
                var position = data.toString().indexOf('\n');
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

module.exports = {
    deletePartialStream: DeleteLineStream,
    deletePartial: deleteLine
};
