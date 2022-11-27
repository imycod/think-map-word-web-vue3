import { useSearch as useSearchStore } from "@/stores/search.js"
import { ref } from "vue"

export function useLayoutSearch() {
    const input1 = ref('')
    function toSearch() {
        const searchStore = useSearchStore()
        searchStore.searchOptions(input1.value)
        input1.value = ""
    }
    return {
        input1,
        toSearch,
    }
}
