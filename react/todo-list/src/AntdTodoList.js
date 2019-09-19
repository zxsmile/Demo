import React,{Component} from 'react'
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'
import store from './store'
import {getInputChangeAction,getAddItemAction,getDeleteItemAction} from './store/actionCreaters'


class AntdTodoList extends Component{
    constructor(props) {
       super(props)
       this.state=store.getState()
       this.handleChangeInput=this.handleChangeInput.bind(this)
       this.changeInputValue = this.changeInputValue.bind(this)
       this.handleBtnClick = this.handleBtnClick.bind(this)
       //this.handleDeleteItem = this.handleDeleteItem.bind(this)
       store.subscribe(this.changeInputValue)
    }
    render() {
        return  (
            <div style={{marginTop:"10px",marginLeft:"10px"}}> 
                <div>
                <Input placeholder="default size" onChange={this.handleChangeInput} value={this.state.inputValue} style={{marginRight:"10px",width:'300px'}} />
                <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                </div>
                <List
                style={{marginTop:"10px",width:'300px'}}
                bordered
                dataSource={this.state.list}
                renderItem={(item,index) => (
                    <List.Item onClick={this.handleDeleteItem.bind(this,index)}>
                     {item}
                    </List.Item>
                )}
                />
            </div>
        )
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