import {NODE_COLORS} from "../Utils";
import MSTAlgo from "./MSTAlgo";
import {isEdge} from "react-flow-renderer";

class Prim extends MSTAlgo {
    constructor(nodes, edges, elements, component, mainComponent) {
        super(nodes, edges, elements, component, mainComponent)
    }

    getCopy() {
        return super.getCopy()
    }

    isValidEdge(u, v, used) {
        if (u === v)
            return false
        if (used[u] === false && used[v] === false)
            return false
        else if (used[u] === true && used[v] === true)
            return false
        return true
    }

    findMst() {
        let states = []
        if ( Object.keys(this.nodes).length === 0) {
            return states
        }

        states.push(this.getCopy())
        let adj = {}
        let used = {}
        for (let key in this.nodes) {
            adj[key] = {}
            for (let to in this.nodes) {
                adj[key][to] = 1e9
            }
            used[key] = false
        }

        let start = Object.keys(this.nodes)[0]
        used[start] = true
        this.nodes[start].style = {backgroundColor: NODE_COLORS[0]}
        states.push(this.getCopy())

        let tempElements = JSON.parse(JSON.stringify(this.elements))
        for (let i = 0; i < tempElements.length; ++i) {
            if (isEdge(tempElements[i])) {
                let arr = tempElements[i].id.split('-')
                let a = arr[0]
                let b = arr[1]
                adj[a][b] = parseInt(tempElements[i].label)
                adj[b][a] = parseInt(tempElements[i].label)
            }
        }
        let edgesCount = 0
        while (edgesCount < Object.keys(this.nodes).length - 1) {
            let min = 1e9
            let a = -1, b = -1
            for (let i in this.nodes) {
                for (let j in this.nodes) {
                    if (this.isValidEdge(i, j, used) && adj[i][j] < 1e9) {
                        let tempEdge = this.elements.find((edge) => ((edge.id === i + "-" + j)
                            || (edge.id === j + "-" + i)))
                        if (JSON.stringify(tempEdge.style) !== '{"stroke":"#F3D6A1","opacity":"100%"}') {
                            tempEdge.style = {stroke: "#F3D6A1", opacity: "100%"}
                            states.push(this.getCopy())
                        }
                        if (adj[i][j] < min) {
                            min = adj[i][j]
                            a = i
                            b = j
                        }
                    }
                }
            }
            if (a !== -1 && b !== -1) {
                let edge = this.elements.find((edge) => ((edge.id === a + "-" + b)
                    || (edge.id === b + "-" + a)))
                edge.style = {stroke: "#2ac932", opacity: "100%"}
                states.push(this.getCopy())
                for (let i = 0; i < this.elements.length; ++i) {
                    if (isEdge(this.elements[i]) &&
                        JSON.stringify(this.elements[i].style) === '{"stroke":"#F3D6A1","opacity":"100%"}') {
                        this.elements[i].style = {stroke: 'grey', opacity: '80%'}
                    }
                }
                states.push(this.getCopy())
                ++edgesCount
                used[a] = true
                used[b] = true
                this.nodes[a].style = {backgroundColor: NODE_COLORS[0]}
                this.nodes[b].style = {backgroundColor: NODE_COLORS[0]}
                states.push(this.getCopy())
            }
        }
        for (let i = 0; i < this.elements.length; ++i) {
            if (isEdge(this.elements[i]) &&
                JSON.stringify(this.elements[i].style) !== '{"stroke":"#2ac932","opacity":"100%"}') {
                this.elements[i].style = {stroke: 'grey', opacity: '10%'}
            }
        }
        states.push(this.getCopy())
        return states
    }
}

export default Prim;