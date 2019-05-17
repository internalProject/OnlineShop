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
    }
};