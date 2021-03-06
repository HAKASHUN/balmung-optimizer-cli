var balmung = require('balmung'),
    balmungSettings = require('balmung/lib/settings'),
    _ = require('lodash'),
    Q = require('q');

var Optimizer = function (config) {
    var list = [];
    var tools;

    loadConfig(config)
        .then(function(result){
            var d = Q.defer();
            config = _.merge({}, result, config);
            tools = balmung.createTools({
                config: config
            });
            tools.settings.load(tools.config, function(err) {
                if(err) {
                    return d.reject(err);
                }
                d.resolve();
            });
            return d.promise;
        })
        .then(resize, function() {
            throw new Error('resize error');
        })
        .then(optimize, function() {
            throw new Error('optimize error');
        })
        .then(function() {
            console.log('Success!');
        });

    //
    // methods
    //

    /**
     * load Balmung Config
     * @returns {promise|*|r.promise|Q.promise|x.ready.promise}
     */
    function loadConfig(config) {
        var d = Q.defer();
        balmungSettings.load(config, function(err, result) {
            if(err) {
                return d.reject(err);
            }
            d.resolve(result);
        });
        return d.promise;
    }

    /**
     * Optimize Resized Images
     * @returns {promise|*|r.promise|Q.promise|x.ready.promise}
     */
    function optimize() {
        var d = Q.defer();
        var optimizer = tools.optimizer;
        if(list.length === 0) {
            d.resolve();
        } else {
            list.forEach(function(task) {
                optimizer.optimize(task.base, task.file, task.ratio);
            });
            optimizer.on('error', d.reject);
            optimizer.on('finish', d.resolve);
        }
        return d.promise;
    }

    /**
     * Resize Images
     * @returns {promise|*|r.promise|Q.promise|x.ready.promise}
     */
    function resize() {
        var d = Q.defer();
        var resizer = tools.resizer;
        resizer.resize();
        resizer.on('resize', function(task) {
            list.push(task);
        });
        resizer.on('error', d.reject);
        resizer.on('finish', d.resolve);
        return d.promise;
    }
};

module.exports = Optimizer;