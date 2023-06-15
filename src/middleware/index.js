import * as author from './author.js'
import * as error from './error.js'

const middleware = {
    ...author,
    ...error
}

export default middleware