export default {
    get:'query{user{_id name}}',
    login:'mutation login($email: String!, $password: String){login(email: $email, password: $password) {accessToken}}',
    // reg:'mutation reg($name: String, $email: String!, $password: String){reg(name: $name, email: $email, password: $password) {accessToken}}',
    selectors: {
        login: 'login',
        get: 'user'
    }
}