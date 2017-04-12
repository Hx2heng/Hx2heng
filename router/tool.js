import express from 'express'
import ToolsModel from './models/tools'
import marked from 'marked'
let router = express.Router();


router.get('/:id', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    ToolsModel.findToolById(id).then((tool) => {
        console.log(tool.type);
        if (tool.type === '插件') {
            tool.content = marked(tool.content);
            res.render('content', {
                title: tool.title,
                type: 'game',
                data: tool,
                isConcrete: true
            })
        } else if (tool.type === '在线转换') {
            res.render('iframe', {
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




export default router