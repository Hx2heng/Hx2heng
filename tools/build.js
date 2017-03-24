import { makeDir, cleanDir, copyDir,writeFile } from './lib/fs.js'
import pkg from '../package.json'
import webpack from 'webpack'
import webpackCfgs from './webpack.config.js'
import gulp from 'gulp'
import babel from 'gulp-babel'

const build = async() => {
    await cleanDir('build');
    await makeDir('build');
    await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node start.js',
      },
    }, null)),
    copyDir('public/content', 'build/public/content'),
    copyDir('views', 'build/views')
  ]);
  await new Promise((resolve, reject) => {
    webpack(webpackCfgs[1],()=>{}).run((err, stats) => {
      if (err) {
        return reject(err);
      }
      console.log(stats.toString(webpackCfgs[1].stats));
      return resolve();
    });
  });

  await new Promise((resolve)=>{
    const babel = require('gulp-babel');
 
gulp.task('default', () => {
    gulp.src(['tools/start.js','tools/runServer.js'])
        .pipe(babel({
            presets: ['stage-0']
        }))
        .pipe(gulp.dest('build'));

    gulp.src(['router/**/*.js'])
        .pipe(babel({
            presets: ['stage-0']
        }))
        .pipe(gulp.dest('build/router'));
    gulp.src(['config/**/*.js'])
        .pipe(babel({
            presets: ['stage-0']
        }))
        .pipe(gulp.dest('build/config'));
});
  gulp.start();
  })

}
build();