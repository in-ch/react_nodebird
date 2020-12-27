import PropTypes from 'prop-types';

const AppLayout = ({children}) => {
    return (
        <div>
            <div>공통메뉴</div>
            {children}
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,  // 프롭스 검사하는 거임.
};

export default AppLayout;