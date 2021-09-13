export default {
    get: `query observations($filter: FilterType){observations(filter: $filter){observations{_id text time photos author{_id name}} count}}`,
    create: `mutation createObservation($text: String, $time: String){createObservation(text: $text, time: $time) {_id time text photos author{_id name}}}`,
    deleteImage: `mutation deletePhoto($link: String, $oid: String){deletePhoto(link: $link, oid: $oid){_id text time photos author{_id name}}}`
}