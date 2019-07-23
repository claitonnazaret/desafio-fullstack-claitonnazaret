import * as Yup from 'yup';
import { Usuario } from '../../types/Usuario';

const yup = require('yup');

const OBRIGATORIO: string = ' é obrigatório!';

export const schemaUsuario = Yup.object().shape({
    nomecompleto: Yup.string().required(`Nome Completo ${OBRIGATORIO}`),
    cep: Yup.string().required(`Cep ${OBRIGATORIO}`),
});

export const initUsuario: Usuario = {
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    nomeMae: '',
    nomePai: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    localidade: '',
    uf: '',
    ibge: '',
    dataCriacao: '',
    dataAtualizacao: '',
};

export const initEndereco = {
    logradouro: '',
    numero: '',
    bairro: '',
    localidade: '',
    uf: '',
    ibge: '',
};
