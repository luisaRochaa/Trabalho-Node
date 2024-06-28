const sequelize = require("sequelize");
const banco = require("./banco")
const atleta = require("./atleta")

var time = banco.conexao.define(
    "time",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: sequelize.STRING,
            allowNull: false
        },
        local:{
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {timestamps: false}
)

time.hasMany(atleta.atleta)
atleta.atleta.belongsTo(time)

module.exports = {time}