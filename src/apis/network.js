import axios from "@/request/index"

function createNode(data) {
    return axios.post('/network/node/create',data)
}

function createEdge(data) {
    return axios.post('/network/edge/create',data)
}

function updateNodes(data) {
    return axios.post('/network/node/update',data)
}

function getNodeByLabel(label) {
    return axios.get(`/network/node/${label}`)
}

function getNodes() {
    return axios.get('/network/node/all')
}

function getEdges() {
    return axios.get('/network/edge/all')
}

export {
    createNode,
    createEdge,
    updateNodes,
    getNodeByLabel,
    getNodes,
    getEdges,
}
