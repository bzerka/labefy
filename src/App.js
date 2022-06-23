import React from "react";
import "./App.css";
import styled from "styled-components";
import Menu from "./Components/Menu";
import axios from "axios";
import ListaPlaylists from "./Components/ListaPlaylists";
import AbrirPlaylist from "./Components/AbrirPlaylist";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  border: 1px solid black;
  display: flex;
`;

const ContainerEsquerda = styled.div`
  width: 18%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ContainerMeio = styled.div`
  width: 82%;
  border: 1px solid black;
`;

const ContainerMenu = styled.div`
  height: 30%;
  border: 1px solid red;
`;

const ContainerPlaylists = styled.div`
  height: 70%;
  border: 1px solid red;
`;

class App extends React.Component {
  state = {
    playlists: [],
    playlistDetails: [],
    abrirPlaylist: "",
    tela: "",
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
        console.log(response);
        this.setState({ playlistDetails: response.data.result.tracks });
        console.log(this.state.playlistDetails);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    this.setState({ tela: "abrirplaylist", playlistClicada: playlist });
  };

  render() {
    return (
      <Container>
        <ContainerEsquerda>
          <ContainerMenu>
            <Menu getAllPlaylists={this.getAllPlaylists} />
          </ContainerMenu>
          <ContainerPlaylists>
            <ListaPlaylists
              abrirPlaylist={this.state.abrirPlaylist}
              getPlaylistTracks={this.getPlaylistTracks}
              deletePlaylist={this.deletePlaylist}
              playlists={this.state.playlists}
              mudarTela={this.mudarTela}
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
        </ContainerMeio>
      </Container>
    );
  }
}

export default App;
