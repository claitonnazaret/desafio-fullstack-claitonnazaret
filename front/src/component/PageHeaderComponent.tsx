import React, { Component, ReactPropTypes } from 'react';
import { Breadcrumb, PageHeader, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { BreadcrumbType } from '../types/BreadcrumbType';

interface PageHeaderInterface {
    titulo: string;
    breadcrumb: BreadcrumbType;
    btnNovo?: boolean;
}

const PageHeaderDefaults: PageHeaderInterface = {
    titulo: '',
    breadcrumb: {
        title: '',
        url: '',
    },
    btnNovo: false,
};

class PageHeaderComponent extends Component<PageHeaderInterface> {
    private options: PageHeaderInterface;
    constructor(props: any) {
        super(props);
        this.options = { ...PageHeaderDefaults, ...props };
    }
    render(): React.ReactNode {
        const props = this.props;
        return (
            <PageHeader
                style={{ width: '100%' }}
                title={this.options.titulo}
                extra={
                    this.options.btnNovo && [
                        <Link to="/usuario/undefined" key={1}>
                            <Button key="1" type="primary" icon="plus-circle">
                                Novo
                            </Button>
                        </Link>,
                    ]
                }
                footer={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={this.options.breadcrumb.url}>
                                {this.options.breadcrumb.title}
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
                onBack={() => window.history.back()}
            />
        );
    }
}

export default PageHeaderComponent;
