import { AdminModel } from '../lib/mongo';

const admins = {
    getAdminByName: (name) => {
        return new Promise((resolve, reject) => {
            AdminModel.findOne({ name: name }, (err, admin) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(admin)
                }
            })
        })
    }
}

export default admins