module.exports.orderModel = DataTypes => {
    return {
        orderId: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.TEXT,
        },
     }
 };