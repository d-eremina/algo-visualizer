import React, {Component} from "react";
import ProcessHandler from "./ProcessComponent";
import ReactFlow, {
    Background,
    Controls,
    isEdge,
    ReactFlowProvider,
    removeElements
} from "react-flow-renderer";
import EdgesTable from "./EdgesComponent";
import KruskalDSU from "../Algorithms/KruskalDSU";
import Kruskal from "../Algorithms/Kruskal";
import {nodeTypes, options, sleep, getRandomInt} from "../Utils";
import Prim from "../Algorithms/Prim";
import ModalWindow from "./ModalEdgeComponent";
import ModalInfo from "./ModalInfoComponent";
import ModalGraphInputComponent from "./ModalGraphInputComponent";

class OverviewFlow extends Component {
    constructor(props) {
        super(props);

        this.changeState = this.changeState.bind(this)
        this.clear = this.clear.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.perform = this.perform.bind(this)
        this.onElementsRemove = this.onElementsRemove.bind(this)
        this.stepForward = this.stepForward.bind(this)
        this.stepBack = this.stepBack.bind(this)
        this.pause = this.pause.bind(this)
        this.onInfoOpen = this.onInfoOpen.bind(this)
        this.onConnect = this.onConnect.bind(this)
        this.onClick = this.onClick.bind(this)
        this.getFinal = this.getFinal.bind(this)
        this.onEdgeSubmit = this.onEdgeSubmit.bind(this)
        this.onGraphInput = this.onGraphInput.bind(this)

        this.state = {
            reactFlowInstance: null,
            elements: [],
            edges: [],
            states: [],
            id: 0,
            isGraphModalActive: false,
            isInfoActive: false,
            isGraphInputActive: false,
            edgeWeight: -1,
            firstVertex: 0,
            secondVertex: 0,
        }
    }

    async changeState(step) {
        if (!(this.props.mainComponent.state.stepNumber + step < 0 ||
            this.props.mainComponent.state.stepNumber + step >= this.state.states.length)) {
            await this.props.mainComponent.changeStep(this.props.mainComponent.state.stepNumber + step,
                step < 0)
            await this.setState({elements: this.state.states[this.props.mainComponent.state.stepNumber]})
        }
    }

    onElementsRemove(elementsToRemove) {
        this.setState({elements: removeElements(elementsToRemove, this.state.elements)})
        this.setState({edges: removeElements(elementsToRemove, this.state.edges)})
    }

    onLoad(reactFlowInstance) {
        reactFlowInstance.fitView();
        this.setState({reactFlowInstance: reactFlowInstance})
    }

    async clear() {
        await this.setState({elements: []})
        await this.setState({edges: []})
        await this.setState({states: []})
        await this.setState({id: 0})
        await this.props.mainComponent.clear()
    }

    isConnected(nodes) {
        if (nodes.length === 0) {
            return true
        }
        let used = {}
        let adj = {}
        for (let i = 0; i < nodes.length; ++i) {
            adj[nodes[i].id] = []
            used[nodes[i].id] = false
        }
        let tempElements = JSON.parse(JSON.stringify(this.state.elements))
        for (let i = 0; i < tempElements.length; ++i) {
            if (isEdge(tempElements[i])) {
                let arr = tempElements[i].id.split('-')
                let a = arr[0]
                let b = arr[1]
                adj[a].push(b)
                adj[b].push(a)
            }
        }
        let queue = []
        queue.push(nodes[0].id)
        used[nodes[0].id] = true
        while (queue.length > 0) {
            let v = queue.shift()
            for (let neighbor of adj[v]) {
                if (!used[neighbor]) {
                    queue.push(neighbor)
                    used[neighbor] = true
                }
            }
        }
        return Object.keys(used).find(key => used[key] === false) === undefined
    }

