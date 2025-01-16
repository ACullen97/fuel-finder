//not used yet - need to wrap this around the api funcions and set the limit - KH
export const asyncRateLimit = (fn, limit) => {
    const lastCallTime = 0;

    return(...args) => {
        const now = data.now();
        if(now.lastCallTime >= limit){
            lastCallTime = now;
            return fn(...args)
        } else {
            console.log('Rate limit exceeded - stopping API call');
            return null;
        }
    }
}