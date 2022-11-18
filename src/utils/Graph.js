// import * as echarts from "echarts"
import echarts from "./import-loader/echarts.js"

class Graph {
    constructor(target) {
        this.init(target)
    }
    init(target) {
        this.chart = echarts.init(target);
        // this.myChart.showLoading();
    }
    initOption(graph) {
        const option = {
            tooltip: {},
            legend: [
                {
                    data: graph.categories.map(function (a) {
                        return a.name;
                    }),
                },
            ],
            series: [
                {
                    roam: true,
                    type: "graph",
                    layout: "force",
                    animation: false,
                    draggable: true,
                    data: graph.nodes.map(function (node, idx) {
                        node.id = idx;
                        return node;
                    }),
                    categories: graph.categories,
                    force: {
                        edgeLength: 5,
                        repulsion: 20,
                        gravity: 0.2,
                    },
                    edges: graph.links,
                    label: {
                        show: true,
                        position: "right",
                        formatter: "{b}",
                    },
                    labelLayout: {
                        hideOverlap: true,
                    },
                    scaleLimit: {
                        min: 0.4,
                        max: 2,
                    },
                    lineStyle: {
                        color: "source",
                        curveness: 0,
                    },
                },
            ],
        }
        this.setOption(option)
    }
    setOption(option) {
        this.chart.setOption(option);
        // this.myChart.hideLoading();
    }

}
export default Graph
