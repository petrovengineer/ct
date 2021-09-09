import React, { useState } from "react"

export default function Multiselect({arr=[], selected, setSelected}){
    const [list, showList] = useState(false)
    function add(e){
        const _id = e.target.getAttribute("_id");
        setSelected([...selected, _id])
    }
    function remove(e){
        e.stopPropagation()
        const _id = e.target.getAttribute("_id")
        const newSelected = [...selected]
        const index = selected.indexOf(_id)
        if(!index)return;
        newSelected.splice(index, 1)
        setSelected(newSelected)
    }
    return (
        <div className={`dropdown ${list?'is-active':''}`}>
            <div className="dropdown-trigger" onClick={()=>showList(!list)} >
                <button className="button">
                    {
                        (selected.length>0)?
                            selected.map(s=>
                                <div className="mx-1 is-size-7" key={s}>
                                    {arr.length>0 && arr.find(a=>a._id===s).name}
                                    <span className="delete is-small" onClick={remove}></span>
                                </div>
                        )
                        :<span className="has-text-grey-light">Выбрать...</span>
                    }
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>

            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {(arr.filter(a=>selected.indexOf(a._id)===-1).length===0) && <span className="dropdown-item has-text-grey-light">Нет элементов</span>}
                    {arr
                        .filter(a=>selected.indexOf(a._id)===-1)
                        .map(item=><a className="dropdown-item" _id={item._id} name={item.name} key={item._id} onClick={add}>{item.name}</a>
                        )}
                </div>
            </div>
        </div>
    )
}