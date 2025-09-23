import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useTabStore = defineStore('tab', () => {
    const tabIndex = ref<number>(0)

    return {
        tabIndex
    }
}, {
    persist: true
})