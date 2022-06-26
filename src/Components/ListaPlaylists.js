import axios from "axios";
import React from "react";
import styled from "styled-components";
import iconefechar from "../img/iconefechar.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Titulo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-top: 5px;
`

const Playlist = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  color: #a5a5a5;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const IconeFechar = styled.img`
  width: 6%;
  margin-right: 8%;
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
    return <p>abcd {playlist.name}</p>;
  };

  render() {
    const mostrarPlaylists = this.props.playlists.map((playlist) => {
      return (
        <Playlist
          key={playlist.id}
          onClick={() => this.props.getPlaylistTracks(playlist)}
        >
          <p>{playlist.name}</p>
          <IconeFechar
            src={iconefechar}
            onClick={() => this.props.deletePlaylist(playlist.id)}
          />
        </Playlist>
      );
    });

    return (
      <Container>
        <Titulo>
          <p>Suas playlists</p>
        </Titulo>
        {mostrarPlaylists}
      </Container>
    );
  }
}

export default ListaPlaylists;
