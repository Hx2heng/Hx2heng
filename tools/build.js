import {makeDir,cleanDir,copyDir} from './lib/fs.js'

const build = async()=>{
    await makeDir('build');
    await cleanDir('build');
}
build();
