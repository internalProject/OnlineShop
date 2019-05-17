module.exports.productModel = DataTypes => {
    return {
        name: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        },
    }
}