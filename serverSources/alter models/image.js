module.exports.imageModel = DataTypes => {
    return {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.BLOB,
        },
    }
};