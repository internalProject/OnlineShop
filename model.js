module.exports.user = function (DataTypes) {
    return {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
        }
    }
};


module.exports.order = function(DataTypes){
    return {
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
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        }
    }
}