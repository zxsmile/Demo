import  React,{Component} from 'react'
import {Input,Button,List} from 'antd'

// 当一个组件里只有render函数时，最好用无状态组件，性能比较高

//无状态组件

let AntdTodoListUI = (props)=>{
    return (
        <div style={{marginTop:"10px",marginLeft:"10px"}}> 
            <div>
            <Input placeholder="default size" onChange={props.handleChangeInput} value={props.inputValue} style={{marginRight:"10px",width:'300px'}} />
            <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
            </div>
            <List
            style={{marginTop:"10px",width:'300px'}}
            bordered
            dataSource={props.list}
            renderItem={(item,index) => (
                <List.Item onClick={(index)=>{props.handleDeleteItem(index)}}>
                 {item}
                </List.Item>
            )}
            />
        </div>
    )
}

//普通组件
// class AntdTodoListUI extends Component{
//     render() {
//         return (
//             <div style={{marginTop:"10px",marginLeft:"10px"}}> 
//                 <div>
//                 <Input placeholder="default size" onChange={this.props.handleChangeInput} value={this.props.inputValue} style={{marginRight:"10px",width:'300px'}} />
//                 <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
//                 </div>
//                 <List
//                 style={{marginTop:"10px",width:'300px'}}
//                 bordered
//                 dataSource={this.props.list}
//                 renderItem={(item,index) => (
//                     <List.Item onClick={(index)=>{this.props.handleDeleteItem(index)}}>
//                      {item}
//                     </List.Item>
//                 )}
//                 />
//             </div>
//         )
//     }
// }


export default AntdTodoListUI