    async findMst() {
        let nodes = []
        for (let i = 0; i < this.state.elements.length; ++i) {
            if (!isEdge(this.state.elements[i])) {
                nodes.push(this.state.elements[i])
            }
        }

        if (!this.isConnected(nodes)) {
            alert("Граф должен быть связным")
            return []
        }

        await this.props.mainComponent.setState({
            nodes: nodes.map((x) => JSON.parse(JSON.stringify(x)))
        })

        if (this.props.mainComponent.state.algorithm === options[0]) {
            let kruskal = new Kruskal(nodes, this.state.edges, this.state.elements, this, this.props.mainComponent)
            return kruskal.findMst()
        }
        if (this.props.mainComponent.state.algorithm === options[1]) {
            let kruskal = new KruskalDSU(nodes, this.state.edges, this.state.elements, this, this.props.mainComponent)
            return kruskal.findMst()
        }
        if (this.props.mainComponent.state.algorithm === options[2]) {
            let prim = new Prim(nodes, this.state.edges, this.state.elements, this, this.props.mainComponent)
            return prim.findMst()
        }
    }

    async parseText(text) {
        let arr = text.split('\n')
        if (arr.length < 2) {
            alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
            return
        }
        let nodesCount = parseInt(arr[0])
        if (nodesCount === undefined) {
            alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
            return
        }
        let edgesCount = parseInt(arr[1])
        if (edgesCount === undefined) {
            alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
            return
        }
        if (arr.length - 2 !== edgesCount) {
            alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
            return
        }
        let nodes = []
        for (let i = 1; i <= nodesCount; ++i) {
            const newNode = {
                id: i.toString(),
                data: {id: i.toString()},
                type: 'customnode',
                position: {x: getRandomInt(30, 800), y: getRandomInt(10, 600)},
                style: {backgroundColor: "white"}
            };
            nodes.push(newNode)
        }
        let edges = []
        for (let i = 2; i < arr.length; ++i) {
            let edge = arr[i].split(' ')
            if (edge.length !== 3) {
                alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
                return
            }
            let a = parseInt(edge[0])
            let b = parseInt(edge[1])
            let w = parseInt(edge[2])
            if (a === undefined || b === undefined) {
                alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
                return
            }
            if (a < 1 || a > nodesCount || b < 1 || b > nodesCount || w <= 0) {
                alert("Неверный формат файла: посмотрите инструкцию, чтобы увидеть требования")
                return
            }
            const newEdge = {
                id: a.toString() + "-" + b.toString(),
                source: a.toString(),
                target: b.toString(),
                label: w.toString(),
                style: {stroke: 'grey', opacity: '80%'}
            }
            edges.push(newEdge)
        }
        await this.clear()
        await this.setState({elements: nodes})
        await this.setState({id: nodesCount})
        await this.setState({elements: nodes.concat(edges)})
        await this.setState({edges: edges})
    }

    async perform() {
        if (!this.props.mainComponent.state.isPerforming) {
            await this.props.mainComponent.setState({isPerforming: true})
            let newStates = await this.findMst()
            await this.setState({states: newStates})
            for (let i = 0; i < this.state.states.length; ++i) {
                if (!this.props.mainComponent.state.isPerforming)
                    return
                await this.changeState(1);
                await sleep(2000)
            }
            await this.props.mainComponent.setState({isPerforming: false})
        }
    }

    async stepForward() {
        if (this.state.states.length === 0) {
            let newStates = await this.findMst()
            await this.props.mainComponent.changeStep(0)
            await this.setState({states: newStates})
            await this.changeState(1);
        }
        await this.changeState(1);
    }

    async stepBack() {
        await this.changeState(-1);
    }

    async pause() {
        await this.props.mainComponent.setState({isPerforming: false})
    }

    async getFinal() {
        if (this.state.states.length === 0) {
            let newStates = await this.findMst()
            await this.setState({states: newStates})
        }
        await this.props.mainComponent.clear()
        await this.props.mainComponent.changeStep(this.state.states.length - 1)
        await this.setState({elements: this.state.states[this.props.mainComponent.state.stepNumber]})
    }

