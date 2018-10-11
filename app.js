var chokidar = require('chokidar');

// Change folder here
let folder = 'zzz-my-project';

let watchedList = null;
let files = `../${folder}/**/*.js`;
var watcher = chokidar.watch(files, {
    persistent: true,
    ignoreInitial: true,
});

watcher
    .on('add', path => {
        console.log(`File ${path} has been added`)
    })
    .on('unlink', path => {
        console.log(`File ${path} has been removed`)
    })
    .on('addDir', path => {
        console.log('Directory', path, 'has been added')
    })
    .on('ready', () => {
        console.log('Initial scan complete. Ready for changes')
        /* watchedList = watcher.getWatched()
        console.log(watchedList) */
    })
    .on('error', error => {
        log(`Watcher error: ${error}`)
    })
    .on('change', (path, stats) => {
        if (stats) console.log(`File ${path} changed size to ${stats.size}`);
    });

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    watcher.close();
    process.exit(1);
});