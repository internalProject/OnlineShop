module.exports.userModel = DataTypes => {
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
        },
        address: {
            type: DataTypes.TEXT,
        },
        roleId: {
            type: DataTypes.INTEGER,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
        }
    }
};