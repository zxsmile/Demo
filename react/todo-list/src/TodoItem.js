import React,{Component} from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component{
    constructor(props) {
      super(props)
       this.deleteItem = this.deleteItem.bind(this)
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(nextProps.content!==this.props.content){
             return true
        }else{
            return false
        }
         
    }

    //当父组件的render函数被执行时，它的子组件的render函数都将被重新执行
    render() {
        console.log('update')
        const {content,type} = this.props
        return (
            <div 
            onClick={this.deleteItem}
            >
            {type}-{content}
            </div>
            )
    }

    deleteItem() {
        const {handleItemDelete,index}=this.props
        handleItemDelete(index)
    }
}

TodoItem.propTypes={
    content:PropTypes.string,
    handleItemDelete:PropTypes.func,
    index:PropTypes.number,
    type:PropTypes.string.isRequired
}

TodoItem.defaultProps={
    type:'hello'
}

export default TodoItem;