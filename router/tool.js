import express from 'express'
import ToolsModel from './models/tools'
import marked from 'marked'
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
        return res.status(404).end(err);
    });

})

//tool-markdown
router.get('/tool-markdown', (req, res) => {
    let str = req.query.str.toString();
    let data = marked(str);
    return res.json(data)
})

export default router