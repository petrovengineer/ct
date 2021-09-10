import {makeObservable, observable} from 'mobx'

class Menu{
    data = [
        {_id: 'g1', title: 'Эксплуатация', items: 
            [
                {_id:'e2', name: 'Оперативный журнал', link: '/observations'},
                {_id:'e3', name: 'Отчёты', link: '/reports'},
                {_id:'e4', name: 'Контроль доступа', link: '/access'},
                {_id:'e5', name: 'Учёт времени', link: '/worktime'},
            ]
        },
        // {_id:'g2', title: 'Системы', items: [
        //     {_id:'s1', name:'Противопожарная защита', link: '/systems/appz'},
        //     {_id:'s2', name:'Вентиляция', link: '/systems/vent'},
        // ]},
        {_id: 'g3', title: 'Администрирование', items:
            [
                {_id:'a1', name: 'Пользователи', link: '/users'},
                {_id:'e6', name: 'Ключи', link: '/keys'},
                {_id:'e7', name: 'Привелегии', link: '/permissions'},
                // {_id:'a2', name: 'Меню', link: '/menu'},
            ]
        }
    ]
    constructor(){
        makeObservable(this, {
            data: observable,
        })
    }
}

export default new Menu()