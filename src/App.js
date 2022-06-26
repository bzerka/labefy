import React from "react";
import "./App.css";
import styled from "styled-components";
import Menu from "./Components/Menu";
import Inicio from "./Components/Inicio";
import axios from "axios";
import ListaPlaylists from "./Components/ListaPlaylists";
import AbrirPlaylist from "./Components/AbrirPlaylist";

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
`;

const ContainerEsquerda = styled.div`
  position: fixed;
  width: 18%;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  padding-left: 20px;
  height: 100%;
`;

const ContainerMeio = styled.div`
  width: 82%;
  height: 100%;
  border: 1px solid black;
  margin-left: 18%;
`;

const ContainerMenu = styled.div`
  margin-bottom: 2%;
`;

const ContainerPlaylists = styled.div`
  position: relative;
  height: 70%;
`;

class App extends React.Component {
  state = {
    playlists: [],
    playlistDetails: [],
    abrirPlaylist: "",
    tela: "inicio",
    playlistClicada: [],
  };

  componentDidMount() {
    this.getAllPlaylists();
  }

  getAllPlaylists = () => {
    const AllPlaylists = axios.get(
      "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
      {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    AllPlaylists.then((response) => {
      this.setState({ playlists: response.data.result.list });
    }).catch((error) => {
      console.log(error.response.data.message);
    });
  };

  deletePlaylist = (id) => {
    if (window.confirm("Tem certeza de que deseja deletar?")) {
      const deletePlaylist = axios.delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
        {
          headers: {
            Authorization: "igor-castro-ailton",
          },
        }
      );

      deletePlaylist
        .then((response) => {
          alert("Playlist deletada com sucesso.");
          this.getAllPlaylists();
        })
        .catch((error) => {
          alert("Playlist não foi deletada, tente novamente.");
          console.log(error.response.data.message);
        });
    }
  };

  getPlaylistTracks = (playlist) => {
    const playlistTracks = axios.get(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`,
      {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    playlistTracks
      .then((response) => {
        this.setState({ playlistDetails: response.data.result.tracks });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

      this.setState({ tela: "abrirplaylist", playlistClicada: playlist});
  };

  mudarTela = (mudar) => {
    this.setState({ tela: mudar})
  }

  render() {
    return (
      <Container>
        <ContainerEsquerda>
          <ContainerMenu>
            <Menu mudarTela={this.mudarTela} getAllPlaylists={this.getAllPlaylists} />
          </ContainerMenu>
          <hr size="1" width="92%" color="grey"></hr>
          <ContainerPlaylists>
            <ListaPlaylists
              abrirPlaylist={this.state.abrirPlaylist}
              getPlaylistTracks={this.getPlaylistTracks}
              deletePlaylist={this.deletePlaylist}
              playlists={this.state.playlists}
            />
          </ContainerPlaylists>
        </ContainerEsquerda>
        <ContainerMeio>
          {this.state.tela === "abrirplaylist" && (
            <AbrirPlaylist
              playlistClicada={this.state.playlistClicada}
              getPlaylistTracks={this.getPlaylistTracks}
              playlistDetails={this.state.playlistDetails}
            />
          )}
          {this.state.tela === "inicio" && (
            <Inicio />
          )}
        </ContainerMeio>
      </Container>
    );
  }
}

export default App;
