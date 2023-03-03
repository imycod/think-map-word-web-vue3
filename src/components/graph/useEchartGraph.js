import Graph from "@/utils/Graph.js";
import {onMounted, ref, defineEmits} from "vue";

const emits = defineEmits(['chartClick'])
export default function useEchartGraph(id = 'main') {
    let graph = null;
    onMounted(async () => {
        const dom = document.getElementById(id)
        graph = new Graph(dom);
        const res = await useFetch()
        graph.chart.setOption(res.data)
        graph.chart.on("click", handleClick);
        window.addEventListener("resize", resize, false);
    });

    function resize() {
        graph.chart.resize();
    }

    function handleClick(params) {
        emits('chartClick', params)
    }

    async function useFetch() {

        return []
    }
}
