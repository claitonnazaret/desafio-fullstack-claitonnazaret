import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { routes } from './routes/routes';
import { Icon, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    return (
        <Layout className="layout">
            <Header style={{ color: '#fff' }}>
                <Icon
                    type="home"
                    style={{
                        fontSize: '36px',
                        color: '#fff',
                        marginRight: '10px',
                    }}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Router>
                    <Switch>
                        {routes &&
                            routes.map((route, key) => (
                                <Route
                                    key={key}
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                />
                            ))}
                    </Switch>
                </Router>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Desafio Fullstack Automaticket by Claiton Nazaret
            </Footer>
        </Layout>
    );
};

export default App;
