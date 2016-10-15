module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon', 'chai', 'riot', 'jquery-2.1.0'],
        files: [
            'src/tag/*.tag',
            'test/*-spec.js'
        ],
        exclude: [],
        preprocessors: {
            'src/**/*.tag': ['riot']
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
};