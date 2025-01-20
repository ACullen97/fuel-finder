import * as Network from 'expo-network';

export const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
        console.log(networkState)//debugging***
    return networkState.isConnected && networkState.isInternetReachable;
}