// 1.方式一：手动的切换不同的环境(不推荐)
// const BASE_URL = "http://coderwhy.org/dev"
// const BASE_NAME = "coderWest"

// const BASE_URL = "http://coderwhy.org/prod"
// const BASE_NAME = "kobe"

// const BASE_URL = "http://coderwhy.org/test"
// const BASE_NAME = "james"

// 2.根据 process.env.NODE_ENV 区分
// 开发环境： development
// 生产环境： production
// 测试环境： test
let BASE_URL = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://coderwhy.org/prod"
} else {
  BASE_URL = "http://coderwhy.org/test"
}
// console.log(process.env.NODE_ENV)

export { BASE_URL, TIME_OUT }
