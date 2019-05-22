module.exports.orderDetailModel = DataTypes => {
    return {
        orderId: {
            type: DataTypes.INTEGER,
        },
        productId:{
            type: DataTypes.DATE,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    }
};