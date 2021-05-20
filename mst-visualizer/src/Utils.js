import {Handle, Position} from "react-flow-renderer";
import React from "react";

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


export const CustomNode = ({id}) => (
        <>
            <Handle type="target" position={Position.Top}/>
            <div>{id}</div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )
;

export const ComponentNode = ({data}) => (
        <>
            <Handle type="target" position={Position.Top}/>
            <div>{data.id}</div>
            <div style={{fontSize: '9px'}}>{data.component}</div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )
;

export const nodeTypes = {
    customnode: CustomNode,
    componentnode: ComponentNode
};

export const patternGraphs = [
    [{"id":"1","data":{"id":"1"},"type":"customnode","position":{"x":360,"y":120},"style":{"backgroundColor":"white"}},{"id":"2","data":{"id":"2"},"type":"customnode","position":{"x":270,"y":405},"style":{"backgroundColor":"white"}},{"id":"3","data":{"id":"3"},"type":"customnode","position":{"x":435,"y":405},"style":{"backgroundColor":"white"}},{"id":"4","data":{"id":"4"},"type":"customnode","position":{"x":165,"y":210},"style":{"backgroundColor":"white"}},{"id":"5","data":{"id":"5"},"type":"customnode","position":{"x":525,"y":195},"style":{"backgroundColor":"white"}},{"id":"1-4","source":"1","target":"4","label":"1","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-5","source":"1","target":"5","label":"2","style":{"stroke":"grey","opacity":"80%"}},{"id":"5-3","source":"5","target":"3","label":"3","style":{"stroke":"grey","opacity":"80%"}},{"id":"3-2","source":"3","target":"2","label":"4","style":{"stroke":"grey","opacity":"80%"}},{"id":"4-2","source":"4","target":"2","label":"5","style":{"stroke":"grey","opacity":"80%"}},{"id":"4-5","source":"4","target":"5","label":"8","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-2","source":"1","target":"2","label":"9","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-3","source":"1","target":"3","label":"10","style":{"stroke":"grey","opacity":"80%"}},{"id":"4-3","source":"4","target":"3","label":"6","style":{"stroke":"grey","opacity":"80%"}},{"id":"5-2","source":"5","target":"2","label":"7","style":{"stroke":"grey","opacity":"80%"}}],
    [{"id":"1","data":{"id":"1"},"type":"customnode","position":{"x":360,"y":135},"style":{"backgroundColor":"white"}},{"id":"2","data":{"id":"2"},"type":"customnode","position":{"x":225,"y":240},"style":{"backgroundColor":"white"}},{"id":"3","data":{"id":"3"},"type":"customnode","position":{"x":330,"y":405},"style":{"backgroundColor":"white"}},{"id":"4","data":{"id":"4"},"type":"customnode","position":{"x":150,"y":405},"style":{"backgroundColor":"white"}},{"id":"5","data":{"id":"5"},"type":"customnode","position":{"x":250,"y":405},"style":{"backgroundColor":"white"}},{"id":"6","data":{"id":"6"},"type":"customnode","position":{"x":435,"y":255},"style":{"backgroundColor":"white"}},{"id":"7","data":{"id":"7"},"type":"customnode","position":{"x":405,"y":405},"style":{"backgroundColor":"white"}},{"id":"8","data":{"id":"8"},"type":"customnode","position":{"x":540,"y":405},"style":{"backgroundColor":"white"}},{"id":"2-7","source":"2","target":"7","label":"2","style":{"stroke":"grey","opacity":"80%"}},{"id":"6-7","source":"6","target":"7","label":"5","style":{"stroke":"grey","opacity":"80%"}},{"id":"6-8","source":"6","target":"8","label":"3","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-2","source":"1","target":"2","label":"4","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-6","source":"1","target":"6","label":"4","style":{"stroke":"grey","opacity":"80%"}},{"id":"2-3","source":"2","target":"3","label":"10","style":{"stroke":"grey","opacity":"80%"}},{"id":"2-4","source":"2","target":"4","label":"5","style":{"stroke":"grey","opacity":"80%"}},{"id":"2-5","source":"2","target":"5","label":"10","style":{"stroke":"grey","opacity":"80%"}}],
    [{"id":"1","data":{"id":"1"},"type":"customnode","position":{"x":330,"y":120},"style":{"backgroundColor":"white"}},{"id":"2","data":{"id":"2"},"type":"customnode","position":{"x":195,"y":240},"style":{"backgroundColor":"white"}},{"id":"3","data":{"id":"3"},"type":"customnode","position":{"x":315,"y":330},"style":{"backgroundColor":"white"}},{"id":"4","data":{"id":"4"},"type":"customnode","position":{"x":435,"y":240},"style":{"backgroundColor":"white"}},{"id":"5","data":{"id":"5"},"type":"customnode","position":{"x":555,"y":360},"style":{"backgroundColor":"white"}},{"id":"6","data":{"id":"6"},"type":"customnode","position":{"x":150,"y":420},"style":{"backgroundColor":"white"}},{"id":"1-2","source":"1","target":"2","label":"2","style":{"stroke":"grey","opacity":"80%"}},{"id":"1-4","source":"1","target":"4","label":"3","style":{"stroke":"grey","opacity":"80%"}},{"id":"4-3","source":"4","target":"3","label":"1","style":{"stroke":"grey","opacity":"80%"}},{"id":"2-3","source":"2","target":"3","label":"4","style":{"stroke":"grey","opacity":"80%"}},{"id":"3-6","source":"3","target":"6","label":"3","style":{"stroke":"grey","opacity":"80%"}},{"id":"4-5","source":"4","target":"5","label":"5","style":{"stroke":"grey","opacity":"80%"}}],
]

export const NODE_COLORS = ['#A9BD95', '#F3D6A1', '#FDB692', '#C0A4A5',
    '#E7CB71', '#93C4D7', '#B29DD9', '#fef6fb',
    '#FE6B64', '#999b84', '#f6def6', '#cccccc',
    '#d3f6f3', '#bb5a5a', '#8b4f80',];

export const options = [
    'Алгоритм Крускала', 'Алгоритм Крускала (DSU)', 'Алгоритм Прима'
];