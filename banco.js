const sequelize = require('sequelize')
require('dotenv').config()

const conexao = new sequelize(
    process.env.DB_Name,
    process.env.DB_User,
    process.env.DB_Password,
    {
        dialect:"mysql",
        host:process.env.DB_Host
    }
)

module.exports = {conexao}
