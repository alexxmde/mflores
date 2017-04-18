import React from 'react'
import {Pagination, Row, Col, Image, Button} from 'react-bootstrap'
import Input from '../utils/Input.jsx'
import SearchField from '../utils/SearchField.jsx'
import ImoveisPageStore from '../../stores/public/imoveisPageStore.js'
import { observer } from 'mobx-react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css';
import './styles/imoveis.scss'
import { Link } from 'react-router'

@observer
export default class ImoveisPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImoveisPageStore()

  }
  componentDidMount() {
    this.store.getImoveis()
  }
  render() {
    return (
      <div className="container">
      <header className="row cima">
        <header className="col-md-6">
          <a href="index.html" title="atalho para a home"><img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" /></a>
        </header>
        <Col xs={12} md={6}  id="search">
          <SearchField 
            handleSearchChange={this.onSearchChange.bind(this)}
            search={this.store.search}
            placeholder="Pesquise aqui..."
          />
        </Col>
      </header>


      <Row>
        <Col className="search-bar text-center" xs={12} md={12}>
          <Col xs={12} md={6}>
            <Col xs={12}>
              <h3>Faixa de Preço de Venda</h3>
              <form onSubmit={this.onPrecoVendaSubmit.bind(this)} >
                <Input label="De"
                  onChange={this.onPrecoVendaDeChange.bind(this)}
                  value={this.store.precoVendaDe}
                />
                <Input label="Até"
                  onChange={this.onPrecoVendaAteChange.bind(this)}
                  value={this.store.precoVendaAte}
                />
                <Button type="submit">
                  Pesquisar
                </Button>
              </form>
            </Col>
          </Col>
          <Col xs={12} md={6}>
            <h3>Faixa de Preço de Locação</h3>
            <form onSubmit={this.onPrecoLocacaoSubmit.bind(this)}>
              <Input label="De"
                onChange={this.onPrecoLocacaoDeChange.bind(this)}
                value={this.store.precoLocacaoDe}
              />
              <Input label="Até" 
                onChange={this.onPrecoLocacaoAteChange.bind(this)}
                value={this.store.precoLocacaoAte}
              />
              <Button type="submit">
                Pesquisar
              </Button>
            </form>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col className="imoveis">
          <Row>
            {this.store.imoveis.map(i => (
              <Col key={i._id} xs={12} md={3} style={{minHeight:'450px'}}>
                <h3>{i.website.titulo}</h3>
                <Image src={'/img/imoveis/thumbnails/'+i.imagemPrincipal} className="imovel-image" responsive/>
                <h4 className="text-center" style={{color:'#c8002d'}}> {i.website.subtitulo}</h4>
                <p>{i.website.descricao}</p>
                {i.precoVenda ? (
                <p>Preço de venda: {this.formatToReal(i.precoVenda)}</p>
                ) : <p></p>
                }

                {i.precoLocacao ?
                (<p>Preço de locação: {this.formatToReal(i.precoLocacao)}</p>
                ) : <p></p>}
                <Link to={`/imovel/${i._id}`}>
                  <Button bsSize="lg" bsStyle="default">
                    Veja mais >>
                  </Button>
                </Link>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12}>
              <Pagination
                activePage={this.store.activePage}
                items={this.store.items}
                onSelect={(e) => {
                  this.store.activePage = e
                  this.store.getImoveis()
                }}
              />
            </Col>
          </Row>

        </Col>
      </Row> </div>
    )
  }

  onSearchChange(e) {
    this.store.search = e.target.value
    this.store.activePage = 1
    this.store.getImoveis('search')

  }

  onPrecoVendaDeChange(e) {
    this.store.precoVendaDe = e.target.value
  }
  onPrecoVendaAteChange(e) {
    this.store.precoVendaAte = e.target.value
  }

  onPrecoVendaSubmit(e) {
    e.preventDefault()
    this.store.search = ''
    this.store.getImoveis('precoVenda')
  }
  formatToReal(valor) {
    return 'R$'+ Intl.NumberFormat('pt-BR').format(valor).toString()
  }

  onPrecoLocacaoDeChange(e) {
    this.store.precoLocacaoDe = e.target.value
  }
  onPrecoLocacaoAteChange(e) {
    this.store.precoLocacaoAte = e.target.value
  }

  onPrecoLocacaoSubmit(e) {
    e.preventDefault()
    this.store.search = ''
    this.store.getImoveis('precoLocacao')
  }

  onPrecoVendaRangeChange(e) {
    this.setState({prevoVendaRange: e})
  }

  onPrecoLocacaoRangeChange(e) {
    this.store.precoLocacaoRange = e
  }

  formatToReal(valor) {
    if(valor)
      return 'R$'+ Intl.NumberFormat('pt-BR').format(valor).toString()
    else
      return ''
  }

}