import React from "react";
import "../Styles/table.css"
import {isEdge} from "react-flow-renderer";

const EdgesTable = (props) => {
    return (
        <div className="row" style={{marginTop: "0px", padding: '0px'}}>
            <div className="col-12" style={{color: "black"}}>
                <div id="table-scroll" className="table-scroll" style={{height: "107px"}}>
                    <table id="main-table" className="main-table">
                        <thead>
                        <tr>
                            <th scope="col" style={{backgroundColor: '#272343', minWidth: "150px"}}>Вес ребра</th>
                            {props.elements.map((edge) => {
                                if (isEdge(edge)) {
                                    return (<th scope="col" style={{color: '#FFF', backgroundColor: '#272343'}}>
                                        {edge.label}</th>)
                                }
                                return <></>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style={{color: '#FFF', backgroundColor: '#272343', minWidth: "150px"}}>Вершина №1</th>
                            {props.elements.map((edge) => {
                                if (isEdge(edge)) {
                                    return (<td style={{color: '#FFF'}}>{edge.source}</td>)
                                }
                                return <></>
                            })}
                        </tr>
                        <tr>
                            <th style={{color: '#FFF', backgroundColor: '#272343', minWidth: "150px"}}>Вершина №2</th>
                            {props.elements.map((edge) => {
                                if (isEdge(edge)) {
                                    return (<td style={{color: '#FFF'}}>{edge.target}</td>)
                                }
                                return <></>
                            })}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default EdgesTable;