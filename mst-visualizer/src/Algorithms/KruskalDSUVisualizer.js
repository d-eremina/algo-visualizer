import {isEdge} from "react-flow-renderer";

class KruskalDSUVisualizer {
    constructor(mainComponent) {
        this.mainComponent = mainComponent
        this.dsu = {}
        this.rank = {}
        this.nodes = {}
        for (let i = 0; i < this.mainComponent.state.nodes.length; ++i) {
            this.nodes[this.mainComponent.state.nodes[i].id] = this.mainComponent.state.nodes[i];
        }
    }

    dsuGet(v) {
        if (v === this.dsu[v])
            return v;
        return this.dsu[v] = this.dsuGet(this.dsu[v])
    }

    async initState() {
        for (let key in this.nodes) {
            this.dsu[key] = key
            this.rank[key] = 0
        }
        for (let key in this.dsu) {
            const newNode = {
                id: key,
                type: 'customnode',
                position: {x: 0, y: 0}
            }
            await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newNode)})
        }
        await this.placeComponents()
    }

    async placeComponents() {
        let adj = {}
        let visited = {}
        for (let key in this.nodes) {
            adj[key] = []
        }
        let tempElements = JSON.parse(JSON.stringify(this.mainComponent.state.elements))
        for (let i = 0; i < tempElements.length; ++i) {
            if (isEdge(tempElements[i])) {
                let arr = tempElements[i].id.split('-')
                let a = arr[0]
                let b = arr[1]

                adj[a].push(b)
                adj[b].push(a)
            } else {
                visited[tempElements[i].id] = false
            }
        }

        let current = Object.keys(visited).find(key => visited[key] === false)

        let y = 15
        let dy = 70
        while (current !== undefined) {
            let max = 0
            let layers = {}
            let s = this.dsuGet(current)
            layers[s] = 0
            let queue = []
            queue.push(s)
            visited[s] = true
            while (queue.length > 0) {
                let v = queue.shift()
                for (let neighbor of adj[v]) {
                    if (!visited[neighbor]) {
                        queue.push(neighbor)
                        max = layers[v] + 1 > max ? layers[v] + 1 : max
                        layers[neighbor] = layers[v] + 1
                        visited[neighbor] = true
                    }
                }
            }
            current = Object.keys(visited).find(key => visited[key] === false)

            for (let i = 0; i <= max; ++i) {
                let layerNodes = Object.keys(layers).filter(key => layers[key] === i)
                let dx = 60
                let x = 250 - 60 * (layerNodes.length - 1) / 2
                for (let j = 0; j < layerNodes.length; ++j) {
                    this.nodes[layerNodes[j]].position = {x: x, y: y}
                    x += dx
                }
                y += dy
            }
        }
        await this.updateElements()
    }

    async updateElements() {
        let edges = []
        for (let i = 0; i < this.mainComponent.state.elements.length; ++i) {
            if (isEdge(this.mainComponent.state.elements[i])) {
                let edge = {
                    id: this.mainComponent.state.elements[i].id,
                    source: this.mainComponent.state.elements[i].source,
                    target: this.mainComponent.state.elements[i].target,
                    animated: false,
                    style: {stroke: '#000000', opacity: '100%'},
                }
                edges.push(edge)
            }
        }
        await this.mainComponent.setState({elements: edges})

        for (let key in this.nodes) {
            const newNode = JSON.parse(JSON.stringify(this.nodes[key]))
            await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newNode)})
        }
    }

    async initComponents(newEdge) {
        let arr = newEdge.id.split('-')
        let a = arr[0]
        let b = arr[1]

        // Визуализация сжатия
        await this.compressPath(a, b)
        await this.placeComponents()
        await this.mainComponent.trySleep(2000)

        //await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newEdge)})
       // await this.mainComponent.trySleep(2000)

        // Переподвешивание
        let oldRoot = this.dsuGet(a)
        let newRoot = this.dsuGet(b)
        await this.processChoice(oldRoot, newRoot)
        await this.placeComponents()
    }

    async compressPath(a, b) {
        let aParent = this.dsu[a]
        let bParent = this.dsu[b]

        let aRoot = this.dsuGet(a)
        let bRoot = this.dsuGet(b)

        let edgesToAdd = []
        let tempElements = JSON.parse(JSON.stringify(this.mainComponent.state.elements))
        let tempEdge = tempElements.find((edge) => ((edge.id === a + "-" + aParent)
            || (edge.id === aParent + "-" + a)))
        if (tempEdge !== undefined) {
            const index = tempElements.indexOf(tempEdge);
            if (index > -1) {
                tempElements.splice(index, 1);
            }
        }

        if (a !== aRoot) {
            const aRootEdge = {
                id: aRoot + "-" + a,
                source: this.nodes[aRoot].id,
                target: this.nodes[a].id,
                animated: false,
                style: {stroke: '#000000', opacity: '100%'},
            }
            edgesToAdd.push(aRootEdge)
        }
        tempEdge = tempElements.find((edge) => ((edge.id === b + "-" + bParent)
            || (edge.id === bParent + "-" + b)))
        if (tempEdge !== undefined) {
            const index = tempElements.indexOf(tempEdge);
            if (index > -1) {
                tempElements.splice(index, 1);
            }
        }
        if (b !== bRoot) {
            const bRootEdge = {
                id: bRoot + "-" + b,
                source: this.nodes[bRoot].id,
                target: this.nodes[b].id,
                animated: false,
                style: {stroke: '#000000', opacity: '100%'},
            }
            edgesToAdd.push(bRootEdge)
        }

        await this.mainComponent.setState({elements: tempElements.concat(edgesToAdd)})
    }

    async processChoice(oldRoot, newRoot) {
        if (this.rank[oldRoot] < this.rank[newRoot]) {
            [oldRoot, newRoot] = [newRoot, oldRoot]
        }
        this.dsu[newRoot] = oldRoot
        if (this.rank[oldRoot] === this.rank[newRoot]) {
            ++this.rank[oldRoot]
        }
        // Показываем, куда переподвесим
        const treeEdge = {
            id: this.nodes[oldRoot].id + "-" + this.nodes[newRoot].id,
            source: this.nodes[oldRoot].id,
            target: this.nodes[newRoot].id,
            animated: true,
            arrowHeadType: 'arrowclosed',
            style: {stroke: '#FF5765', opacity: '100%'}
        }
        let tempElements = JSON.parse(JSON.stringify(this.mainComponent.state.elements.concat(treeEdge)))
        await this.mainComponent.setState({elements: tempElements})
        await this.mainComponent.trySleep(2000)
        tempElements.pop()
        const newEdge = {
            id: this.nodes[oldRoot].id + "-" + this.nodes[newRoot].id,
            source: this.nodes[oldRoot].id,
            target: this.nodes[newRoot].id,
            animated: false,
            style: {stroke: '#000000', opacity: '100%'}
        }
        await this.mainComponent.setState({elements: tempElements.concat(newEdge)})
    }
}

export default KruskalDSUVisualizer;