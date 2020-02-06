export default function({store, redirect}) {
  if (!store.state.modUser.user || !store.state.modUser.user.email) {
    return redirect('/admin/login');
  }
};
