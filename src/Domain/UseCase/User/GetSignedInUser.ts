import { getSignedInUser } from "../../../Data/Repository/UserRepository";

export function GetSignedInUserUserCase() {
    return getSignedInUser();
}