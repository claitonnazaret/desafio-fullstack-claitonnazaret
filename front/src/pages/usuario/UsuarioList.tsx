import React, { useEffect, useState } from 'react';
import { BreadcrumbType } from 'types/BreadcrumbType';
import { UsuarioService } from 'service/UsuarioService';
import { Button, Divider, Icon, Popconfirm, Table } from 'antd';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageHeaderComponent from 'component/PageHeaderComponent';
import Moment from 'react-moment';

const UsuarioList = ({ match }: any) => {
    const [dados, setDados] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 20,
        },
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 20,
        number: 0,
        first: true,
        numberOfElements: 0,
    });
    const breadcrumb: BreadcrumbType = {
        title: 'Usuário / Lista',
        url: match.url,
    };

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Nome',
            dataIndex: 'nomeCompleto',
            key: 'nomeCompleto',
            width: 800,
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            width: 150,
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
            width: 150,
        },
        {
            title: 'Dt. Criação',
            dataIndex: 'dataCriacao',
            key: 'dataCriacao',
            width: 150,
            render: value => <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>,
        },
        {
            title: 'Dt. Atualizacao',
            dataIndex: 'dataAtualizacao',
            key: 'dataAtualizacao',
            width: 150,
            render: value => <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>,
        },
        {
            title: 'Ações',
            key: 'acoes',
            width: 100,
            render: (text: any, record: any, index: number) => (
                <>
                    <Link to={`/usuario/${record.id}`}>
                        <Button type="primary" shape="circle" icon="edit" ghost size="small" />
                    </Link>
                    <Divider type="vertical" />
                    <Popconfirm
                        title={`Deseja deletar o usuário ${text.nomeCompleto}?`}
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => deletar(record.id)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="danger" shape="circle" icon="delete" ghost size="small" />
                    </Popconfirm>
                </>
            ),
        },
    ];

    useEffect(() => {
        pesquisar();
    }, []);

    const pesquisar = (page: number = 1, size: number = 10) => {
        UsuarioService.listar('usuario/listAll', `page=${page - 1}&size=${size}`)
            .then(result => result.data)
            .then(data => setDados(state => ({ ...state, ...data })))
            .catch(error => console.log(error));
    };

    const deletar = (id: number) => {
        UsuarioService.deletar('usuario/', id)
            .then(result => pesquisar(dados.pageable.pageNumber, dados.pageable.pageSize))
            .catch(error => console.log(error));
    };

    return (
        <div style={{ width: '100%' }}>
            <Row>
                <PageHeaderComponent titulo="Lista de Usuário" breadcrumb={breadcrumb} btnNovo={true} />
            </Row>
            <Row>
                <Table
                    dataSource={dados.content}
                    columns={columns}
                    size="middle"
                    pagination={{
                        current: dados.pageable.pageNumber+1,
                        defaultCurrent: 1,
                        defaultPageSize: 10,
                        total: dados.totalElements,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '25', '50'],
                        showTotal: total => `Total ${total} itens`,
                        onChange: (page, pageSize) => pesquisar(page, pageSize),
                        onShowSizeChange: (page, pageSize) => pesquisar(page, pageSize),
                    }}
                />
            </Row>
        </div>
    );
};

export default UsuarioList;
