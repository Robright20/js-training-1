/*
## Using Reduce

### Instruction

Create three functions :
- `adder` that receives an array and adds its elements.

- `sumOrMul` that receives an array and adds or multiplies its elements
depending on whether the element is an odd or an even number.

- `funcExec` that receives an array of functions and executes them.

All functions may or may not receive an extra argument that should be the
initial value for the functions execution.

Example:
```js
sumOrMul([1, 2, 3, 4], 5)
  // -> (((5 + 1) * 2) + 3) * 4
  // -> 60
````


### Notions

- https://devdocs.io/javascript/global_objects/array/reduce

// /*/ // ⚡

// /*/ // ⚡
export const tests = []
const t = (f) => tests.push(f)

t(({ eq }) => eq(adder([1, 2, 3, 4]), 10))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [1, 2, 3, 4])
)
t(({ eq }) => eq(adder([9, 24, 7, 11, 3], 10), 64))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [9, 24, 7, 11, 3])
)
t(({ eq }) => eq(adder([]), 0))
t(({ eq, ctx }) => eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], []))

t(({ eq }) => eq(sumOrMul([29, 23, 3, 2, 25]), 135))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [29, 23, 3, 2, 25])
)
t(({ eq }) => eq(sumOrMul([18, 17, 7, 13, 25], 12), 278))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [18, 17, 7, 13, 25])
)
t(({ eq }) => eq(sumOrMul([8, 16, 7, 0, 32]), 0))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [8, 16, 7, 0, 32])
)
t(({ eq }) => eq(sumOrMul([8, 16, 7, 0, 31]), 31))
t(({ eq, ctx }) =>
  eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], [8, 16, 7, 0, 31])
)

t(({ eq, ctx }) => eq(funcExec(ctx.fArr1, 10), `result: [137]`))
t(({ eq, ctx }) => eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], ctx.fArr1))

t(({ eq, ctx }) => eq(funcExec(ctx.fArr2, 4), { result: 72, isOdd: true }))
t(({ eq, ctx }) => eq(ctx.reduceCalls[ctx.reduceCalls.length - 1], ctx.fArr2))

Object.freeze(tests)

export const setup = () => {
  const reduceCalls = []
  const _reduce = Array.prototype.reduce
  Array.prototype.reduce = function () {
    reduceCalls.push(this)
    return _reduce.apply(this, arguments)
  }

  const fArr1 = [
    (x) => x + 2,
    (x) => x ** 2,
    (x) => x - 7,
    (x) => `result: [${x}]`,
  ]

  const fArr2 = [
    (x) => x + 20,
    (x) => x * 3,
    (x) => {
      return {
        result: x,
        isOdd: x % 2 === 0,
      }
    },
  ]

  return { reduceCalls, fArr1, fArr2 }
}
