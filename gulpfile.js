var gulp = require('gulp');

var uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');


gulp.task('buildcss', function() {
    return gulp.src('src/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildjs', function() {
    return gulp.src('src/*.js')
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('default', function() {
    gulp.run('buildjs');
    gulp.run('buildcss');

})
