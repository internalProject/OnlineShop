module.exports.user = function (DataTypes) {
    return {
        id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        email:{
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },
        birthDate: {
            type: DataTypes.DATE
        }
    }
};
  
module.exports.order = function(DataTypes){
    return {
         id:{
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
         },
         productId: {
             type: DataTypes.INTEGER,
             allowNull: false
         },
         delivery: {
             type: DataTypes.BOOLEAN
         },
         requestDate: {
             type: DataTypes.DATE
         }
     }
 };