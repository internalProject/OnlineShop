module.exports.orderModel = DataTypes => {
    return {
        date:{
            type: DataTypes.DATE,
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    }
};