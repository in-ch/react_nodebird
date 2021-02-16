module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {   //MySQL에는 post 테이블 생성
        // no은 자동으로 넣어짐
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장        
    });
    Image.associate = () => {};
    return Image;
};