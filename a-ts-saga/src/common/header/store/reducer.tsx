const defaultState = {

}
export default (state = defaultState, action: any) => {
    if(action.type) {
        return state
    }
    return state
}
