import express from 'express'
import ToolsModel from './models/tools'
let router = express.Router();


router.get('/', (req, res) => {
    ToolsModel.findAllTools().then((data) => {
        res.render('toolList', { tools: data });
    })
})


export default router