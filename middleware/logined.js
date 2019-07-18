export default function ({route, store, redirect }) {
    if (route.path === '/login' && 'id' in store.state.user) {
        return redirect('/')
    }
}