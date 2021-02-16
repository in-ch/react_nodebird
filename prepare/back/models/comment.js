module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {   //MySQL에는 post 테이블 생성
        // no은 자동으로 넣어짐
        content: {},
    }, {
        charset: 'utf8mb4', // 이모티콘 쓸 수 있게 함 
        collate: 'utf8mb4_general_ci', // 한글 저장        
    });
    Comment.associate = () => {};
    return Comment;
};