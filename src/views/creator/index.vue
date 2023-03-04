<template>
  <div class="creator-wrapper">
    <h1>Adjust</h1>
    <table>
      <tr>
        <td>
          <h2>Node</h2>
          <table>
            <tr>
              <td></td>
              <td><label for="node-id">Id</label></td>
              <td><input v-model="table.nodeId" id="node-id" type="text" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-value">单词</label></td>
              <td>
                <input v-model="table.nodeValue" id="node-value" type="text" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-label">名称</label></td>
              <td>
                <input v-model="table.nodeLabel" id="node-label" type="text" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-understood">理解</label></td>
              <td>
                <input
                  v-model="table.nodeUnderstood"
                  id="node-understood"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-parts">词性</label></td>
              <td>
                <el-select
                  v-model="table.parts"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="Select"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in parts"
                    :key="item.value"
                    :label="item.name"
                    :value="item"
                  />
                </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-levels">范围</label></td>
              <td>
                <el-select
                  v-model="table.levels"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="Select"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.name"
                    :value="item"
                  />
                </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Action</td>
              <td>
                <button id="node-add" @click="addNode">Add</button>
                <button id="node-update" @click="updateNode">Update</button>
                <button id="node-remove" @click="removeNode">Remove</button>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <h2>Edge</h2>
          <table>
            <tr>
              <td></td>
              <td><label for="edge-id">Id</label></td>
              <td><input v-model="table.edgeId" id="edge-id" type="text" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-from">From</label></td>
              <td>
                <input v-model="table.edgeFrom" id="edge-from" type="text" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-to">To</label></td>
              <td><input v-model="table.edgeTo" id="edge-to" type="text" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="">Arrows</label></td>
              <td>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="无" />
                  <el-checkbox label="from" />
                  <el-checkbox label="to" />
                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Action</td>
              <td>
                <button id="edge-add" @click="addEdge">Add</button>
                <button id="edge-update" @click="updateEdge">Update</button>
                <button id="edge-remove" @click="removeEdge">Remove</button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <h1>View</h1>
    <table class="view">
      <colgroup>
        <col width="25%" />
        <col width="25%" />
        <col width="50%" />
      </colgroup>
      <tr>
        <td>
          <h2>Nodes</h2>
          <pre id="nodes"></pre>
        </td>

        <td>
          <h2>Edges</h2>
          <pre id="edges"></pre>
        </td>

        <td>
          <h2>Network</h2>

          <div id="mynetwork"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import parts from "@/enums/parts";
import levels from "@/enums/levels";
import {
  createNode,
  createEdge,
  getNodeByLabel,
  getNodes,
  getEdges,
  updateNodes,
} from "@/apis/network";

