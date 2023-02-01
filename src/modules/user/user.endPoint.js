import {roles} from '../../middleware/auth.js'
import { blockAccount } from './controller/user.js'
const endPoint={
    add:[roles.Admin,roles.User],
    update:[roles.User,roles.Admin],
    delete:[roles.Admin],
    block:[roles.Admin]
}
export default  endPoint