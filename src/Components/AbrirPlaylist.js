import axios from "axios";
import React from "react";
import "./AbrirPlaylist.css";
import styled from "styled-components";
import playlistfoto from "../img/playlistfoto.png";
import iconefechar from "../img/iconefechar.png";
import iconeadicionar from "../img/iconeadicionar.png";

const Container = styled.div`
  height: 100%;
  width: 100%;
  color: white;
`;

const Button = styled.button`
  margin-left: 10px;
  width: 90px;
  height: 35px;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  border: 1px solid white;
  background-color: #121212;
  &:hover {
    cursor: pointer;
  }
`;

const ContainerMusicas = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
  padding: 5px 15px 5px 20px;
  border-radius: 5px;
  font-weight: 16px;
  &:hover {
    background-color: #2a2a2a;
    cursor: pointer;
  }
`;

const ContainerNomeArtista = styled.div`
  color: white;
`;

const NomeArtista = styled.p`
  font-size: 14px;
  color: #b3b3b3;
`;

const ContainerNumeracao = styled.div`
  color: #b3b3b3;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 30%;
`;

const ContainerPlaylistTitulo = styled.div`
  height: 232px;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

const ContainerTitulo = styled.div`
  width: 100%;
  background-color: #4a4a4a;
  padding: 30px;
`;

const ContainerTodasMusicas = styled.div`
  width: 100%;
  background-color: #121212;
  padding: 25px;
  min-height: 331px;
  padding-bottom: 85px;
`;

const ImagemPlaylist = styled.img`
  box-shadow: 5px 5px 8px 5px rgba(0, 0, 0, 0.15);
  height: 100%;
`;

const NomePlaylist = styled.p`
  font-size: 80px;
`;

const ContainerPlaylistTexto = styled.div`
  padding-left: 30px;
  margin-top: 40px;
`;

const TituloERemover = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  color: #b3b3b3;
  margin-bottom: 5px;
`;

const TituloTexto = styled.div`
  display: flex;
  gap: 20px;
`;

const IconeRemover = styled.img`
  width: 18px;
`;

const ContainerAdicionarMusica = styled.div`
  font-size: 18px;
  margin: 10px 0;
  background-color: #2c2c2c;
  width: 230px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const InputAddMusica = styled.input`
  height: 30px;
  border-radius: 5px;
  padding-left: 5px;
  color: white;
`;

const TextoMedio = styled.p`
  font-size: 24px;
  margin-top: 30px;
`;

const IconeAdicionar = styled.img`
  width: 30px;
`;

const ContainerAudioControle = styled.div`
  position: fixed;
  display: flex;
  background-color: #181818;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 82%;
  height: 80px;
  box-shadow: 5px 5px 8px 5px rgba(0, 0, 0, 0.80);
`;

const AudioTexto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 30%;
  padding: 0 0 0 40px;
`;

const AudioControl = styled.div`
  width: 70%;
`;

class AbrirPlaylist extends React.Component {
  state = {
    inputName: "",
    inputArtist: "",
    inputUrl: "",
    telaAdicionarMusica: false,
    musicaTocando: false,
    musicaAtual: "",
    bandaAtual: "",
    indexAtual: ""
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
        this.props.getPlaylistTracks(this.props.playlistClicada);
        this.setState({ inputName: "", inputArtist: "", inputUrl: "" });
      })
      .catch((error) => {
        alert("Preencha os dados para adicionar a sua música.");
        this.setState({ inputName: "", inputArtist: "", inputUrl: "" });
      });

    this.setState({ telaAdicionarMusica: !this.state.telaAdicionarMusica });
  };

  removerMusica = (musicas) => {
    const playlistTracks = axios.delete(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlistClicada.id}/tracks/${musicas.id}`,
      {
        headers: {
          Authorization: "igor-castro-ailton",
        },
      }
    );

    playlistTracks
      .then((response) => {
        alert("Musica deletada com sucesso.");
        this.props.getPlaylistTracks(this.props.playlistClicada);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  aparecerTelaAdicionarMusica = () => {
    this.setState({ telaAdicionarMusica: !this.state.telaAdicionarMusica });
  };

  audioSrc = (musicas) => {
    const audio = document.querySelector("audio");
    audio.src = musicas.url;
    this.setState({musicaAtual: musicas.name, bandaAtual: musicas.artist})
  };
  
  render() {
    let index = 1;
    const musicasPlaylist = this.props.playlistDetails.map((musicas) => {
      return (
        <ContainerMusicas
          key={musicas.id}
          onClick={() => this.audioSrc(musicas)}
        >
          <ContainerNumeracao>
            {index++}
            <ContainerNomeArtista>
              <p>{musicas.name}</p>
              <NomeArtista>{musicas.artist}</NomeArtista>
            </ContainerNomeArtista>
          </ContainerNumeracao>
          <IconeRemover
            src={iconefechar}
            onClick={() => this.removerMusica(musicas)}
          />
        </ContainerMusicas>
      );
    });

    return (
      <Container>
        <ContainerTitulo>
          <ContainerPlaylistTitulo>
            <ImagemPlaylist src={playlistfoto} />
            <ContainerPlaylistTexto>
              <p>PLAYLIST PÚBLICA</p>
              <NomePlaylist>{this.props.playlistClicada.name}</NomePlaylist>
            </ContainerPlaylistTexto>
          </ContainerPlaylistTitulo>
        </ContainerTitulo>
        <ContainerTodasMusicas>
          <TituloERemover>
            <TituloTexto>
              <p>#</p>
              <p>TÍTULO</p>
            </TituloTexto>
            <p>Remover</p>
          </TituloERemover>
          <hr size="1" width="100%" color="grey"></hr>
          <section>{musicasPlaylist}</section>
          <TextoMedio>Vamos incrementar sua playlist</TextoMedio>
          <ContainerAdicionarMusica
            onClick={() => this.aparecerTelaAdicionarMusica()}
          >
            <IconeAdicionar src={iconeadicionar} />
            <p>Adicionar uma musica</p>
          </ContainerAdicionarMusica>
          {this.state.telaAdicionarMusica && (
            <div>
              <InputAddMusica
                placeholder="nome"
                value={this.state.inputName}
                onChange={this.onChangeInputName}
              />
              <InputAddMusica
                placeholder="artista"
                value={this.state.inputArtist}
                onChange={this.onChangeInputArtist}
              />
              <InputAddMusica
                placeholder="url"
                value={this.state.inputUrl}
                onChange={this.onChangeInputUrl}
              />
              <Button
                onClick={() =>
                  this.adicionarMusica(this.props.playlistClicada.id)
                }
              >
                Adicionar
              </Button>
            </div>
          )}
        </ContainerTodasMusicas>
        <ContainerAudioControle>
          <AudioTexto>
            <p>{this.state.musicaAtual}</p>
            <NomeArtista>{this.state.bandaAtual}</NomeArtista>
          </AudioTexto>
          <AudioControl>
            <audio className="audio" autoPlay controls />
          </AudioControl>
        </ContainerAudioControle>
      </Container>
    );
  }
}

export default AbrirPlaylist;
