import config from 'config-lite'
import Mongolass from 'mongolass'
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// //用户模型
// const User = mongolass.model('admin', {
//     name: { type: 'string' },
//     password: { type: 'string' }
// });
// User.index({ name: 1 }, { unique: true }).exec();
// export { User }