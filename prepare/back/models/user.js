const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {   //MySQL에는 users 테이블 생성
        // no은 자동으로 넣어짐
        email: {
            type: DataTypes.STRING(30), // STRONG, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필 수 
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필 수 
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필 수 
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장        
    });
    User.associate = () => {};
    return User;
};