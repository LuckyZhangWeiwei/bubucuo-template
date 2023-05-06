import { create } from 'zustand';

interface GlobalStoreType {
    loading:boolean
}

const useGlobalStore = create<GlobalStoreType>((set)=>({
    loading:false
}))

export const showLoading = () => {
    useGlobalStore.setState({loading:true})
}
export const hideLoading = () => {
    useGlobalStore.setState({loading:false})
}
export default useGlobalStore;