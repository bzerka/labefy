import axios from "axios";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  border: 1px solid black;
`;

const Button = styled.button`
    margin-left: 10px;
`;

const ContainerMusicas = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

`

class AbrirPlaylist extends React.Component {
  state = {
    inputName: "",
    inputArtist: "",
    inputUrl: "",
  };

  onChangeInputName = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onChangeInputArtist = (e) => {
    this.setState({ inputArtist: e.target.value });
  };

  onChangeInputUrl = (e) => {
    this.setState({ inputUrl: e.target.value });
  };

  adicionarMusica = (id) => {
    const body = {
      name: this.state.inputName,
      artist: this.state.inputArtist,
      url: this.state.inputUrl,
    };

    const playlistTracks = axios.post(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
      body,
      {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    playlistTracks
      .then((response) => {
        alert("Musica adicionada com sucesso.");
        this.props.getPlaylistTracks(this.props.playlistClicada)
        this.setState({ inputName: "", inputArtist: "", inputUrl: ""})
      })
      .catch((error) => {
        console.log(error.response.data.message);
        this.setState({ inputName: "", inputArtist: "", inputUrl: ""})
      });
  };
  
  removerMusica = (musicas) => {

    const playlistTracks = axios.delete(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlistClicada.id}/tracks/${musicas.id}`, {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    playlistTracks
      .then((response) => {
        alert("Musica deletada com sucesso.");
        this.props.getPlaylistTracks(this.props.playlistClicada)
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  render() {
    const musicasPlaylist = this.props.playlistDetails.map((musicas) => {
      return (
        <ContainerMusicas>
            <p key={musicas.id}>{musicas.name}</p>
            <audio src={musicas.url} controls/>
            <button onClick={() => this.removerMusica(musicas)}>X</button>
        </ContainerMusicas>
      )
    });

    return (
        <Container>
          Bem vindo a sua playlist de {this.props.playlistClicada.name}
        <div>
            <p>Suas musicas:</p>
            {musicasPlaylist}
        </div>
        <div>
          <input
            placeholder="nome"
            value={this.state.inputName}
            onChange={this.onChangeInputName}
          />
          <input
            placeholder="artista"
            value={this.state.inputArtist}
            onChange={this.onChangeInputArtist}
          />
          <input
            placeholder="url"
            value={this.state.inputUrl} 
            onChange={this.onChangeInputUrl} 
          />
          <Button onClick={() => this.adicionarMusica(this.props.playlistClicada.id)}>
            Salvar
          </Button>
        </div>
      </Container>
    );
  }
}

export default AbrirPlaylist;
