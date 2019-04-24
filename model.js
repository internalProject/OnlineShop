module.exports.user = function (DataTypes) {
    return {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email:{
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.TEXT,
        }
    }
};


module.exports.order = function(DataTypes){
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

module.exports.product = function(DataTypes) {
    return {
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        }
    }
}