/**
 * 对象的混入
 */
interface Name {
  name: string
}

interface Age {
  age: number
}

interface Sex {
  sex: number
}

let a: Name = { name: '小黄' }
let b: Age = { age: 22 }
let c: Sex = { sex: 1 }

// 合并对象
let obj = Object.assign(a, b, c)

/**
 * 类的混入
 */
class A {
  type: boolean
  changeType() {
    this.type = !this.type
  }
}

class B {
  name: string
  getName(): string {
    return this.name
  }
}

// 实现类
class C implements A, B {
  type: boolean = false;
  name: string = "小刘";
  changeType: () => void
  getName: () => string
}

mixins(C, [A, B])
function mixins(curCls: any, mixCls: any[]) {
  mixCls.forEach(item => {
    Object.getOwnPropertyNames(item.prototype).forEach(name => {
      curCls.prototype[name] = item.prototype[name]
    })
  })
}

let ccc = new C()
console.log(ccc.type);

ccc.changeType()

console.log(ccc.type);