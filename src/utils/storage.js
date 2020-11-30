/**
 * 封装本地存储模块
 * */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 获取json字符串，尝试把data转换为js对象
    return JSON.parse(data)
  } catch (err) {
    // 若不是json字符串，直接原路返回
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
