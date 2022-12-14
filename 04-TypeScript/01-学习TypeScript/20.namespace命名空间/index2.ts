/**
 * 无法重新声明块范围变量“a”。ts(2451)
 * index.ts(1, 7): 此处也声明了 "a"。
 *
 * TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。
 * 相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）
 */
// const a = 2

/**
 * 解决方法：
 * 1. 加入一个export
 * 2. 通过一个命名空间 namespace
 */

// 1. 加入一个export
// export const a = 2

// 2.通过一个命名空间 namespace
export namespace B {
  export const a = 2
}