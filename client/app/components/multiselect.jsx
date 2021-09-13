import React, { useState } from "react"

export default function Multiselect({arr=[], selected, setSelected, multi=false}){
    const [list, showList] = useState(false)
    function add(e){
        const _id = e.target.getAttribute("_id");
        if(multi){
            setSelected([...selected, _id])
        }else{
            setSelected(_id)
            showList(false)
        }
    }
    function remove(e){
        e.stopPropagation()
        const _id = e.target.getAttribute("_id")
        const newSelected = [...selected]
        const index = selected.indexOf(_id)
        console.log("INDEX ", index);
        if(index===-1)return;
        newSelected.splice(index, 1)
        setSelected(newSelected)
    }
    return (
        <div className={`dropdown ${list?'is-active':''}`}>
            <div className="dropdown-trigger" onClick={()=>showList(!list)} >
                <button className="button" style={{height:'auto'}}>
                    <Label arr={arr} selected={selected} multi={multi} remove={remove}/>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>

            </div>
            <div className="dropdown-menu" 
                // style={{maxHeight:'400px', overflowY:'auto', overflowX:'none'}}
            >
                <div className="dropdown-content"
                style={{maxHeight:'400px', overflowY:'auto', overflowX:'none'}}
                >
                    {(!selected || (arr.filter(a=>selected.indexOf(a._id)===-1).length===0)) && <span className="dropdown-item has-text-grey-light">Нет элементов</span>}
                    {arr
                        .filter(a=>(!selected || selected.indexOf(a._id)===-1))
                        .map(item=><a className="dropdown-item" _id={item._id} name={item.name} key={item._id} onClick={add}>{item.name}</a>)
                    }
                </div>
            </div>
        </div>
    )
}

function Label({arr, selected, multi, remove}){
    if(!selected || selected.length===0)return <div>Выбрать...</div>
    if(Array.isArray(selected)){
        return <div className="is-flex is-flex-wrap-wrap">
        {selected.map(s=>
            <div className="mx-1 is-size-7" key={s}>
                {arr.length>0 && arr.find(a=>a._id===s).name}
                {multi && <span className="has-text-danger is-size-6 ml-1" _id={s} onClick={remove}>x</span>}
            </div>)}
        </div>
    }
    return <div>{arr && arr.length>0 && arr.find(a=>a._id===selected).name}</div>
}