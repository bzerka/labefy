import axios from "axios";
import React from "react";
import styled from "styled-components";

const Playlist = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
`;

const Button = styled.button`
  width: 80%;
`;

const MainContainer = styled.div`
  position: absolute;
  left: 20%;
`;

class ListaPlaylists extends React.Component {

  onChangeInputName = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onChangeInputArtist = (e) => {
    this.setState({ inputArtist: e.target.value });
  };

  onChangeInputUrl = (e) => {
    this.setState({ inputUrl: e.target.value });
  };

  abrirTela = (playlist) => {
    return <p>abcd {playlist.name}</p>
  }

  render() {
    const mostrarPlaylists = this.props.playlists.map((playlist) => {
      return (
        <Playlist key={playlist.id}>
          <p>{playlist.name}</p>
          <Button onClick={() => this.props.getPlaylistTracks(playlist)}>
            Abrir playlist
          </Button>
          <Button onClick={() => this.props.deletePlaylist(playlist.id)}>
            X
          </Button>
        </Playlist>
      );
    });

    return <div>{mostrarPlaylists}</div>;
  }
}

export default ListaPlaylists;
