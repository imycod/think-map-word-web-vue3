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
              <td><label for="node-value">Value</label></td>
              <td><input v-model="table.nodeValue" id="node-value" type="text"/></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-label">Label</label></td>
              <td><input v-model="table.nodeLabel" id="node-label" type="text"/></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-partId">Parts</label></td>
              <td><input v-model="table.partId" id="node-partId" type="text"/></td>
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
              <td><input v-model="table.edgeFrom" id="edge-from" type="text"/></td>
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
import {onMounted, reactive, ref} from "vue"
import {DataSet, Network} from 'vis-network/standalone/esm/vis-network';
import {createNode, getNodeByLabel, getNodes,getEdges, updateNodes} from "@/apis/network"

export default {
  name: "creator",
  components: {},
  setup() {
    onMounted(async () => {
      await useNodes()
      await useEdges()
      draw()
    })
    const data = reactive({
      nodesOpt: [],
      edgesOpt: []
    })

    async function useNodes() {
      try {
        const res = await getNodes()
        data.nodes = res.result.map(node=>{
          return {
            ...node,
            label:node.value+node.label
          }
        })
      } catch (e) {

      }
    }
    async function useEdges(){
      try {
        const res = await getEdges()
        data.edges = res.result
      } catch (e) {

      }
    }

    function useTable() {
      const table = reactive({
        nodeId: '',
        nodeLabel: '',
        nodeValue:'',
        partId: '',
        edgeId: '',
        edgeFrom: '',
        edgeTo: '',
      })

      function addNode() {
        try {
          const record = {
            id: table.nodeId,
            label: table.nodeLabel,
            partId: table.partId,
          }
          createNode({value:table.nodeValue,...record})
          nodes.add({...record,label:table.nodeValue+table.nodeLabel});
          resetNode()
        } catch (err) {
          alert(err);
        }
      }

      function resetNode() {
        table.nodeId = ''
        table.nodeLabel = ''
        table.partId = ''
        table.nodeValue = ''
      }

      function updateNode() {
        try {
          const record = {
            id: table.nodeId,
            label: table.nodeLabel,
            partId: table.partId,
          }
          updateNodes({value:table.nodeValue,...record})
          nodes.update({...record,label:table.nodeValue+table.nodeLabel});
          resetNode()
        } catch (err) {
          alert(err);
        }
      }

      function removeNode() {
        try {
          nodes.remove({id: table.nodeId});
          table.nodeId = ''
        } catch (err) {
          alert(err);
        }
      }

      function addEdge() {
        try {
          edges.add({
            id: table.edgeId,
            from: table.edgeFrom,
            to: table.edgeTo,
          });
          resetEdge()
        } catch (err) {
          alert(err);
        }
      }

      function resetEdge() {
        table.edgeId = ''
        table.edgeFrom = ''
        table.edgeTo = ''
      }

      function updateEdge() {
        try {
          edges.update({
            id: table.edgeId,
            from: table.edgeFrom,
            to: table.edgeTo,
          });
          resetEdge()
        } catch (err) {
          alert(err);
        }
      }

      function removeEdge() {
        try {
          edges.remove({id: table.edgeId});
          table.edgeId = ''
        } catch (err) {
          alert(err);
        }
      }

      const checkList = ref([])
      return {
        addNode,
        updateNode,
        removeNode,
        addEdge,
        updateEdge,
        removeEdge,
        table,
        checkList,
      }
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
    } = useTable()

    let nodes, edges, network;

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
      const nodesOpt=[
        {id: "1", label: "Node 1"},
        {id: "2", label: "Node 2"},
        {id: "3", label: "Node 3"},
        {id: "4", label: "Node 4"},
        {id: "5", label: "Node 5"},
      ]
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
      const edgesOpt=[
        {id: "1", from: "1", to: "2", arrows: ""},
        {id: "2", from: "1", to: "3"},
        {id: "3", from: "2", to: "4"},
        {id: "4", from: "2", to: "5"},
      ]
      edges.add(data.edgesOpt);

      // create a network
      const container = document.getElementById("mynetwork");
      const data = {
        nodes: nodes,
        edges: edges,
      };
      const options = {};
      network = new Network(container, data, options);
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
    }
  }
}
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
