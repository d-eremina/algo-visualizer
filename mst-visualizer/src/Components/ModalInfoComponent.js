import {Component} from "react";
import {Modal} from "react-bootstrap";
import "../Styles/App.css"

class ModalInfo extends Component {
    constructor(props) {
        super(props)
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        this.props.mainComponent.setState({isInfoActive: false})
    }

    render() {
        const Header = () => {
            if (this.props.algorithm === 'Алгоритм Крускала (DSU)') {
                return <h3>Алгоритм Крускала с использованием системы непересекающихся множеств</h3>;
            }
            return(<h3>{this.props.algorithm}</h3>);
        }

        const Content = () => {
            if (this.props.algorithm === 'Алгоритм Крускала') {
                return <div>
                    <div style={{marginBottom: '10px'}}>
                        <h4>Описание алгоритма</h4>
                        <span>Перед началом выполнения ребра графа сортируются в порядке возрастания весов.<br/>
                            Данный алгоритм изначально помещает каждую вершину в свою компоненту связности.<br/>
                            Далее происходит последовательное объединение этих компонент следующим образом:<br/>
                            если очередное ребро соединяет вершины из разных компонент связности,<br/>
                            оно попадает в минимальный остов, а компоненты объединяются.<br/>
                            В классической реализации объединение происходит перебором всех вершин &mdash; <br/>
                            если при переборе массива идентификаторов принадлежности к компоненте<br/>
                            очередная вершина находилась в старой компоненте, то теперь данному элементу<br/>
                            массива присваивается идентификатор новой компоненты.
                            </span>
                    </div>
                    <div>
                        <h4>Визуализация алгоритма</h4>
                        <span>Вершины на основном поле окрашиваются в цвета своих компонент связности,<br/>
                        поэтому вершины из одной компоненты будут иметь один цвет.<br/>
                        В таблице ребер внизу Вы можете увидеть порядок их обхода.<br/>
                        На каждой итерации рассматриваемое ребро подсвечивается серым цветом.<br/>
                        Если оно попадет в минимальное остовное дерево, то его цвет сменится на зеленый.<br/>
                        Далее, если окно внутренней реализации не скрыто, Вы сможете увидеть процесс<br/>
                        объединения компонент: каждая из вершин при рассмотрении меняет цвет на желтый.<br/>
                        Если она попадет в объединенную компоненту, то станет зеленой, иначе красной.<br/>
                        После такого обхода вершины из одной компоненты становятся в один ряд.<br/>
                        Таким образом, по завершении работы алгоритма, на основном поле будет выделено<br/>
                        минимальное остовное дерево, а на вспомогательном все вершины расположатся в ряд.
                        </span>
                    </div>
                </div>;
            }
            if (this.props.algorithm === 'Алгоритм Крускала (DSU)') {
                return <div>
                    <div style={{marginBottom: '10px'}}>
                        <h4>Описание алгоритма</h4>
                        <span>
                            Перед началом выполнения ребра графа сортируются в порядке возрастания весов.<br/>
                            Данный алгоритм изначально помещает каждую вершину в свое дерево (множество).<br/>
                            Далее происходит последовательное объединение этих непересекающихся множеств<br/>
                            следующим образом: если очередное ребро соединяет вершины из разных множеств,<br/>
                            оно попадает в минимальный остов, и вызывается метод объединения двух непересекающихся
                            множеств &mdash; одно дерево подвешивается к другому.<br/>
                            В представленом алгоритме также используются две эвристики: ранговая и сжатия путей.<br/>
                            Поэтому каждый раз одно дерево подвешивается к другому так, чтобы дерево с меньшим<br/>
                            рангом присоединялось к дереву с большим рангом (в данном случае ранг &mdash; глубина дерева<br/>
                            Это позволяет не получать глубоких деревьев. Эту же цель преследует эвристика<br/>
                            сжатия путей: каждый раз при запросе предка каждой вершины происходит переподвешивание <br/>
                            вершин на пути к корню непосредственно к нему.<br/>
                        </span>
                    </div>
                    <div>
                        <h4>Визуализация алгоритма</h4>
                        <span>Вершины на основном поле окрашиваются в цвета своих множеств,<br/>
                        поэтому вершины из одного множества будут иметь один цвет.<br/>
                        В таблице ребер внизу Вы можете увидеть порядок их обхода.<br/>
                        На каждой итерации рассматриваемое ребро подсвечивается серым цветом.<br/>
                        Если оно попадет в минимальное остовное дерево, то его цвет сменится на зеленый.<br/>
                        Далее, если окно внутренней реализации не скрыто, Вы сможете увидеть процесс<br/>
                        объединения множеств: сначала произойдет сжатие путей для деревьев, в которых находятся<br/>
                        вершины, соединяемые добавляемым ребром. Далее будет показано, куда переподвесится<br/>
                        одно из деревьев, после чего два дерева объединятся в одно.<br/>
                        Таким образом, по завершении работы алгоритма, на основном поле будет выделено<br/>
                        минимальное остовное дерево, а на вспомогательном все вершины расположатся в одном дереве.</span>
                    </div>
                </div>;
            }
            return <div>
                <div style={{marginBottom: '10px'}}>
                    <h4>Описание алгоритма</h4>
                    <span>
                           Данный алгоритм подразумевает, что минимальное остовное дерево строится постепенно, <br/>
                           так как ребра в него добавляются последовательно. Изначально произвольно выбирается одна <br/>
                           вершина (в данной реализации это вершина с минимальным номером), далее выбирается ребро<br/>
                           минимального веса, исходящее из этой вершины – оно попадает в минимальное остовное дерево.<br/>
                           Теперь, когда минимальный остов содержит уже не одну вершину, ищется и добавляется ребро<br/>
                           минимального веса, связывающее уже существующую компоненту минимального остовного<br/>
                           дерева и все остальные вершины, которые пока не входят в него. Это происходит до тех пор, пока<br/>
                           алгоритм не рассмотрит все вершины, чтобы получить минимальное остовное дерево.
                        </span>
                </div>
                <div>
                    <h4>Визуализация алгоритма</h4>
                    <span>
                        При визуализации данного алгоритма происходит набор как вершин, так и ребер в минимальное<br/>
                        остовное дерево, поэтому каждая уже взятая вершина выделяется зеленым цветом &mdash; изначально<br/>
                        такой вершиной будет вершина с минимальным номером. Далее ребра, из которых происходит<br/>
                        выбор, последовательно подсвечиваются желтым цветом, из них выбирается ребро с<br/>
                        минимальным весом &mdash; оно получает зеленый цвет, что означает, что данное ребро войдет<br/>
                        в минимальный остов, а вершина, которая теперь входит в остов, также становится зеленой.<br/>
                        Так происходит до тех пор, пока все вершины не станут зелеными.<br/>
                        Для данного алгоритма не предусмотрена дополнительная визуализация, поэтому поле поиска<br/>
                        компонент всегда будет пустым и по умолчанию скрыто.
                    </span>
                </div>
            </div>;
        }

        return (
            <Modal show={this.props.mainComponent.state.isInfoActive}
                   dialogClassName="modal-dialog-centered modal-lg">
                <Modal.Header style={{borderBottom: '1px solid white'}}>
                    <Modal.Title>{Header()}</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        style={{color: 'white'}} onClick={this.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body style={{
                    maxHeight: 'calc(100vh - 400px)',
                    overflowY: 'auto'
                }}>
                    {Content()}
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalInfo;