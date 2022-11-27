import { defineStore } from "pinia"

import request from "@/request/index.js"
// default options
import option from "@/assets/data/conquest.json";

export const useSearch = defineStore('search', {
    state() {
        return {
            option,
        }
    },
    actions: {
        // layout search key to fetch echarts graph
        async searchOptions(val) {
            const {code,data} = await request('/' + val.split('')[0],{ params:{ word:val } })
            this.option=data
        }
    }
})
