import React, {useEffect} from 'react'
import api from '_app/api'
import Store from '_store/reports'
import {observer} from 'mobx-react'

const useCreateReports = ()=>{
    function create(){
        console.log("create")
    }
    return {create}
}