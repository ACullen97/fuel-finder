//not currently being used - for use later
export const apiErrors = async (api) => {
    try {
        const response = await fetch(api)
        if(!response.ok){
            if(response.status === 429){
                throw new Error('Rate limit exceeded, try again later')
            }
            //throw new Error(`HTTP Error: ${response.status}`)
        }
    } catch (error) {
        console.error(error.message)
        alert(error.message)
    }

}