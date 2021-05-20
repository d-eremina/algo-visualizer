import React, {Component} from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Разработчик</h5>
                        <address>
                            Еремина Дарья Валерьевна<br/>
                            НИУ ВШЭ<br/>
                            Москва, Россия<br/>
                            2021<br/>
                            <i className="fa fa-envelope"/>: <a
                            href="mailto:dveremina@edu.hse.ru">dveremina@edu.hse.ru</a>
                        </address>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;