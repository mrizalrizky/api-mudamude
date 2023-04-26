// 'use strict';
// const {
//   Model
// } = require('sequelize');
// const master_roles = require('../roles/master_roles.model')
// module.exports = (sequelize, DataTypes) => {
//   class mudamude_user extends Model {
//     static associate(models) {
//       // mudamude_user.belongsTo(models.master_roles, {
//       //   as: 'role',
//       //   foreignKey: 'id_role'
//       // })
//     }
//   }
//   mudamude_user.init({
//     id_user: {
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true
//     },
//     id_role: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: master_roles,
//         key: 'id_role'
//       }
//     },
//     username: DataTypes.STRING,
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     institution: DataTypes.STRING,
//     major: DataTypes.STRING,
//   }, {
//     sequelize,
//     modelName: 'mudamude_user',
//   });
//   return mudamude_user;
// };

const master_roles = require('../master/master_roles.model')

module.exports = (sequelize, DataTypes) => {
  const mudamude_user = sequelize.define("mudamude_user", {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_role: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_roles',
        key: 'id_role'
      }
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING
    },
    institution: {
      type: DataTypes.STRING
    },
    major: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })

  return mudamude_user
}