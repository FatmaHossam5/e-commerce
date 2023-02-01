import {roles} from '../../middleware/auth.js'
const endPoint={
    add:[roles.Admin,roles.User],
    update:[roles.User,roles.Admin]
}
export default  endPoint