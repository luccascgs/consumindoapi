import React, { Component } from "react";
import api from './api';

class App extends Component {

  state = {
    filmes: [],
    query: ''
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value })
  }

  async fetchFilmes(query) {
    const response = await api.get(query);
    this.setState({ filmes: response.data });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.fetchFilmes(query);
  }

  render() {
    const { filmes, query } = this.state;
    return (
      <div>
        <h1>Listar Filmes</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Pesquisar por Título:</label>
          <input type="text" value={query} onChange={this.handleInputChange} />
          <button type="submit">Pesquisar</button>
        </form>
        {
          filmes.map(filme => (
            <li key={filme.show.id}>
              <h2>Título: <strong>{filme.show.name}</strong></h2>
              <p>
              {filme.show.image && filme.show.image.medium ?(
                <img src={filme.show.image.medium} alt={"logo"} />
              ) : (
                <span>Imagem não disponível</span>
              )}  
              </p>
              <br />
              <a href={filme.show.url} target="blank">{filme.show.url}</a>
            </li>
          ))
        }
      </div>
    );
  };
};

export default App;