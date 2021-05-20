import {NODE_COLORS} from "../Utils";
import MSTAlgo from "./MSTAlgo";

class KruskalDSU extends MSTAlgo {
    constructor(nodes, edges, elements, component, mainComponent) {
        super(nodes, edges, elements, component, mainComponent)
    }

    getCopy() {
        return super.getCopy()
    }

    dsuGet(v) {
        if (v === this.dsu[v])
            return v;
        return this.dsu[v] = this.dsuGet(this.dsu[v])
    }

    dsuUnite(a, b) {
        a = this.dsuGet(a);
        b = this.dsuGet(b);
        if (a !== b) {
            if (this.rank[a] < this.rank[b]) {
                [a, b] = [b, a]
            }
            this.dsu[b] = a;
            if (this.rank[a] === this.rank[b])
                ++this.rank[a];
        }
    }

    findMst() {
        let states = []
        let changeNumbers = []
        let mstEdges = []

        states.push(this.getCopy())
        this.edges.sort(function (a, b) {
            return parseInt(a.label) - parseInt(b.label)
        })

        this.component.setState({
            edges: this.edges
        })

        let colors = {}

        let i = 1;
        states.push(this.getCopy())
        for (let key in this.nodes) {
            // По ключу - id ставим стиль вершине
            this.nodes[key].style = {backgroundColor: NODE_COLORS[i % NODE_COLORS.length]}
            // По id указываем название цвета
            colors[key] = NODE_COLORS[i % NODE_COLORS.length]
            this.dsu[key] = key
            this.rank[key] = 0
            ++i;
        }
        states.push(this.getCopy())

        for (let i = 0; i < this.edges.length; ++i) {
            let arr = this.edges[i].id.split('-')
            // Id связанных вершин
            let a = parseInt(arr[0])
            let b = parseInt(arr[1])
            let temp_edge = this.elements.find((edge) => ((edge.id === a.toString() + "-" + b.toString())
                || (edge.id === b.toString() + "-" + a.toString())))
            temp_edge.style = {stroke: 'grey', opacity: '10%'}
            states.push(this.getCopy())
            if (this.dsuGet(a) !== this.dsuGet(b)) {
                let edge = this.elements.find((edge) => ((edge.id === a.toString() + "-" + b.toString())
                    || (edge.id === b.toString() + "-" + a.toString())))
                edge.style = {stroke: '#2ac932', opacity: '100%'}

                states.push(this.getCopy())
                mstEdges.push(JSON.parse(JSON.stringify(edge)))
                changeNumbers.push(states.length)
                this.dsuUnite(a, b)
            }
            for (let key in this.nodes) {
                if (this.dsuGet(key) === this.dsuGet(a)) {
                    colors[key] = colors[a.toString()]
                    this.nodes[key].style = {backgroundColor: colors[key]}
                }
            }
            states.push(this.getCopy())
        }
        this.mainComponent.setState({mstEdges: mstEdges})
        this.mainComponent.setState({changeStates: changeNumbers})
        return states
    }
}

export default KruskalDSU;