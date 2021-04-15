const shallowEquals = (objA, objB) => {
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  const someNotEquals = keysA.some(keyA => !objA[keyA] || objA[keyA] !== objB[keyA])

  return !someNotEquals
}

export default shallowEquals
