const db = require(".");

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
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'});  // 다대다관계일 때는 테이블이 따로 생겨서 짝지어진다. 중요한 거니깐 기억해 두기 ... !! 설계를 이렇게 했구나.. 몰랐구나.. 알았으면 편했을 텐데...
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User,{through: 'Like', as: 'Likers'});
        db.Post.belongsTo(db.Post, {as:'Retweet'});
    };
    return Post;
};