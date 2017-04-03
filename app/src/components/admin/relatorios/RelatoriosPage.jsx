import React from 'react'
import {Row, Jumbotron, Button, Col} from 'react-bootstrap'
import '../styles/relatorios.scss'
import { Link } from 'react-router'

export default class RelatoriosPage extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={12}>
            <Jumbotron className="admin-jumbotron text-center">
              <h1>Relatórios</h1>
            </Jumbotron>
            <Col xs={12} mdOffset={2} md={4}>
              <Link to="/admin/relatorios/imoveis">
              <Button className="relatorio-button" bsSize="large" block>
                Relatório de Imóveis
              </Button>
            </Link>
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
}