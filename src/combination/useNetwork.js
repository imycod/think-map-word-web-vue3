import {onMounted, reactive} from "vue";
import {getEdges, getNodes} from "@/apis/network";
import {DataSet, Network} from "vis-network/standalone/esm/vis-network";

export default function useNetwork(networkOptions) {
    let nodes, edges, network;
    onMounted(async () => {
        await useNodes();
        await useEdges();
        draw();
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
        nodes = new DataSet();

        const {nodeOnCallback, edgeOnCallback}=networkOptions.on
        nodes.on("*", function () {
            nodeOnCallback && nodeOnCallback(nodes)
        });
        nodes.add(data.nodesOpt);

        edges = new DataSet();
        edges.on("*", function () {
            edgeOnCallback && edgeOnCallback(edges)
        });
        edges.add(data.edgesOpt);

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
        };
        network = new Network(
            container,
            {
                nodes: nodes,
                edges: edges,
            },
            options
        );
        const {onNetworkClick, onNetworkDoubleClick}=networkOptions.on
        network.on("click", (params) => {
            const id = params.nodes[0]
            console.log(id)
            onNetworkClick && onNetworkClick({
                ...params,
            })
        });
        network.on("doubleClick", (params) => {
            const id = params.nodes[0]
            onNetworkDoubleClick && onNetworkDoubleClick({
                ...params,
                node: nodes.get(id)
            })
        })
    }
}
