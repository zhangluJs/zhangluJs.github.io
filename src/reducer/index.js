/**
 * @file 学习 react-redux
 */

export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor};
        default:
            return {
                themeColor: '#409eff'
            };
    }
};
