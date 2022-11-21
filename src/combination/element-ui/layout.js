import { useLayout } from "@/stores/layout.js"
import { ref } from "vue"

export function useSearch() {
    const input1 = ref('')
    function toSearch() {
        const layoutStore = useLayout()
        layoutStore.searchOptions(input1.value)
        input1.value = ""
    }
    return {
        input1,
        toSearch,
    }
}