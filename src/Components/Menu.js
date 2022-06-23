import axios from "axios";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  border: 1px solid black;
`;

const Input = styled.input`
  width: 100%;
`

class Menu extends React.Component {
  state = {
    inputNomePlaylist: "",
  };

  onChangeInputNomePlaylist = (e) => {
    this.setState({ inputNomePlaylist: e.target.value})
  }

  adicionarPlaylist = () => {
    const body = {
        name: this.state.inputNomePlaylist,
    }

    const addPlaylist = axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, {
        headers: {
            Authorization: "igor-castro-ailton"
        },
    });

    addPlaylist
      .then((response) => {
        alert("Playlist criada com sucesso!");
        this.props.getAllPlaylists();

      })
      .catch((error) => {
        alert("Playlist não foi criada, tente novamente mais tarde.");
        console.log(error.response.data.message);
      });

      this.setState({inputNomePlaylist: ""})
  }

  render() {
    return (
      <Container>
          <div>
            <h3>Criar uma nova playlist</h3>
            <div>
              <Input value={this.state.inputNomePlaylist} onChange={this.onChangeInputNomePlaylist} placeholder="Nome da playlist" />
              <button onClick={this.adicionarPlaylist}>Adicionar playlist</button>
            </div>
          </div>
      </Container>
    );
  }
}

export default Menu;
