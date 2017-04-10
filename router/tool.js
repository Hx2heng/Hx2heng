import express from 'express'
import ToolsModel from './models/tools'
let router = express.Router();


router.get('/:id', (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    ToolsModel.findToolById(id).then((tool) => {
        res.render('iframe', {
            title: tool.title,
            data: tool
        })
    }).catch((err) => {
        return res.status(404).end(err);
    });

})


export default router