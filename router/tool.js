import express from 'express'
import ToolsModel from './models/tools'
//markdown
import marked from 'marked'
//autoprefixer
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
//uglifyjs2
import UglifyJS from 'uglify-js'

let router = express.Router();


router.get('/', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    ToolsModel.findToolById(id).then((tool) => {
        if (tool.type === '插件') {
            tool.content = marked(tool.content);
            res.render('content', {
                title: tool.title,
                type: 'game',
                data: tool,
                isConcrete: true
            })
        } else if (tool.type === '在线转换') {
            res.render('toolContent', {
                title: tool.title,
                data: tool
            })
        } else {
            return res.redirect('back');

        }

    }).catch((err) => {
        req.flash('error', err);
        return res.status(404).render('404');
    });

})

//tool-markdown
router.get('/tool-markdown', (req, res) => {
    let str = req.query.str.toString();
    try {
        if (!str) {
            throw new Error('空的参数');
        }
    } catch (err) {
        req.flash('error', err.message);
        return res.status(403).send(err)
    }
    let data = marked(str);
    return res.json(data)
})

//tool-autoprefixer
router.get('/tool-autoprefixer', (req, res) => {
        let str = req.query.str.toString();
        try {
            if (!str) {
                throw new Error('空的参数');
            }
        } catch (err) {
            req.flash('error', err.message);
            return res.status(403).send(err)
        }

        var cleaner = postcss([autoprefixer({ add: false, browsers: [] })]);
        var prefixer = postcss([autoprefixer]);

        cleaner.process(str).then(function(cleaned) {
            return prefixer.process(cleaned.css)
        }).then(function(result) {
            return res.json(result.css)
        }).catch(function(err) {
            return res.status(404).send(err.reason)
        });
    })
    //uglifyjs
router.get('/tool-uglifyjs', (req, res) => {
    let str = req.query.str.toString();
    try {
        if (!str) {
            throw new Error('空的参数');
        }
    } catch (err) {
        req.flash('error', err.message);
        return res.status(403).send(err)
    }
    try {
        if (!UglifyJS.parse(str)) {
            throw new Error('语法错误');
        }
    } catch (err) {
        req.flash('error', err.message);
        return res.status(403).send(err)
    }
    var ast = UglifyJS.parse(str);
    ast.figure_out_scope();
    var compressor = UglifyJS.Compressor();
    ast = ast.transform(compressor);
    var code = ast.print_to_string();
    return res.json(code)
})


export default router