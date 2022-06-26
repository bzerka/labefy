import axios from "axios";
import React from "react";
import styled from "styled-components";
import iconehome from "../img/iconehome.png";
import iconelupa from "../img/lupa.png";
import iconeadicionar from "../img/iconeadicionar.png";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Input = styled.input`
  width: 70%;
  padding-left: 5px;
  border-radius: 4%;
  border: 1px solid white;
  color: white;
`;

const IconeHome = styled.img`
  width: 25px;
  margin-right: 15px;
`;

const Button = styled.button`
  width: 30%;
  &:hover {
    cursor: pointer;
  }
  border-radius: 30px;
  font-size: bold;
`;

const ContainerIcones = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
  color: #a5a5a5;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const ContainerCriarPlaylist = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
  color: #a5a5a5;
  &:hover {
    cursor: pointer;
    color: white;
  }
  margin-top: 30px;
`

const ContainerAdicionarPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  color: white;
`;

class Menu extends React.Component {
  state = {
    inputNomePlaylist: "",
    adicionarPlaylist: false,
  };

  onChangeInputNomePlaylist = (e) => {
    this.setState({ inputNomePlaylist: e.target.value });
  };

  adicionarPlaylist = () => {
    const body = {
      name: this.state.inputNomePlaylist,
    };

    const addPlaylist = axios.post(
      "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
      body,
      {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    addPlaylist
      .then((response) => {
        alert("Playlist criada com sucesso!");
        this.props.getAllPlaylists();
      })
      .catch((error) => {
        alert("Playlist não foi criada, tente novamente mais tarde.");
        console.log(error.response.data.message);
      });

    this.setState({ inputNomePlaylist: "" });
    this.setState({ adicionarPlaylist: !this.state.adicionarPlaylist });
  };

  aparecerTelaAdicionar = () => {
    this.setState({ adicionarPlaylist: !this.state.adicionarPlaylist });
  };

  render() {
    return (
      <Container>
        <ContainerIcones onClick={() => this.props.mudarTela("inicio")}>
          <IconeHome src={iconehome} />
          <p>Início</p>
        </ContainerIcones>
        <ContainerIcones>
          <IconeHome src={iconelupa} />
          <p>Buscar</p>
        </ContainerIcones>
        <ContainerCriarPlaylist onClick={this.aparecerTelaAdicionar}>
          <IconeHome src={iconeadicionar} />
          <p>Criar playlist</p>
        </ContainerCriarPlaylist>
        {this.state.adicionarPlaylist && (
          <ContainerAdicionarPlaylist>
            <Input
              value={this.state.inputNomePlaylist}
              onChange={this.onChangeInputNomePlaylist}
              placeholder="Nome da playlist"
            />
            <Button onClick={this.adicionarPlaylist}>Salvar</Button>
          </ContainerAdicionarPlaylist>
        )}
      </Container>
    );
  }
}

export default Menu;
