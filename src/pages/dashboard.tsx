import { useContext, useEffect } from "react"
import { withSSRAuth } from "../utils/withSSRAuth"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { useCan } from "../hooks/useCan"

export default function Dashboard(){
    const { user } = useContext(AuthContext)

    const userCanSeeMetrics = useCan({
        roles: ['administrator']
    })

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <h1>dashboard: {user?.email}</h1>

            {userCanSeeMetrics && <div>Métricas</div>}
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me')
   
    console.log(response)
    return {
        props: {}
    }
})