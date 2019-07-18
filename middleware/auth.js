export default function ({store, redirect }) {
    if ('id' in store.state.user === false) {
        return redirect('/login')
    }
}