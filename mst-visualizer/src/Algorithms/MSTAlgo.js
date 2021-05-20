class MSTAlgo {
    constructor(nodes, edges, elements, component, mainComponent) {
        this.edges = edges;
        this.mainComponent = mainComponent

        this.nodes = {}
        for (let i = 0; i < nodes.length; ++i) {
            this.nodes[nodes[i].id] = nodes[i];
        }
        this.elements = elements
        this.component = component
        this.dsu = {}
        this.rank = {}
    }

    getCopy() {
        return this.elements.map((x) => JSON.parse(JSON.stringify(x)));
    }
}

export default MSTAlgo;