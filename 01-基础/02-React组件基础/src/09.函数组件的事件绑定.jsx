
import React from "react"
// 函数组件的创建和渲染
//创建
const clickFun = (e, msg) => {
  // 阻止默认行为
  e.preventDefault()
  // 传递自定义参数
  console.log('函数组件中的事件被触发了', msg)
}

/**
 * 如何传递自定义参数？
 * 1.只需要一个额外参数 (只需改成箭头函数)
 * {clickFun}  ---> {() => clickFun()}
 * 
 * 2.既需要事件对象e,又需要额外的参数
 * {() => clickFun()}  ---> {(e) => clickFun(e,'自定义参数')}
 */
function Hello () {
  return (
    <div >
      <a href="http://baidu.com" onClick={(e) => clickFun(e, 'hhh')}>百度</a>
    </div>
  )
}

// 类组件的创建和渲染
//创建

// 事件绑定函数（标准写法）
// const clickHandler = () => {
//   console.log('类组件中的事件被触发了')
// }
class HelloComponent extends React.Component {
  // 写组件里面是实例，需要加this获取上下文 （标准写法,箭头函数避免this指向问题）
  clickHandler = () => {
    console.log('类组件中的事件被触发了')
  }
  render () {
    return <div onClick={this.clickHandler}>this is class Component</div>
  }
}

function App () {
  return (
    <div>
      {/* 渲染hello组件 */}
      <Hello></Hello>
      {/* 渲染类组件 */}
      <HelloComponent></HelloComponent>
    </div>
  )
}

export default App
