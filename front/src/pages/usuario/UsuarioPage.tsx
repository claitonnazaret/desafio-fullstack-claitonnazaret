import React, { useEffect, useState } from 'react';
import PageHeaderComponent from 'component/PageHeaderComponent';
import { BreadcrumbType } from '../../types/BreadcrumbType';
import { Form, Input, Button, Row, Col, Tag } from 'antd';
import { ErrorMessage, Field, Formik, FormikActions, FormikProps } from 'formik';
import { initEndereco, initUsuario, schemaUsuario } from './validationUsuario';
import { MaskedInput } from 'antd-mask-input';
import { MASK_CEP, MASK_CPF, MASK_TELEFONE } from '../../util/mask';
import { UsuarioService } from '../../service/UsuarioService';
import { Usuario } from '../../types/Usuario';

const UsuarioPage = ({ match, history }: any) => {
    const [usuario, setUsuario] = useState(initUsuario);
    const [liberarEndereco, setLiberar] = useState(false);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 23 },
        },
    };

    useEffect(() => {
        if (match.params.id !== 'undefined') {
            UsuarioService.listaUm(`usuario/listOne/${match.params.id}`)
                .then(result => result.data)
                .then(data => {
                    setUsuario({ ...data });
                })
                .catch(error => console.error(error));
        }
    }, []);
    const breadcrumb: BreadcrumbType = {
        title: `Usuário / Cadastro / ${match.params.id != 'undefined' ? match.params.id : 'Novo'}`,
        url: match.url,
    };

    const salvar = (values: any, form): any => {
        UsuarioService.salvar(`usuario/`, values)
            .then(result => result.data)
            .then(data => {
                form.resetForm(initUsuario);
                history.push('/usuario');
            })
            .catch(error => console.error(error));
    };

    const pesquisarCep = cep => {
        if (cep) {
            cep = cep.replace(/[^0-9]/g, '');
            if (cep.length == 8) {
                UsuarioService.pesquisaCep(cep)
                    .then(result => result.data)
                    .then(data => {
                        if (data.erro) {
                            setUsuario(state => ({
                                ...state,
                                ...initEndereco,
                            }));
                            setLiberar(true);
                        } else {
                            setUsuario(state => ({
                                ...state,
                                ...data,
                            }));
                            setLiberar(false);
                        }
                    })
                    .catch(error => console.log(JSON.stringify(error)));
            }
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Row>
                <PageHeaderComponent titulo="Cadastro de Usuário" breadcrumb={breadcrumb} btnNovo={false} />
            </Row>

            <Formik
                enableReinitialize={true}
                initialValues={usuario}
                onSubmit={(values, formikActions) => salvar(values, formikActions)}
                validationSchema={schemaUsuario}
                render={(formProps: FormikProps<Usuario>) => (
                    <Form layout="vertical" {...formItemLayout}>
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    label="NOME"
                                    validateStatus={
                                        formProps.errors.nomeCompleto && formProps.touched.nomeCompleto ? 'error' : ''
                                    }
                                >
                                    <Field
                                        name="nomeCompleto"
                                        placeholder="Digite seu nome completo"
                                        render={({ field, form }) => <Input {...field} />}
                                    />
                                    <ErrorMessage name="nomeCompleto" component="div" className="invalid-feedback" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="CPF">
                                    <Field
                                        name="cpf"
                                        placeholder="Digite seu nome completo"
                                        render={({ field, form }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={MASK_CPF}
                                                // onChange={e => {
                                                //     e.target.name = e.target.value;
                                                // }}
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Telefone">
                                    <Field
                                        name="telefone"
                                        placeholder="Digite seu telefone"
                                        render={({ field, form }) => <MaskedInput {...field} mask={MASK_TELEFONE} />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="NOME MÃE">
                                    <Field
                                        name="nomeMae"
                                        placeholder="Digite o nome da mãe"
                                        render={({ field, form }) => <Input {...field} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="NOME PAI">
                                    <Field
                                        name="nomePai"
                                        placeholder="Digite o nome do pai"
                                        render={({ field, form }) => <Input {...field} />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <Form.Item label="CEP">
                                    <Field
                                        name="cep"
                                        placeholder="Digite o CEP"
                                        render={({ field, form }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={MASK_CEP}
                                                onChange={e => {
                                                    e.target.name = e.target.value;
                                                    pesquisarCep(e.target.value);
                                                }}
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="LOGRADOURO">
                                    <Field
                                        name="logradouro"
                                        placeholder="Digite o Logradouro"
                                        render={({ field, form }) => <Input {...field} readOnly={!liberarEndereco} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="NUMERO">
                                    <Field
                                        name="numero"
                                        placeholder="Digite o Número"
                                        render={({ field, form }) => <Input {...field} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="COMPLEMENTO">
                                    <Field
                                        name="complemento"
                                        placeholder="Digite o Complemento"
                                        render={({ field, form }) => <Input {...field} readOnly={!liberarEndereco} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="IBGE">
                                    <Field
                                        name="ibge"
                                        placeholder="Digite o IBGE"
                                        render={({ field, form }) => <Input {...field} readOnly={!liberarEndereco} />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Form.Item label="BAIRRO">
                                    <Field
                                        name="bairro"
                                        placeholder="Digite o Bairro"
                                        render={({ field, form }) => <Input {...field} readOnly={!liberarEndereco} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item label="MUNICÍPIO">
                                    <Field
                                        name="localidade"
                                        placeholder="Digite o Município"
                                        render={({ field, form }) => <Input {...field} readOnly={!liberarEndereco} />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="UF">
                                    <Field
                                        name="uf"
                                        placeholder="Digite a uf"
                                        render={({ field, form }) => (
                                            <Input {...field} readOnly={!liberarEndereco} maxLength={2} />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item wrapperCol={{ span: 24, offset: 23 }}>
                            <Button type="primary" size="large" shape="round" onClick={formProps.submitForm}>
                                Salvar
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            />
        </div>
    );
};

export default UsuarioPage;
