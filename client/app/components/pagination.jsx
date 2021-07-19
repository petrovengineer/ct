import React, { useMemo } from 'react'

const Pages = ({count, limit, skip, setSkip})=>{
    const pages = useMemo(()=>(
        Array.from({ length: Math.ceil(count/limit) }, (_, i) => i)
    ),[count])
    return (
        <nav className="pagination is-rounded mt-4" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
            {(pages.length>1) && pages.map(p=>(
                <li>
                    <a className={"pagination-link " + ((skip/limit)===p?"is-current":"")}
                    onClick={()=>setSkip(p*limit)}
                    aria-label="Page 1" aria-current="page">{p+1}</a>
                </li>
            ))}
        </ul>
        </nav>
    )
}

export default Pages