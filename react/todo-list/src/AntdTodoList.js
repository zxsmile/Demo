import React,{Component} from 'react'
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'
import store from './store'
import {getInputChangeAction,getAddItemAction,getDeleteItemAction} from './store/actionCreaters'
import AntdTodoListUI from './AntdTodoListUI'


class AntdTodoList extends Component{
    constructor(props) {
       super(props)
       this.state=store.getState()
       this.handleChangeInput=this.handleChangeInput.bind(this)
       this.changeInputValue = this.changeInputValue.bind(this)
       this.handleBtnClick = this.handleBtnClick.bind(this)
       this.handleDeleteItem = this.handleDeleteItem.bind(this)
       store.subscribe(this.changeInputValue)
    }
    render() {
        return  <AntdTodoListUI 
                 handleChangeInput={this.handleChangeInput} 
                 inputValue={this.state.inputValue}
                 handleBtnClick={this.handleBtnClick}
                 list={this.state.list}
                 handleDeleteItem={this.handleDeleteItem}
                />
             
    }

    handleChangeInput(e) {
      let action = getInputChangeAction(e.target.value)
      store.dispatch(action)
    }

    changeInputValue() {
        this.setState(store.getState())
    }

    handleBtnClick(e) {
        let action=getAddItemAction()
        store.dispatch(action)  
    }

    handleDeleteItem(index) {
        let action=getDeleteItemAction(index)
        store.dispatch(action)
    }
}

export default AntdTodoList