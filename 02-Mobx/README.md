# Mobx
## 1. 配置开发环境
> Mobx是一个独立的响应式的库，可以独立于任何UI框架存在，但是通常大家习惯把它和React进行绑定使用，用Mobx来做响应式数据建模，React作为UI视图框架渲染内容，我们环境的配置需要三个部分
一个create-react-app创建好的React项目环境
mobx框架本身
一个用来链接mobx和React的中间件
```Bash
# 创建项目
# npx 创建方式
$ npx create-react-app react-mobx 

# vite 创建方式
$ npm create vite react-mobx --template react

# 安装mobx和中间件工具 mobx-react-lite  只能函数组件中使用
$ npm i  mobx  mobx-react-lite
```

## 2.基础使用
> 需求: 使用mobx实现一个计数器的案例
![a.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1659257784647-5f1c4d4a-8fe6-45f2-8b76-dace1ab0fdb0.png#clientId=u9cdd7397-35da-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u17c57939&margin=%5Bobject%20Object%5D&name=a.png&originHeight=747&originWidth=1765&originalType=binary&ratio=1&rotation=0&showTitle=false&size=756869&status=done&style=none&taskId=u0c070e53-8072-41aa-b322-a60609590a7&title=)

### 1. 初始化mobx
> 初始化步骤
> 1. 定义数据状态**state**
> 2. 在构造器中实现数据响应式处理 **makeAutoObservble**
> 3. 定义修改数据的函数**action**
> 4. 实例化store并导出

```javascript
import { makeAutoObservable } from 'mobx'

class CounterStore {
  count = 0 // 定义数据
  constructor() {
    makeAutoObservable(this)  // 响应式处理
  }
  // 定义修改数据的方法
  addCount = () => {
    this.count++
  }
}

const counter = new CounterStore()
export default counter
```

### 2. React使用store
> 实现步骤
> 1. 在组件中导入counterStore实例对象
> 2. 在组件中使用storeStore实例对象中的数据
> 3. 通过事件调用修改数据的方法修改store中的数据
> 4. 让组件响应数据变化


```jsx
// 导入counterStore
import counterStore from './store'
// 导入observer方法
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div className="App">
      <button onClick={() => counterStore.addCount()}>
        {counterStore.count}
      </button>
    </div>
  )
}
// 包裹组件让视图响应数据变化
export default observer(App)
```

## 3. 计算属性（衍生状态）
> 概念: 有一些状态根据现有的状态计算（衍生）得到，我们把这种状态叫做计算属性, 看下面的例子

![b.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1659258189676-fa84e558-c8b5-4e3e-9d7b-ef87a020af66.png#clientId=u9cdd7397-35da-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=577&id=u9e116896&margin=%5Bobject%20Object%5D&name=b.png&originHeight=770&originWidth=923&originalType=binary&ratio=1&rotation=0&showTitle=false&size=591988&status=done&style=none&taskId=u7bf6a8a4-c07b-41a0-aaf1-aeeb12c9bc5&title=&width=692)

实现步骤

1. 生命一个存在的数据
2. 通过get关键词 定义计算属性
3. 在 makeAutoObservable 方法中标记计算属性

```javascript
import { computed, makeAutoObservable } from 'mobx'

class CounterStore {
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    makeAutoObservable(this, {
      filterList: computed
    })
  }
  // 修改原数组
  changeList = () => {
    this.list.push(7, 8, 9)
  }
  // 定义计算属性
  get filterList () {
    return this.list.filter(item => item > 4)
  }
}

const counter = new CounterStore()

export default counter
```
```jsx
// 导入counterStore
import counterStore from './store'
// 导入observer方法
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div className="App">
      {/* 原数组 */}
      {JSON.stringify(counterStore.list)}
      {/* 计算属性 */}
      {JSON.stringify(counterStore.filterList)}
      <button onClick={() => counterStore.changeList()}>change list</button>
    </div>
  )
}
// 包裹组件让视图响应数据变化
export default observer(App)
```

## 4. 异步数据处理
> 测试接口: [http://geek.itheima.net/v1_0/channels](http://geek.itheima.net/v1_0/channels')
> 实现步骤:
> 1. 在mobx中编写异步请求方法 获取数据 存入state中
> 2. 组件中通过 useEffect + 空依赖  触发action函数的执行 

```javascript
// 异步的获取

import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // 只要调用这个方法 就可以从后端拿到数据并且存入channelList
  setChannelList = async () => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    this.channelList = res.data.data.channels
  }
}
const channlStore = new ChannelStore()
export default channlStore
```
```jsx
import { useEffect } from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
function App() {
  const { channlStore } = useStore()
  // 1. 使用数据渲染组件
  // 2. 触发action函数发送异步请求
  useEffect(() => {
    channlStore.setChannelList()
  }, [])
  return (
    <ul>
      {channlStore.channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
// 让组件可以响应数据的变化[也就是数据一变组件重新渲染]
export default observer(App)
```

## 5. 模块化
> 场景: 一个项目有很多的业务模块，我们不能把所有的代码都写到一起，这样不好维护，提了提供可维护性，需要引入模块化机制

![无标题-2022-07-27-1257.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1659259142451-e8938c29-be7f-4771-a970-7e4772270031.png#clientId=u9cdd7397-35da-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ubbeffadb&margin=%5Bobject%20Object%5D&name=%E6%97%A0%E6%A0%87%E9%A2%98-2022-07-27-1257.png&originHeight=985&originWidth=1748&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1495735&status=done&style=none&taskId=u8c022d80-4b2a-4a62-9fab-851e2c9cb84&title=)


**实现步骤**

1. 拆分模块js文件，每个模块中定义自己独立的state/action
2. 在store/index.js中导入拆分之后的模块，进行模块组合
3. 利用React的context的机制导出统一的useStore方法，给业务组件使用

### 1.定义task模块
```javascript
import { makeAutoObservable } from 'mobx'

class TaskStore {
  taskList = []
  constructor() {
    makeAutoObservable(this)
  }
  addTask () {
    this.taskList.push('vue', 'react')
  }
}

const task = new TaskStore()


export default task
```

### 2. 定义counterStore
```javascript
import { makeAutoObservable } from 'mobx'

class CounterStore {
  count = 0
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    makeAutoObservable(this)
  }
  addCount = () => {
    this.count++
  }
  changeList = () => {
    this.list.push(7, 8, 9)
  }
  get filterList () {
    return this.list.filter(item => item > 4)
  }
}

const counter = new CounterStore()

export default counter
```
### 3.组合模块导出统一方法
```javascript
import React from 'react'

import counter from './counterStore'
import task from './taskStore'


class RootStore {
  constructor() {
    this.counterStore = counter
    this.taskStore = task
  }
}


const rootStore = new RootStore()

// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)
// useStore() =>  rootStore  { counterStore, taskStore }

export { useStore }
```

### 4. 组件使用模块中的数据
```jsx
import { observer } from 'mobx-react-lite'
// 导入方法
import { useStore } from './store'
function App() {
  // 得到store
  const store = useStore()
  return (
    <div className="App">
      <button onClick={() => store.counterStore.addCount()}>
        {store.counterStore.count}
      </button>
    </div>
  )
}
// 包裹组件让视图响应数据变化
export default observer(App)
```

## 6. 多组件共享数据
> 目标：当数据发生变化 所有用到数据的组件都会得到同步的组件的更新
> 实现步骤：在Foo组件和Bar组件中分别使用store中的数据，然后在app组件中进行数据修改，查看Foo组件和Bar组件是否得到更新

![无标题-2022-08-09-1117.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1660015239265-7868127a-b588-4083-b61f-08c9cac18009.png#clientId=u91805b20-013b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uba8a72dc&margin=%5Bobject%20Object%5D&name=%E6%97%A0%E6%A0%87%E9%A2%98-2022-08-09-1117.png&originHeight=902&originWidth=1559&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269704&status=done&style=none&taskId=u947caff5-d020-49a3-9a43-09309f5631d&title=)
```jsx
// 用taskStore中的taskList数据
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
const Bar = () => {
  const { taskStore } = useStore()
  return (
    <ul>
      {taskStore.taskList.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

export default observer(Son)
```
```jsx
// 用taskStore中的taskList数据
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
const Bar = () => {
  const { taskStore } = useStore()
  return (
    <ul>
      {taskStore.taskList.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

export default observer(Son)
```
```jsx
import Bar from './Bar'
import Foo from './Foo'
import { useStore } from './store'
function App() {
  const { taskStore } = useStore()
  return (
    <div className="App">
      <Bar />
      <button onClick={() => taskStore.setTaskList('angular')}>
        修改taskStore
      </button>
    </div>
  )
}
export default App
```

## 7.基础总结
### 1.初始化mobx的过程是怎样的
> 声明数据 -> 响应式处理 -> 定义action函数 -> 实例化导出
### 2.mobx如何配合react，需要依赖什么包？
> mobx-react-lite 作为链接包（中间包），导出observer方法，包裹组件（只能和函数组件配合）
> 类组件是 mobx-react包
### 3.模块化解决了什么问题？
> 维护性问题
### 4.如何实现mobx的模块化
> 按照功能拆分store模块，根模块中组合子模块，利用context机制依赖注入