


/**
 * 无法重新声明块范围变量“a”。ts(2451)
 * index2.ts(5, 7): 此处也声明了 "a"。
 *
 * TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。
 * 相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）
 */

/**
 * 解决方法：
 * 1. 加入一个export
 * 2. 通过一个命名空间 namespace
 *  * 不能用ts-node 进行编译 他不认识namespace
 */

// 1. 加入一个export
// export const a = 1

// 2.通过一个命名空间 namespace 相当于编译了一层function
namespace A {
  export const a = 1
}

// console.log(A.a);

// 嵌套匿名空间
namespace A1 {
  export namespace C1 {
    export const D1 = 5
  }
}

// 简化命名空间 通过import关键字
import AAA = A1.C1.D1
// console.log(A1.C1.D1, AAA);

// 抽离命名空间
import { B } from './index2'
// console.log(B);



// 合并命名空间
// 重名的命名空间会合并

namespace S {
  export const s = 4
}

namespace S {
  export const m = 8
}

// 相当于
// namespace S {
//   export const s = 4
//   export const m = 8
// }

// S.m
// S.s

console.log(S);

