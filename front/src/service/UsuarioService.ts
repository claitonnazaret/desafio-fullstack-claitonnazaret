import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        Connection: 'keep-alive',
    },
});

const pesquisaCep = cep => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
};

const listar = (url: string, page?: string, params?: string[]) => {
    return api.get(`${url}?search=${params ? params : ''}&${page}`);
};

const listaUm = (url: string) => {
    return api.get(`${url}`);
};

const salvar = (url: string, data: any) => {
    return api.post('/usuario/', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};

const deletar = (url: string, id: number) => {
    return api.delete(`${url}/${id}`);
};

export const UsuarioService = {
    listar,
    deletar,
    listaUm,
    pesquisaCep,
    salvar,
};
