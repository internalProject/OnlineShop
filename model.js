module.exports.user = DataTypes => {
    return {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email:{
            type: DataTypes.TEXT,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.TEXT,
        }
    }
};


module.exports.order = DataTypes => {
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
        }
     }
 };

module.exports.product = DataTypes => {
    return {
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        }
    }
}