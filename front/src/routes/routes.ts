import { UsuarioList, UsuarioPage } from '../pages';

export const routes = [
    { path: '/', component: UsuarioList, exact: true },
    { path: '/usuario', component: UsuarioList, exact: true },
    { path: '/usuario/:id', component: UsuarioPage, exact: true },
];
