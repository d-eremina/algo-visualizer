import {Component} from "react";
import {Modal} from "react-bootstrap";
import "../Styles/App.css"


class ModalWindow extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    async onSubmit(event) {
        event.preventDefault()
        await this.props.onEdgeSubmit()
        return false
    }

    render() {
        return (
            <Modal show={this.props.mainComponent.state.isGraphModalActive}
                   dialogClassName="modal-dialog-centered modal-md">
                <Modal.Header>
                    <Modal.Title>Введите вес ребра</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>
                        <input id="edge-form" type="number" placeholder={1}
                               max={100000} min={1}
                               style={{width: '100%', marginBottom: '20px', height: '35px'}}/>
                        <input id="save-button" type="submit" value="Готово"/>
                        <input id="cancel-button" type="button" value="Отменить"/>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalWindow;