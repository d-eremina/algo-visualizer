import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {options} from '../Utils';

class ProcessHandler extends Component {
    constructor(props) {
        super(props);

        this.elements = this.props.elements
        this.onChange = this.onChange.bind(this)
        this.onExpandClick = this.onExpandClick.bind(this)
        this.state = {
            isRightSideHidden: false
        }
        this.inputFile = React.createRef()
    }

    async onChange(event) {
        if (event.value === 'Алгоритм Прима') {
            if (!this.state.isRightSideHidden) {
                this.onExpandClick()
            }
        } else {
            if (this.state.isRightSideHidden) {
                this.onExpandClick()
            }
        }
        await this.props.overviewFlow.resetElements()
        await this.props.mainComponent.clear()
        await this.props.mainComponent.setState({algorithm: event.value})
    }

    onExpandClick() {
        this.props.onHide();
        this.setState({isRightSideHidden: !this.state.isRightSideHidden})
    }

    render() {
        const expandButton = () => {
            if (this.state.isRightSideHidden) {
                return (<Button style={{marginLeft: '5px'}} className="Custom-button fa fa-angle-double-left fa-md"
                                onClick={this.onExpandClick}>
                    <span style={{marginLeft: '5px'}}>Показать</span>
                </Button>);
            }
            return (<Button style={{marginLeft: '5px'}} className="Custom-button fa fa-angle-double-right fa-md"
                            onClick={this.onExpandClick}>
                <span style={{marginLeft: '5px'}}>Скрыть</span>
            </Button>);
        }

        return (
            <div className="row" style={{paddingLeft: '10px', paddingTop: '10px'}}>
                <div className="col-5 col-sm-5" style={{marginBottom: '10px'}}>
                    <ButtonGroup>
                        <Button className="Custom-button fa fa-upload fa-md" onClick={this.props.onGraphInput}/>
                        <Button className="Custom-button fa fa-play fa-md" onClick={this.props.onPlay}/>
                        <Button className="Custom-button fa fa-pause fa-md" onClick={this.props.onPause}
                                disabled={!this.props.isPerforming}/>
                        <Button className="Custom-button fa fa-chevron-left fa-md" onClick={this.props.onStepBack}
                                disabled={this.props.isPerforming || this.props.isOnStart}/>
                        <Button className="Custom-button fa fa-chevron-right fa-md"
                                disabled={this.props.isPerforming || this.props.isOnEnd}
                                onClick={this.props.onStepForward}/>
                        <Button className="Custom-button fa fa-angle-double-right fa-lg" disabled={this.props.isOnEnd}
                                onClick={this.props.onGetFinal}/>
                        <Button className="Custom-button fa fa-refresh fa-md" onClick={this.props.onClear}/>
                    </ButtonGroup>
                </div>
                <div className="col-7 col-sm-7">
                    <ButtonGroup>
                        <Dropdown options={options} value={options[0]} onChange={this.onChange}/>
                        <Button className="Custom-button fa fa-info fa-lg" onClick={this.props.onInfoOpen}
                                style={{marginLeft: '10px', marginRight: '5px', borderRadius: '50px', width: '40px'}}
                                />
                        {expandButton()}
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}


export default ProcessHandler;