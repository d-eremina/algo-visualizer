import {NODE_COLORS} from "../Utils";
import MSTAlgo from "./MSTAlgo";

class Kruskal extends MSTAlgo {
    constructor(nodes, edges, elements, component, mainComponent) {
        super(nodes, edges, elements, component, mainComponent)
    }

    getCopy() {
        return super.getCopy()
    }

    findMst() {
        let states = []
        let mstEdges = []
        let changeNumbers = []

        states.push(this.getCopy())
        this.edges.sort(function (a, b) {
            return parseInt(a.label) - parseInt(b.label)
        })

        this.component.setState({
            edges: this.edges
        })

        let tree_id = {}
        let colors = {}

        let i = 1;
        states.push(this.getCopy())
        for (let key in this.nodes) {
            // По ключу - id ставим стиль вершине
            this.nodes[key].style = {backgroundColor: NODE_COLORS[i % NODE_COLORS.length]}
            // По id указываем название цвета
            colors[key] = NODE_COLORS[i % NODE_COLORS.length]
            // По id указываем номер компоненты связности
            tree_id[key] = i;
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
            if (tree_id[a.toString()] !== tree_id[b.toString()]) {
                let edge = this.elements.find((edge) => ((edge.id === a.toString() + "-" + b.toString())
                    || (edge.id === b.toString() + "-" + a.toString())))
                edge.style = {stroke: '#2ac932', opacity: '100%'}

                states.push(this.getCopy())
                mstEdges.push(JSON.parse(JSON.stringify(edge)))
                changeNumbers.push(states.length)
            }
            let old_component = tree_id[b.toString()],
                new_component = tree_id[a.toString()];
            for (let key in tree_id) {
                if (tree_id[key] === old_component) {
                    tree_id[key] = new_component
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

export default Kruskal;