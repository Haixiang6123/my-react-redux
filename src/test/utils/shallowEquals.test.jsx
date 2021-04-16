import shallowEquals from "../../lib/utils/shallowEquals";

describe('测试 shallowEquals', () => {
  it('值相等', () => {
    expect(shallowEquals({a: 1}, {a: 1})).toBe(true)
  })
  it('值不相等', () => {
    expect(shallowEquals({a: 1}, {a: 2})).toBe(false)
    expect(shallowEquals(null, null)).toBe(false)
  })
})
