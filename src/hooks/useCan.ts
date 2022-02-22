import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { validateUserPermissions } from "../utils/validateUserPermissions";

type useCanParams = {
    permissions?: string[];
    roles?: string[];
}

export function useCan({ permissions, roles}: useCanParams){
    const { user, isAthenticated } = useContext(AuthContext);

    if (!isAthenticated) {
        return false;
    } 

    const userHasValidPermissions = validateUserPermissions({
        user,
        permissions, 
        roles 
    })

    return userHasValidPermissions
}