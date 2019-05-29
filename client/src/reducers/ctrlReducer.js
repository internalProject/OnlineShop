const ctrlInitState = {
    infoObj: {
        message: '',
        isInfoMsgOpen: false,
    },
}

export const ctrlReducer = (state = ctrlInitState, action) => {
    switch(action.type) {
        case 'OPEN_INFO':
            return {...state,
                infoObj: {...state.infoObj, message: action.data.message, isInfoMsgOpen: true, },
            }
        case 'CLOSE_INFO':
            return {...state,
                infoObj: {...state.infoObj, message: action.data.message, isInfoMsgOpen: false, },
            }
    }
    
    return state;
}   