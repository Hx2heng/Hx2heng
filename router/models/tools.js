import { ToolModel } from '../lib/mongo';

const tools = {
    //上传一个工具
    createTools: (tool) => {
        return new Promise((resolve, reject) => {
            var oneTool = new ToolModel(tool);
            oneTool.save((err) => {
                if (err) {
                    reject('上传工具失败');
                    return;
                }
                resolve('上传工具成功');
            });
        })
    },
    //查询所有工具/查询某个用户所有工具（如果有传参数name）
    findAllTools: (name = 'all', limit = null, skip = 0) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name && name != 'all') {
                query.author = name;
            }
            ToolModel.find(query, null, { sort: { '_id': -1 } }, (err, tools) => {
                if (err) {
                    reject('找不到工具');
                    return;
                }
                resolve(tools)
            }).limit(limit).skip(skip);
        })
    },
    //根据Id查询某个工具
    findToolById: (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject('工具已被删除');
                return;
            }
            ToolModel.findById(id, (err, tool) => {
                if (err) {
                    reject('找不到工具');
                    return;
                }
                resolve(tool)
            });


        })
    },
    //根据Id删除某个工具
    deleteToolById: (id) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (!id) {
                reject('找不到工具');
                return;
            }
            ToolModel.remove({ _id: id }, (err) => {
                if (err) {
                    reject('删除失败');
                    return;
                }
                resolve('删除成功！')
            });


        })
    },
    //根据ID修改工具
    updateOneTool: (newTool) => {
        return new Promise((resolve, reject) => {
            if (!newTool._id) {
                reject('找不到工具（id错误）');
            }
            ToolModel.findById(newTool._id, (err, tool) => {
                if (err) {
                    reject('找不到工具');
                    return;
                }
                tool.title = newTool.title;
                tool.url = newTool.url;
                tool.type = newTool.type;
                tool.description = newTool.description;
                tool.save((err) => {
                    if (err) {
                        reject('工具更新失败');
                        return;
                    }
                    resolve('更新工具成功');
                })
            })
        })
    }
}

export default tools