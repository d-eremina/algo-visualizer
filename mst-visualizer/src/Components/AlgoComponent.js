import React, {Component} from "react";
import InnerHeaderComponent from "./InnerHeaderComponent";
import OverviewFlow from "./MainOverviewFlowComponent";
import KruskalVisualizer from "../Algorithms/KruskalVisualizer"
import KruskalDSUVisualizer from "../Algorithms/KruskalDSUVisualizer";

import ReactFlow, {Background, Controls, ReactFlowProvider} from "react-flow-renderer";
import {nodeTypes, options, sleep} from "../Utils";
import "../Styles/graphStyle.css"

class Algo extends Component {
    constructor(props) {
        super(props);

        this.onExpandClick = this.onExpandClick.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.clear = this.clear.bind(this)

        this.state = {
            isInnerHidden: false,
            isPerforming: false,
            stepNumber: 0,
            nodes: [],
            mstEdges: [],
            reactFlowInstance: null,
            elements: [],
            changeStates: [],
            algorithm: "Алгоритм Крускала",
            visualizer: null,
        }
    }

    onLoad(reactFlowInstance) {
        reactFlowInstance.fitView();
        this.setState({reactFlowInstance: reactFlowInstance})
    }

    async clear() {
        this.setState({elements: []})
        this.setState({mstEdges: []})
        this.setState({changeStates: []})
        this.setState({nodes: []})
        this.setState({stepNumber: 0})
        this.setState({isPerforming: false})
        this.setState({visualizer: null})
    }

    async changeStep(newValue, isBack = false) {
        await this.setState({stepNumber: newValue})
        if (isBack) {
            return
        }
        if (this.state.stepNumber === 1) {
            if (this.state.algorithm === options[0]) {
                this.setState({visualizer: new KruskalVisualizer(this)})
                await this.state.visualizer.initState()
            } else if (this.state.algorithm === options[1]) {
                this.setState({visualizer: new KruskalDSUVisualizer(this)})
                await this.state.visualizer.initState()
            }
        }
        if (this.state.visualizer === null) {
            return
        }
        if (this.state.changeStates.indexOf(newValue) > -1) {
            let edge = this.state.mstEdges[this.state.changeStates.indexOf(newValue)]
            const newEdge = {
                id: edge.id,
                source: edge.source,
                target: edge.target,
                animated: true,
                style: {stroke: '#2ac932', opacity: '100%'}
            }
            await this.state.visualizer.initComponents(newEdge)
        }
    }

    async trySleep(ms) {
        if (!this.state.isInnerHidden) {
            await sleep(ms)
        }
    }

    async onExpandClick() {
        await this.setState({isInnerHidden: !this.state.isInnerHidden})
    }

    render() {
        return (
            this.state.isInnerHidden ?
                <div className="d-none d-lg-block container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-11" style={{backgroundColor: 'white', marginTop: '10px'}}
                             id="drawing-place">
                            <OverviewFlow onHide={this.onExpandClick} mainComponent={this}
                                          isInnerHidden={this.state.isInnerHidden} parseText={this.parseText}/>
                        </div>
                    </div>
                </div> :
                <div className="d-none d-lg-block container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-7" style={{backgroundColor: 'white', marginTop: '10px'}}
                             id="drawing-place">
                            <OverviewFlow onHide={this.onExpandClick} mainComponent={this}
                                          isInnerHidden={this.state.isInnerHidden} parseText={this.parseText}/>
                        </div>
                        <div className="col-12 col-sm-5" style={{
                            backgroundColor: '#FF8E71', marginLeft: '0px',
                            marginTop: '10px', height: '800px'
                        }}>
                            <InnerHeaderComponent/>
                            <div className="col-12" style={{
                                backgroundColor: 'white', height: '740px', marginTop: '0px',
                                paddingTop: '0px'
                            }}>
                                <ReactFlowProvider>
                                    <ReactFlow
                                        className="validationflow"
                                        elements={this.state.elements}
                                        snapToGrid={true}
                                        snapGrid={[15, 15]}
                                        onLoad={this.onLoad}
                                        nodeTypes={nodeTypes}
                                    >
                                        <Background color="#aaa" gap={16}/>
                                    </ReactFlow>
                                    <Controls/>
                                </ReactFlowProvider>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Algo;