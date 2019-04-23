module.exports.user = function (DataTypes) {
    return {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
        }
        // birthDate: {
        //     type: DataTypes.DATE
        // },
        // firstName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // lastName: {
        //     type: DataTypes.STRING
        // },
    }
};
  
module.exports.order = function(DataTypes){
    return {
        //  delivery: {
        //      type: DataTypes.BOOLEAN
        //  },
        //  requestDate: {
        //      type: DataTypes.DATE
        //  }
        userId: {
            type: DataTypes.UUID,
        },
        productId: {
            type: DataTypes.UUID,
        }
     }
 };

module.exports.product = function(DataTypes) {
    return {
        id: {
            type: DataTypes.UUID,
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