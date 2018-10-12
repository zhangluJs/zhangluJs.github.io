const themeReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_COLOR' :
            return {...state, themeColor: action.themeColor};
        default: 
            return {themeColor: '#409eff'}
    }
}

export default themeReducer;