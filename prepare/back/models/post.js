module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {   //MySQL에는 post 테이블 생성
        // no은 자동으로 넣어짐
        content: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 쓸 수 있게 함 
        collate: 'utf8mb4_general_ci', // 한글 저장        
    });
    Post.associate = () => {};
    return Post;
};