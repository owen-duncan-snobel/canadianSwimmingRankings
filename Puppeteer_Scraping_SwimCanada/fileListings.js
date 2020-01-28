/* CORRECT LOGIC TO PRINT THE CONTENTS OF A DIRECTORY INTO A JSON FILE  (NEEDED FOR THE TREE COMPONENTS IN REACT )  */
var fs = require('fs');
var path = require('path');

var diretoryTreeToObj = function (dir, done) {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, { name: path.basename(dir), type: 'folder', children: results });

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function (err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

var dirTree = ('./swimmerData/2007-2008/');

diretoryTreeToObj(dirTree, function (err, res) {
    if (err)
        console.error(err);
    var data = JSON.stringify(res);

    fs.writeFileSync("./dirTree.json", data, function (err) {
        if (err) console.log('Could not write file dirTree.')
    });
});