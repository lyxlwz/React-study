# React组件基础
>主要分成 函数组件和类组件两种
**函数组件和类组件的区别**
> 有没有状态--(组件内部可以控制的自己的属性)
- 函数组件没有状态，也叫无状态组件（比如只有模板插槽，props传递）
  - 负责静态结构的展示
- class类组件有状态，也叫有状态组件
  - 提供状态，提供交互


## 函数组件
`目标任务：`能够独立使用函数完成react组件的创建和渲染
**概念**
> 使用 JS 的函数（或箭头函数）创建的组件，就叫做函数组件
**约定说明**
1. 组件的名称必须首字母大写，react内部会根据这个来判断是组件还是普通的HTML标签
2. 函数组件必须有返回值，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null
3. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的返回值就是对应的内容
4. 使用函数名称作为组件标签名称，可以成对出现也可以自闭合

## 类组件
`目标任务:`能够独立完成类组件的创建和渲染
**概念**
> 使用 ES6 的 class 创建的组件，叫做类（class）组件
**约定说明**
1. **类名称也必须以大写字母开头,且为驼峰**
2. 类组件应该继承 React.Component 父类，从而使用父类中提供的方法或属性
3. 类组件必须提供 render 方法render 方法必须有返回值，表示该组件的 UI 结构
4. 类里面不需要用const/let/var 关键词来声明变量和方法

## 函数组件的事件绑定
`目标任务:`能够独立绑定任何事件并能获取到事件对象e
### 1. 如何绑定事件
- 语法
on + 事件名称 = { 事件处理程序 } ，比如：`<div onClick={ onClick }></div> `
- 注意点
react事件采用驼峰命名法，比如：onMouseEnter、onFocus
### 2. 获取事件对象
> 获取事件对象e只需要在 事件的回调函数中 补充一个形参e即可拿到
### 3. 传递额外参数
> 解决思路: 改造事件绑定为箭头函数 在箭头函数中完成参数的传递

## 类组件的事件绑定
> - 整体的套路都是一致的 和函数组件没有太多不同
> - 唯一需要注意的 因为处于class 类环境下 所以定义事件回调函数 以及 绑定它写法上有不同
> - 定义的时候: class Fields语法 (写在定义的class里面)
> - 使用的时候: 需要借助this关键词获取
**特别注意**
> 之所以要采取class Fields写法是为了保证this的指向正确 永远指向当前的组件实例
> 不需要用const/let/var关键词去声明，直接写事件名

## 组件状态
`目标任务:`能够为组件添加状态和修改状态的值
> 一个前提：在React hook出来之前，函数式组件是没有自己的状态的，所以我们统一通过类组件来讲解
![image](https://user-images.githubusercontent.com/54365306/196343681-a60755b3-02a2-4e5e-877b-a590a24d3a04.png)

### 1. 初始化状态
- 通过class的实例属性state来初始化 
- state的值是一个对象结构，表示一个组件可以有多个数据状态
### 2. 读取状态
- 通过this.state来获取状态 
### 3. 修改状态
- 语法
`this.setState({ 要修改的部分数据 })`
- setState方法作用 
  a. 修改state中的数据状态
  b. 更新UI
- 思想
数据驱动视图，也就是只要修改数据状态，那么页面就会自动刷新，无需手动操作dom 
- 注意事项
**不要直接修改state中的值，必须通过setState方法进行修改**

## this问题说明
![image](https://user-images.githubusercontent.com/54365306/196343959-43f86911-bd6d-4a90-bd8a-31c4d916734c.png)
这里我们作为了解内容，随着js标准的发展，主流的写法已经变成了`class fields`，无需考虑太多this问题

## React的状态不可变
`目标任务:`能够理解不可变的意义并且知道在实际开发中如何修改状态
> 概念：不要直接修改状态的值，而是基于当前状态创建新的状态值
> 类似于微信小程序修改值 https://blog.csdn.net/weihaifeng163/article/details/122696014

## 表单处理
`目标任务:`能够使用受控组件的方式获取文本框的值

**使用React处理表单元素，一般有俩种方式：**
1. 受控组件 （推荐使用）
2. 非受控组件 （了解）
### 1. 受控表单组件
> 什么是受控组件？  input框自己的状态被React组件状态控制
> React组件的状态的地方是在state中，input表单元素也有自己的状态是在value中，React将state与表单元素的值（value）绑定到一起，由state的值来控制表单元素的值，从而保证单一数据源特性
**实现步骤**
以获取文本框的值为例，受控组件的使用步骤如下：
1. 在组件的state中声明一个组件的状态数据
2. 将状态数据设置为input标签元素的value属性的值
3. 为input添加change事件，在事件处理程序中，通过事件对象e获取到当前文本框的值（即用户当前输入的值）
4. 调用setState方法，将文本框的值作为state状态的最新值

### 2. 非受控表单组件
> 什么是非受控组件？
> 非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

**实现步骤**
1. 导入createRef 函数
2. 调用createRef函数，创建一个ref对象，存储到名为msgRef的实例属性中
3. 为input添加ref属性，值为msgRef
4. 在按钮的事件处理程序中，通过msgRef.current即可拿到input对应的dom元素，而其中msgRef.current.value拿到的就是文本框的值