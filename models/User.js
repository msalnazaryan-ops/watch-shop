const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // <--- Անպայման ներմուծում ենք bcrypt-ը

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeSave: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    });

    return User;
};




// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Ձեր բազայի կապի ֆայլը
// const bcrypt = require('bcrypt');
//
// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             len: [3, 50] // Անունը 3-ից 50 տառ
//         }
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true // Email-ի ճիշտ ֆորմատի ստուգում
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.STRING,
//         defaultValue: 'user' // 'user' կամ 'admin'
//     }
// }, {
//     tableName: 'users',
//     timestamps: true
// });
//
// // Ավտոմատ գաղտնաբառի հեշավորում նախքան բազայում պահելը
// User.beforeCreate(async (user) => {
//     user.password = await bcrypt.hash(user.password, 10);
// });
//
// module.exports = User;




// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require('bcrypt');
//
// const User = sequelize.define('User', {
//     username: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     role: { type: DataTypes.STRING, defaultValue: 'user' } // 'user' կամ 'admin'
// });
//
// // Գաղտնաբառի հեշավորում
// User.beforeCreate(async (user) => {
//     user.password = await bcrypt.hash(user.password, 10);
// });
//
// module.exports = User;
//
// const { DataTypes } = require('sequelize');
// // Ենթադրենք ունեք sequelize ինստանսը (db connection)
// module.exports = (sequelize) => {
//     const User = sequelize.define('User', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [3, 50] // Անունը 3-ից 50 տառ
//             }
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true // Ստուգում է email-ի ճիշտ լինելը
//             }
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         tableName: 'users',
//         timestamps: true
//     });
//
//     return User;
// };