export default {
    get:'query reports($filter: FilterType){reports(filter: $filter){_id created author{_id name} observations{_id text}}}',
    create:'mutation createReport($observations: [ObservationsInputType]){createReport(observations: $observations){_id observations{_id text time photos} author{_id name} created}}',
    remove:'',
    selectors:{
        get:'reports',
        create:'createReport',
        remove:''
    }
}