    async resetElements() {
        let newElements = []
        for (let i = 0; i < this.state.elements.length; ++i) {
            if (isEdge(this.state.elements[i])) {
                let defaultEdge = JSON.parse(JSON.stringify(this.state.elements[i]))
                defaultEdge.style = {stroke: 'grey', opacity: '80%'}
                newElements.push(defaultEdge)
            } else {
                let defaultNode = JSON.parse(JSON.stringify(this.state.elements[i]))
                defaultNode.style = {backgroundColor: "white"}
                newElements.push(defaultNode)
            }
        }

        await this.props.mainComponent.changeStep(0)
        await this.props.mainComponent.setState({isPerforming: false})
        await this.setState({elements: newElements})
        await this.setState({states: []})
    }

    async onEdgeSubmit() {
        let weight = document.getElementById("edge-form").value
        weight = JSON.stringify(weight).length === 2 ? 1 : weight
        const newEdge = {
            id: this.state.firstVertex.toString() + "-" + this.state.secondVertex.toString(),
            source: this.state.firstVertex.toString(),
            target: this.state.secondVertex.toString(),
            label: weight.toString(),
            style: {stroke: 'grey', opacity: '80%'}
        }
        await this.setState({elements: this.state.elements.concat(newEdge)})
        await this.setState({edges: this.state.edges.concat(newEdge)})
        await this.resetElements()
        await this.setState({isGraphModalActive: false})
    }

    async onConnect(params) {
        let a = params.source
        let b = params.target
        let edge = this.state.elements.find((edge) => ((edge.id === a.toString() + "-" + b.toString())
            || (edge.id === b.toString() + "-" + a.toString())))

        if (edge !== undefined) {
            return
        }

        if (a === b) {
            return
        }

        this.setState({firstVertex: a})
        this.setState({secondVertex: b})
        this.setState({isGraphModalActive: true})
    }

    async onClick(event) {
        const position = this.state.reactFlowInstance.project({x: event.clientX - 40, y: event.clientY - 60});
        await this.setState({id: this.state.id + 1})
        const newNode = {
            id: (this.state.id).toString(),
            data: {id: (this.state.id).toString()},
            type: 'customnode',
            position,
            style: {backgroundColor: "white"}
        };
        await this.setState({elements: this.state.elements.concat(newNode)})
        await this.resetElements()
    }

    async onInfoOpen() {
        await this.setState({isInfoActive: true})
    }

    async onGraphInput() {
        await this.setState({isGraphInputActive: true})
    }

    render() {
        return (
            <div>
                <ModalGraphInputComponent mainComponent={this}/>
                <ModalWindow mainComponent={this} onEdgeSubmit={this.onEdgeSubmit}/>
                <ModalInfo mainComponent={this} algorithm={this.props.mainComponent.state.algorithm}/>
                <div style={{backgroundColor: 'white'}}>
                    <ProcessHandler onPlay={this.perform} onHide={this.props.onHide} onPause={this.pause}
                                    isPerforming={this.props.mainComponent.state.isPerforming}
                                    onStepForward={this.stepForward} onStepBack={this.stepBack}
                                    isOnStart={this.props.mainComponent.state.stepNumber <= 1}
                                    isOnEnd={this.props.mainComponent.state.stepNumber === this.state.states.length - 1}
                                    onGetFinal={this.getFinal} mainComponent={this.props.mainComponent}
                                    overviewFlow={this} onClear={this.clear} onInfoOpen={this.onInfoOpen}
                                    onGraphInput={this.onGraphInput}
                    />
                    <div className="col-12" id="drawing-place" style={{backgroundColor: 'white', height: '631px'}}>
                        <ReactFlowProvider>
                            <ReactFlow
                                className="validationflow"
                                elements={this.state.elements}
                                onElementsRemove={this.onElementsRemove}
                                onConnect={this.onConnect}
                                onLoad={this.onLoad}
                                onPaneClick={this.onClick}
                                snapToGrid={true}
                                snapGrid={[15, 15]}
                                nodeTypes={nodeTypes}
                            >
                                <Controls/>
                                <Background color="#aaa" gap={16}/>
                            </ReactFlow>
                        </ReactFlowProvider>
                    </div>
                    <EdgesTable elements={this.state.edges}/>
                </div>
            </div>
        );
    }
}

export default OverviewFlow;