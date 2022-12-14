# JSX基础
## JSX中使用js表达式
**语法**
```javascript
{ JS 表达式}
```
**可以使用的表达式**
1. string、number、boolean、null、undefined、object([]/{})
2. 1+2、 'a+b'.split('')、['a','b'].join('-')
3. fn()

**特别注意**
if语句/switch-case 语句/变量声明语句，这些叫做语句，不是表达式，不能出现在{}中！

## 1. JSX列表渲染
**实现**
使用map方法

## JSX条件渲染
**实现**
三元表达式（常用）/ 逻辑&&运算

**特别注意**
> 原则：模板中的逻辑尽量保持精简！
> * 复杂的多分支的逻辑 收敛为一个函数
> * 通过一个函数来写分支逻辑
> * 模板中只负责调用


## 2. JSX样式控制

### 多个类名进行使用
1. 字符串拼接，双引号里面名字前面要加一个空格
```javascript
<span className={'hate ' + item.attitude === -1 ? 'hated' : ''}>
```
2. 字符串模板拼接,变量前加一个空格
```javascript
<span className={`hate ${item.attitude} === -1 ? 'hated' : ''`}>
```
3. 写成数组逗号隔开，join方法括号里面加一个空格
```javascript
<span className={['hate', item.attitude === -1 ? 'hated' : ''].join(' ')}>
```

**特别注意**
> 类名不用class 用的是className
> 使用比较多的是类名

## 3. JSX注意事项
`目标任务:`掌握jsx在实际应用时的注意事项
1. JSX必须有一个根节点，如果没有根节点，可以使用`<></>`（幽灵节点）替代
2. 所有的标签必须是闭合，成对闭合或者自闭合
3. JSX中的语法更贴近js语法，属性名采用驼峰名法 `class -> className`  `for -> htmlFor`(label标签的for属性)
4. JSX支持多行（换行），如果需要换行，需要用（）包裹，表示这是一块独立的代码区域，防止bug出现