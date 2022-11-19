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
        // graph.nodes.forEach(function (node) {
        //     node.label = {
        //         show: node.symbolSize > 30
        //     };
        // });
        const option = {
            tooltip: {},
            legend: [
                {
                    data: graph.categories.map(function (a) {
                        return a.name;
                    }),
                },
            ],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series:  [
                {
                    roam: true,
                    type: "graph",
                    layout: "force",
                    animation: false,
                    draggable: true,
                    // symbolSize: 50,
                    // symbolSize: (value, params) => {
                    //     //根据数据params中的data来判定数据大小
                    //     switch (params.data.category) {
                    //         case 0:return 150;break;
                    //         case 1:return 30;break;
                    //         case 2:return 20;break;
                    //         default:return 10;
                    //     };
                    // },
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
                    edgeSymbol: ['arrow'],
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
