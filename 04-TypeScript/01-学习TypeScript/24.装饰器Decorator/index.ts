/**
 * 装饰器
 */
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    // target.prototype.getName = <T>(name: T): T => {
    //   return name
    // }
    target.prototype.getNames = () => {
      return name
    }
  }
}

const log: ClassDecorator = (target: Function) => {
  target.prototype.a = 123
}

// 属性装饰器
const log1: PropertyDecorator = (...args) => {
  console.log(args); // [{},'name',undefined]
}

// 方法装饰器
const log2: MethodDecorator = (...args) => {
  console.log(args); // [{},'getName',{value:[Function,getName],writable:true,enumerable:false,configurable:true}]
}

// 方法名装饰器
const log3: ParameterDecorator = (...args) => {
  // 0表示第0个
  console.log(args); // [{},'getName',0]
}


// 高阶函数进行传参
@watcher('小刘')
@log // 多个装饰器并行使用

// @watcher('小刘') @log // 多个装饰器并行使用
class A {
  //对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告。

  /**
   * 属性装饰器可以用来写序列化相关的功能
   */
  name: string
  constructor() {

  }

  @log1
  getName(name: string, @log3 age: number) {
    return '56546'
  }
}

// @watcher
// class B {

// }

let a = new A();
// let b = new B();
// // 断言成any 类型
// // (a as any).getName()
// console.log((<any>a).getName('32312321'));
// console.log((<any>b).getName('777777777777777'));

// console.log((<any>a).getNames('32312321'));