export default {
  name: "creator",
  components: {},
  setup() {
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

    function useTable() {
      const table = reactive({
        nodeId: "",
        nodeLabel: "",
        nodeUnderstood: "", // 对于单词的解释,理解
        nodeValue: "",
        parts: [], // 词性
        levels: [], // 级数
        edgeId: "",
        edgeFrom: "",
        edgeTo: "",
      });

      function addNode() {
        let parts = {};
        let nodeLabel = table.nodeLabel;
        let prefix = "";
        table.parts.forEach((item) => {
          parts[item.short] = 1;
          prefix += item.short + "/";
        });
        nodeLabel = ";" + prefix + nodeLabel;
        let levels = {};
        table.levels.forEach((item) => {
          levels[item.value] = 1;
        });
        try {
          const record = {
            id: Number(table.nodeId),
            label: table.nodeLabel,
            understood: table.nodeUnderstood,
            ...parts,
            ...levels,
          };
          createNode({ value: table.nodeValue, ...record });
          nodes.add({
            id: table.nodeId,
            label: table.nodeValue + nodeLabel,
          });
          resetNode();
        } catch (err) {
          alert(err.message);
        }
      }

      function resetNode() {
        table.nodeId = "";
        table.nodeLabel = "";
        table.nodeUnderstood = "";
        table.parts = [];
        table.levels = [];
        table.nodeValue = "";
      }

      function updateNode() {
        try {
          const record = {
            id: table.nodeId,
            label: table.nodeLabel,
            partId: table.partId,
          };
          updateNodes({ value: table.nodeValue, ...record });
          nodes.update({ ...record, label: table.nodeValue + table.nodeLabel });
          resetNode();
        } catch (err) {
          alert(err);
        }
      }

      function removeNode() {
        try {
          nodes.remove({ id: table.nodeId });
          table.nodeId = "";
        } catch (err) {
          alert(err);
        }
      }

      function addEdge() {
        try {
          const edge = {
            id: table.edgeId,
            from: table.edgeFrom,
            to: table.edgeTo,
            arrows: checkList.value.join(","),
          };
          edges.add(edge);
          createEdge(edge);
          resetEdge();
        } catch (err) {
          alert(err);
        }
      }

      function resetEdge() {
        table.edgeId = "";
        table.edgeFrom = "";
        table.edgeTo = "";
      }

      function updateEdge() {
        try {
          edges.update({
            id: table.edgeId,
            from: table.edgeFrom,
            to: table.edgeTo,
            arrows: "",
          });
          resetEdge();
        } catch (err) {
          alert(err);
        }
      }

      function removeEdge() {
        try {
          edges.remove({ id: table.edgeId });
          table.edgeId = "";
        } catch (err) {
          alert(err);
        }
      }

      const checkList = ref([]);
      return {
        addNode,
        updateNode,
        removeNode,
        addEdge,
        updateEdge,
        removeEdge,
        table,
        checkList,
      };
    }

    const {
      addNode,
      updateNode,
      removeNode,
      addEdge,
      updateEdge,
      removeEdge,
      table,
      checkList,
    } = useTable();

    // convenience method to stringify a JSON object
    function toJSON(obj) {
      return JSON.stringify(obj, null, 4);
    }

    function draw() {
      // create an array with nodes
      nodes = new DataSet();
      nodes.on("*", function () {
        document.getElementById("nodes").innerText = JSON.stringify(
          nodes.get(),
          null,
          4
        );
      });
      const nodesOpt = [
        // { id: "1", label: "Node 1" },
        // { id: "2", label: "Node 2" },
        // { id: "3", label: "Node 3" },
        // { id: "4", label: "Node 4" },
        // { id: "5", label: "Node 5" },
      ];
      nodes.add(data.nodesOpt);

      // create an array with edges
      edges = new DataSet();
      edges.on("*", function () {
        document.getElementById("edges").innerText = JSON.stringify(
          edges.get(),
          null,
          4
        );
      });
      const edgesOpt = [
        // { id: "1", from: "1", to: "2", arrows: "" },
        // { id: "2", from: "1", to: "3" },
        // { id: "3", from: "2", to: "4" },
        // { id: "4", from: "2", to: "5" },
      ];
      edges.add(data.edgesOpt);

      // create a network
      const container = document.getElementById("mynetwork");
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

      network.on("click", function (params) {
        params.event = "[original event]";

        console.log(
          "click event, getNodeAt returns: " +
            this.getNodeAt(params.pointer.DOM)
        );
      });
      network.on("doubleClick", function (params) {
        params.event = "[original event]";
      });
    }

    return {
      addNode,
      updateNode,
      removeNode,
      addEdge,
      updateEdge,
      removeEdge,
      table,
      checkList,
      parts,
      levels,
    };
  },
};
</script>

<style lang="less" scoped>
.creator-wrapper {
  h1 {
    font-size: 150%;
    margin: 5px 0;
  }

  h2 {
    font-size: 100%;
    margin: 5px 0;
  }

  table.view {
    width: 100%;
  }

  table td {
    vertical-align: top;
  }

  table table {
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
  }

  table table td {
    vertical-align: middle;
  }

  input[type="text"],
  pre {
    border: 1px solid lightgray;
  }

  pre {
    margin: 0;
    padding: 5px;
    font-size: 10pt;
  }

  #mynetwork {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }
}
</style>
