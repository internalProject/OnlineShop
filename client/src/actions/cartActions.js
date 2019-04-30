export const pickOne = item => dispatch => {
    dispatch({type: 'PICK_ONE', data: item});
}
