import { defineStore } from "pinia"
import config from "@/configs/index.js"
// default options
import option from "@/assets/data/conquest.json";

export const useLayout = defineStore('layout', {
    state() {
        return {
            option,
        }
    },
    actions: {
        // layout search key to fetch echarts graph
        async searchOptions(val) {
            console.log('val--------------------');
            console.log('val----', config.baseUrl);
            console.log('val--------------------end');
            // const res = fetch(config.baseUrl + `/assets/data/${val}.json`)
            // console.log(res.json());
        }
    }
})