export default function ({store, redirect }) {
    if (!'id' in store.state.user) {
        return redirect('/login')
    }
}