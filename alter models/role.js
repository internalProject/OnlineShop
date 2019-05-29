module.exports.roleModel = DataTypes => {
    return {
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }
};