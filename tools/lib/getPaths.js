import glob from 'glob'
let getPaths = (globPath, pathDir)=> {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        console.log(2, pathname, entry);
        entries[pathname] = './' + entry;
    }
    return entries;
}

export default getPaths