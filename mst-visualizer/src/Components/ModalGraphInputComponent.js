import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import "../Styles/App.css"
import {patternGraphs} from "../Utils";
import {isEdge} from "react-flow-renderer";


class ModalGraphInputComponent extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.onFileLoad = this.onFileLoad.bind(this)
        this.onClose = this.onClose.bind(this)

        this.onFirstPatternClick = this.onFirstPatternClick.bind(this)
        this.onSecondPatternClick = this.onSecondPatternClick.bind(this)
        this.onThirdPatternClick = this.onThirdPatternClick.bind(this)

        this.inputFile = React.createRef()
    }

    onClose() {
        this.props.mainComponent.setState({isGraphInputActive: false})
    }

    async onFirstPatternClick() {
        await this.props.mainComponent.clear()
        let tempElements = []
        let edges = []
        for (let i = 0; i < patternGraphs[0].length; ++i) {
            if (isEdge(JSON.parse(JSON.stringify(patternGraphs[0][i])))) {
                edges.push(JSON.parse(JSON.stringify(patternGraphs[0][i])))
            }
            tempElements.push(JSON.parse(JSON.stringify(patternGraphs[0][i])))
        }
        await this.props.mainComponent.setState({elements: tempElements})
        await this.props.mainComponent.setState({edges: edges})
        await this.props.mainComponent.setState({id: 5})
        this.props.mainComponent.setState({isGraphInputActive: false})
    }

    async onSecondPatternClick() {
        await this.props.mainComponent.clear()
        let tempElements = []
        let edges = []
        for (let i = 0; i < patternGraphs[1].length; ++i) {
            if (isEdge(JSON.parse(JSON.stringify(patternGraphs[1][i])))) {
                edges.push(JSON.parse(JSON.stringify(patternGraphs[1][i])))
            }
            tempElements.push(JSON.parse(JSON.stringify(patternGraphs[1][i])))
        }
        await this.props.mainComponent.setState({elements: tempElements})
        await this.props.mainComponent.setState({edges: edges})
        await this.props.mainComponent.setState({id: 7})
        this.props.mainComponent.setState({isGraphInputActive: false})
    }

    async onThirdPatternClick() {
        await this.props.mainComponent.clear()
        let tempElements = []
        let edges = []
        for (let i = 0; i < patternGraphs[2].length; ++i) {
            if (isEdge(JSON.parse(JSON.stringify(patternGraphs[2][i])))) {
                edges.push(JSON.parse(JSON.stringify(patternGraphs[2][i])))
            }
            tempElements.push(JSON.parse(JSON.stringify(patternGraphs[2][i])))
        }
        await this.props.mainComponent.setState({elements: tempElements})
        await this.props.mainComponent.setState({edges: edges})
        await this.props.mainComponent.setState({id: 6})
        this.props.mainComponent.setState({isGraphInputActive: false})
    }

    async onFileLoad(fileLoadedEvent) {
        await this.props.mainComponent.parseText(fileLoadedEvent.target.result)
        await this.props.mainComponent.setState({isGraphInputActive: false})
    }

    handleChange() {
        let fileToLoad = document.getElementById("fileToLoad").files[0]
        let fileReader = new FileReader();
        fileReader.onload = async (fileLoadedEvent) => await this.onFileLoad(fileLoadedEvent)
        fileReader.readAsText(fileToLoad, "UTF-8")
    }

    render() {
        return (
            <Modal show={this.props.mainComponent.state.isGraphInputActive}
                   dialogClassName="modal-dialog-centered modal-lg">
                <Modal.Header style={{borderBottom: '1px solid white'}}>
                    <Modal.Title>Открыть граф</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            style={{color: 'white'}} onClick={this.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body style={{
                    maxHeight: 'calc(100vh - 400px)',
                    overflowY: 'auto'
                }}>
                    <div className="row row-content" style={{justifyContent: 'left'}}>
                        <Button className="Custom-button" onClick={() => this.inputFile.click()}>
                            <input type='file' id="fileToLoad" style={{display: "none"}} onChange={this.handleChange}
                                   ref={(ref) => this.inputFile = ref} accept=".txt"/>
                            <span>Загрузить из файла</span>
                        </Button>
                    </div>
                    <h4>Открыть из шаблона</h4>
                    <div className="row row-content">
                        <div>
                            <Button className="image-button"><img src="./k5.png" width={200} height={200} alt={"first"}
                                                                  onClick={this.onFirstPatternClick}/></Button>
                            <Button className="image-button"><img src="./tree.png" width={200} height={200}
                                                                  alt={"second"}
                                                                  onClick={this.onSecondPatternClick}/></Button>
                            <Button className="image-button"><img src="./graph.png" width={200} height={200}
                                                                  alt={"third"}
                                                                  onClick={this.onThirdPatternClick}/></Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalGraphInputComponent;