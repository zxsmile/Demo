import {CHANG_EINPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from './actionTypes'

let defaultState ={
    inputValue:'',
    list:[]
}

export default (state=defaultState,action)=>{
    let newValue = JSON.parse(JSON.stringify(state))
    if(action.type===CHANG_EINPUT_VALUE){
        newValue.inputValue=action.value
        return newValue
    }
    if(action.type ===ADD_TODO_ITEM){
        newValue.list.push(newValue.inputValue) 
        newValue.inputValue=''
        return newValue
    }
    if(action.type===DELETE_TODO_ITEM){
        newValue.list.splice(action.index,1)
        return newValue
    }
    return state
}