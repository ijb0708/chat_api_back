import * as auth from './author.js'
import * as bcrypt from './bcrypt.js'
import * as parser from './parser.js'

const global = {
    ...auth,
    ...bcrypt,
    ...parser
}

export default global