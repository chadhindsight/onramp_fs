// This is a work around for req.user being undefined in express. Double check later
import { Request } from "express"

interface SpecialReq extends Request {
    user: object // or any other type
}
export default SpecialReq