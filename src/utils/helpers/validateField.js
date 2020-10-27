export default (key, errors, touched) => {
    if (touched.email) {
        if (errors[key]) {
            return 'error'
        }
        else return ''
    }
}