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
              <td><input v-model="table.nodeId" id="node-id" type="text"/></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-value">单词</label></td>
              <td>
                <input v-model="table.nodeValue" id="node-value" type="text"/>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-label">名称</label></td>
              <td>
                <input v-model="table.nodeLabel" id="node-label" type="text"/>
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
              <td><input v-model="table.edgeId" id="edge-id" type="text"/></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-from">From</label></td>
              <td>
                <input v-model="table.edgeFrom" id="edge-from" type="text"/>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-to">To</label></td>
              <td><input v-model="table.edgeTo" id="edge-to" type="text"/></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="">Arrows</label></td>
              <td>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="无"/>
                  <el-checkbox label="from"/>
                  <el-checkbox label="to"/>
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
        <col width="25%"/>
        <col width="25%"/>
        <col width="50%"/>
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
import {onMounted, reactive, ref} from "vue";
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
import useNetwork from "@/combination/useNetwork";

export default {
  name: "creator",
  components: {},
  setup() {
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
          createNode({value: table.nodeValue, ...record});
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
          updateNodes({value: table.nodeValue, ...record});
          nodes.update({...record, label: table.nodeValue + table.nodeLabel});
          resetNode();
        } catch (err) {
          alert(err);
        }
      }

      function removeNode() {
        try {
          nodes.remove({id: table.nodeId});
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
          edges.remove({id: table.edgeId});
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

    function toJSON(obj) {
      return JSON.stringify(obj, null, 4);
    }

    function nodeOnCallback(nodes) {
      console.log(nodes.get())
      document.getElementById("nodes").innerText = JSON.stringify(
          nodes.get(),
          null,
          4
      );
    }

    function edgeOnCallback(edges) {
      console.log('edges-', edges.get())
      document.getElementById("edges").innerText = JSON.stringify(
          edges.get(),
          null,
          4
      );
    }

    const networkOptions = {
      id: 'mynetwork',
      on: {nodeOnCallback, edgeOnCallback}
    }
    useNetwork(networkOptions)


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
