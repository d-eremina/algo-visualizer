import React, {Component} from 'react';

class Info extends Component {
    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Обзор</h3>
                        <div>
                            Данная программа предназначена для визуализации процесса работы алгоритмов поиска
                            минимального остовного дерева: классического алгоритма Крускала,
                            алгоритма Крускала с использованием структуры данных "Система непересекающихся множеств",
                            а также алгоритма Прима.
                        </div>
                    </div>
                </div>
                <div className="row row-content col-12">
                    <div className="col-12">
                        <h3>Условные обозначения</h3>
                        <ul className="list-unstyled">
                            <li><span className="fa fa-upload fa-md"> - Открыть граф</span></li>
                            <li><span className="fa fa-play fa-md"> - Начать непрерывное выполнение</span></li>
                            <li><span className="fa fa-pause fa-md"> - Приостановить выполнение</span></li>
                            <li><span className="fa fa-chevron-left fa-md"> - Перейти на шаг назад</span></li>
                            <li><span className="fa fa-chevron-right fa-md"> - Перейти на шаг вперед</span></li>
                            <li><span className="fa fa-angle-double-right fa-md"> - Перейти в конечное состояние</span>
                            </li>
                            <li><span className="fa fa-refresh fa-md"> - Очистить поле</span></li>
                            <li><span className="fa fa-info fa-md"> - Получить информацию об алгоритме</span></li>
                        </ul>
                    </div>
                </div>
                <div className="row row-content col-12">
                    <div className="col-12">
                        <h3>Формат файлового ввода</h3>
                        <span>
                            Программа принимает на вход текстовые файлы (.txt), которые содержат следующую информацию:<br/>
                            Первая строка содержит количество вершин, они по умолчанию пронумеруются, начиная с единицы<br/>
                            Вторая строка содержит количество ребер в графе<br/>
                            Далее следуют описания ребер &mdash; три числа, разделенные пробелом:<br/>
                            Первые два &mdash; номера вершин, соединяемых графом, третье &mdash; вес ребра
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;