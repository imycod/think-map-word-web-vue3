import {onMounted, reactive, toRef, ref, onUnmounted} from "vue";
import {getEdges, getNodes} from "@/apis/network";
import {DataSet, Network} from "vis-network/standalone/esm/vis-network";

export default function useNetwork(networkOptions) {
    let nodes = ref(null), edges = ref(null), network = null

    onMounted(async () => {
        await useNodes();
        await useEdges();
        draw();
    });

    onUnmounted(() => {
        network.destroy();
    });

    const data = reactive({
        nodesOpt: [],
        edgesOpt: [],
    });

    async function useNodes() {
        try {
            const res = await getNodes();
            if (res.code === 200) {
                data.nodesOpt = res.result.map((node) => {
                    return {
                        id: node.id,
                        label: node.value + node.label,
                        title: "单击发音,双击详情",
                        // font: { size: 12, color: "red", face: "sans", background: "white" },
                    };
                });
            }
        } catch (e) {
            console.log("error", e.message);
        }
    }

    async function useEdges() {
        try {
            const res = await getEdges();
            if (res.code === 200) {
                data.edgesOpt = res.result;
            }
        } catch (e) {
            console.log("error", e.message);
        }
    }

    function draw() {
        nodes.value = new DataSet();

        const {nodeOnCallback, edgeOnCallback} = networkOptions.on
        nodes.value.on("*", function () {
            nodeOnCallback && nodeOnCallback(nodes.value)
        });
        nodes.value.add(data.nodesOpt);

        edges.value = new DataSet();
        edges.value.on("*", function () {
            edgeOnCallback && edgeOnCallback(edges.value)
        });
        edges.value.add(data.edgesOpt);

        const {id} = networkOptions
        const container = document.getElementById(id);
        const options = {
            nodes: {
                shape: "dot",
                size: 10,
            },
            edges: {
                smooth: {
                    type: "continuous",
                    forceDirection: "none",
                    roundness: 1,
                },
            },
            interaction: {
                dragNodes: true, //启用拖拽节点功能
                dragView: true, //启用拖拽视图功能
            }
        };

        network = new Network(
            container,
            {
                nodes: nodes.value,
                edges: edges.value,
            },
            options
        );

        const {networkClick, networkDoubleClick, beforeDrawing} = networkOptions.on
        network.on("click", (params) => {
            const id = params.nodes[0]
            console.log(id)
            networkClick && networkClick({
                ...params,
            })
        });
        network.on("doubleClick", (params) => {
            const id = params.nodes[0]
            networkDoubleClick && networkDoubleClick({
                ...params,
                node: nodes.value.get(id)
            })
        })

        // network.on("beforeDrawing", (ctx) => {
        //     beforeDrawing && beforeDrawing(ctx, network)
        // });

    }


    function removeEdges(edgeId) {
        const edgeToRemove = edges.value.get(edgeId);
        if (edgeToRemove) {
            edges.value.remove(edgeToRemove);
        }
    }

    return {
        nodes: nodes.value,
        edges: toRef(edges, 'value'),
        network,
        removeEdges,
    }
}


export function demo() {
    // 创建一个简单的网络图形
    var nodes = new DataSet([
        {id: 1, label: 'Node 1', physics: false},
        {id: 2, label: 'Node 2', physics: false},
        {id: 3, label: 'Node 3', physics: false},
        {id: 4, label: 'Node 4', physics: false},
        {id: 5, label: 'Node 5', physics: false}
    ]);
    var edges = new DataSet([]);
    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new Network(container, data, options);

    // 定义一个变量，用于存储拖拽起始节点的ID
    var draggedNodeId = null;

    // 监听节点的拖拽事件
    network.on('dragStart', function (event) {
        // 记录拖拽起始节点的ID
        draggedNodeId = event.nodes[0];
    });

    // 监听节点的拖拽结束事件
    network.on('dragEnd', function (event) {
        // 如果拖拽结束时有目标节点，则创建一条边连接两个节点
        if (event.nodes.length > 0) {
            var targetNodeId = event.nodes[0];
            // 如果目标节点不是拖拽起始节点，则创建一条边连接两个节点
            // 获取鼠标指针的位置
            var canvasPosition = event.pointer.canvas;
            console.log('targetNodeId-----------------',targetNodeId)
            //创建新的连线
            var newEdge = {from: targetNodeId, to: null};
            //查找最近的节点
            var nearestNode = network.getNodeAt(canvasPosition);
            //如果找到了最近的节点，则更新新连线的目标节点
            if (nearestNode !== undefined) {
                newEdge.to = nearestNode;
            }
            //将新连线添加到vis-network中
            edges.add(newEdge);

            //重置拖拽节点的ID
            draggedNodeId = null;

        }
        // 清空拖拽起始节点的ID
        draggedNodeId = null;
    });
}
