const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {   //MySQL에는 post 테이블 생성
        // no은 자동으로 넣어짐
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 쓸 수 있게 함 
        collate: 'utf8mb4_general_ci', // 한글 저장        
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};