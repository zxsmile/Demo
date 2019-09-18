import React,{Component} from 'react';
import TodoItem from './TodoItem.js';

class TodoList extends Component{
  constructor(props) {
    super(props)
    //当组件的state或props发生变化时，render函数会重新执行
    this.state={
       inputValue:'',
       list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete=this.handleItemDelete.bind(this)
  }
  render() {
    return (
      <div>
         <div>
         <label htmlFor='inputContent'>输入</label>
         <input value={this.state.inputValue} id='inputContent' onChange={this.handleInputChange}/>
         <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          {this.getItem()}
        </ul>
      </div>
    )
  }

  getItem() {
    return this.state.list.map((item,index)=>{
      return (
           <div key={index}>
              <TodoItem 
              content={item} 
              index={index} 
              handleItemDelete={this.handleItemDelete}
              />
             {/* <li 
              key={index} 
              onClick={this.handleItemDelete.bind(this,index)}
              dangerouslySetInnerHTML={{__html:item}}
              >
              </li> */}
           </div>
            )
    })
  }
  handleInputChange(e) {
     const value = e.target.value
      this.setState(()=>({
        inputValue:value
      }))
  }

  handleBtnClick() {
    this.setState((prevState)=>({
      list:[...prevState.list,prevState.inputValue],
      inputValue:''
    }))
  }

  handleItemDelete(index) {
     this.setState((prevState)=>{
      let list = [...this.state.list]
      list.splice(index,1)
      return {
        list
      }
    })
  }
}

export default TodoList;
