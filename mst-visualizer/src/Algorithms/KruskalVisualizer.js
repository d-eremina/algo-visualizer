import {isEdge} from "react-flow-renderer";

class KruskalVisualizer {
    constructor(mainComponent) {
        this.mainComponent = mainComponent
        this.components = {}
    }

    async initState() {
        this.components = {}
        for (let i = 0; i < this.mainComponent.state.nodes.length; ++i) {
            this.components[i + 1] = [this.mainComponent.state.nodes[i]]
        }
        for (let key in this.components) {
            for (let i = 0; i < this.components[key].length; ++i) {
                const newNode = {
                    id: this.components[key][i].id,
                    data: {id: this.components[key][i].id, component: key},
                    type: 'componentnode',
                    position: {x: 0, y: 0}
                }
                await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newNode)})
            }
        }
        await this.placeComponents()
    }

    async placeComponents() {
        let n_components = Object.keys(this.components).length
        let y = n_components === 1 ? 340 : 15
        let dy = 670 / (n_components - 1)
        for (let key in this.components) {
            let component_length = this.components[key].length
            let dx = 60
            let x = 250 - 60 * (component_length - 1) / 2
            for (let i = 0; i < component_length; ++i) {
                this.components[key][i].data =
                    {id: this.components[key][i].id, component: key.toString()}
                this.components[key][i].position = {x: x, y: y}
                x += dx
            }
            y += dy
        }
        await this.updateElements()
    }

    async updateElements() {
        let edges = []
        for (let i = 0; i < this.mainComponent.state.elements.length; ++i) {
            if (isEdge(this.mainComponent.state.elements[i])) {
                edges.push(this.mainComponent.state.elements[i])
            }
        }
        await this.mainComponent.setState({elements: edges})
        for (let key in this.components) {
            for (let i = 0; i < this.components[key].length; ++i) {
                const newNode = {
                    id: this.components[key][i].id,
                    data: {id: this.components[key][i].id, component: key},
                    type: 'componentnode',
                    position: this.components[key][i].position
                }
                await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newNode)})
            }
        }
    }

    async initComponents(newEdge) {
        await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(newEdge)})
        await this.mainComponent.trySleep(1000)

        let arr = newEdge.id.split('-')
        let a = parseInt(arr[0])
        let b = parseInt(arr[1])
        let old_component, new_component
        for (let key in this.components) {
            for (let i = 0; i < this.components[key].length; ++i) {
                if (this.components[key][i].id === b.toString()) {
                    old_component = key
                }
                if (this.components[key][i].id === a.toString()) {
                    new_component = key
                }
            }
        }
        await this.processChoice(old_component, new_component)
        for (let i = 0; i < this.components[old_component].length; ++i) {
            this.components[new_component].push(this.components[old_component][i])
        }
        delete this.components[old_component]
        const componentEdge = {
            id: newEdge.id,
            source: newEdge.source,
            target: newEdge.target,
            animated: false,
            style: {stroke: '#000000', opacity: '100%'}
        }
        await this.mainComponent.setState({elements: this.mainComponent.state.elements.concat(componentEdge)})
        await this.placeComponents()
    }

    async processChoice(oldComponent, newComponent) {
        for (let i = 0; i < this.mainComponent.state.elements.length; ++i) {
            if (isEdge(this.mainComponent.state.elements[i])) {
                continue
            }
            let tempElements = JSON.parse(JSON.stringify(this.mainComponent.state.elements))
            tempElements[i].style = {backgroundColor: '#F9D876'}
            await this.mainComponent.setState({elements: JSON.parse(JSON.stringify(tempElements))})
            await this.mainComponent.trySleep(1000)
            if (tempElements[i].data.component === oldComponent ||
                tempElements[i].data.component === newComponent) {
                tempElements[i].style = {backgroundColor: '#C5E5A5'}
            } else {
                tempElements[i].style = {backgroundColor: '#FF5765'}
            }
            await this.mainComponent.setState({elements: JSON.parse(JSON.stringify(tempElements))})
            await this.mainComponent.trySleep(1000)
        }
    }
}

export default KruskalVisualizer;