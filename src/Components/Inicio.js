import axios from "axios";
import React from "react";
import styled from "styled-components";
import iconetopplaylist from "../img/iconetopplaylist.png";
import dailymix1 from "../img/dailymix1.png";
import todaystop from "../img/todaystop.png";
import popup from "../img/popup.png";
import popbrasil from "../img/popbrasil.png";
import mixanos2010 from "../img/mixanos2010.png";
import topbrasil from "../img/topbrasil.png";
import botaoplay from "../img/botaoplay.png";

const Container = styled.div`
  height: 100%;
  background-color: #121212;
  padding: 20px 30px;
`;

const ContainerTopPlaylist = styled.div`
  height: 351px;
  display: flex;
  background-color: black;
  padding: 15px 15px 15px 15px;
  border-radius: 5px;
`;

const ContainerImgTopPlaylist = styled.div`
  width: 22%;
  display: flex;
  align-items: end;
  justify-content: center;
`;

const ImgTopPlaylist = styled.img`
  height: 78%;
  max-height: 220px;
  min-width: 100px;
  width: 100%;
`;

const ContainerTextoTopPlaylist = styled.div`
  color: white;
  width: 78%;
  padding-left: 15px;
`;

const TextoPequeno = styled.p`
  font-size: 14px;
`;

const TextoMedio = styled.p`
  font-size: 15px;
  font-family: sans-serif;
`;

const TextoGrande = styled.p`
  font-size: 70px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #1ed760;
  width: 90px;
  height: 50px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    width: 92px;
    height: 51px;

  }
`;

const ContainerOutrasPlaylist = styled.div`
  height: 35%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
`;

const playlists = [
  {
    nome: "Daily Mix 1",
    imagem: dailymix1,
    url: "https://www.youtube.com/watch?v=Hn7WDtF3nKA&list=PLH0aXOIOOHZRS2bZTP6tdIG8DouCB2Y64",
  },
  {
    nome: "Pop Up",
    imagem: popup,
    url: "https://www.youtube.com/watch?v=H5v3kku4y6Q&list=PLI_7Mg2Z_-4Lf7IYeiTEOV8HBn-nMqz5N",
  },
  {
    nome: "Top Brasil",
    imagem: topbrasil,
    url: "https://www.youtube.com/watch?v=vAM1xXdRnH0&list=PLJ8E1oONCGCShJv_fZXsz3mXVn0Y6kDPW",
  },
  {
    nome: "Mix anos 2010",
    imagem: mixanos2010,
    url: "https://www.youtube.com/watch?v=pRpeEdMmmQ0&list=PLKl-ToKj7DF7Bl7DqSmT5bSpAuVWsBV0l",
  },
  {
    nome: "Today's Top Hits",
    imagem: todaystop,
    url: "https://www.youtube.com/watch?v=H5v3kku4y6Q&list=PLLdPJGHquctFFaYNmcSIZVjpHxjO9dZTS",
  },
  {
    nome: "Pop Brasil",
    imagem: popbrasil,
    url: "https://www.youtube.com/watch?v=iLTR0UyG2Yo&list=PLwd1GA8E_KI9ezPqpA-NiZhn4OqaZxmB7",
  },
];

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-end-start-radius: 5px;
  border-top-left-radius: 5px;
`;

const ContainerPlaylists = styled.div`
  display: flex;
  width: 32%;
  min-width: 250px;
  height: 80px;
  background-color: #2a2a2a;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #414141;
  }
`;

const NovasPlaylitsTexto = styled.div`
  height: 4%;
  margin: 2% 0 1% 0;
  color: white;
  font-size: 18px;
`;
const CardPlaylistImg = styled.div`
  width: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardPlaylistTexto = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  padding-left: 10px;
  color: white;
  font-size: 16px;
  &:hover .ButtonPlay {
    visibility: visible;
    opacity: 1;
  }
`;

const ImgPlay = styled.img`
  width: 18px;
`;

const ButtonPlay = styled.button`
  background-color: #1ed760;
  border: 1px solid #1ed760;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 16px;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.8s linear;
  -moz-transition: opacity 0.8s linear;
  -o-transition: opacity 0.8s linear;
  transition: opacity 0.8s linear;
  &:hover {
    cursor: pointer;
  }
`;

class Inicio extends React.Component {
  abrirPlaylist = (musica) => {
    window.open(musica.url, "_blank");
  };

  render() {
    const aparecerPlaylists = playlists.map((musica) => {
      return (
        <ContainerPlaylists onClick={() => this.abrirPlaylist(musica)} key={musica.nome}>
          <CardPlaylistImg>
            <Img src={musica.imagem} />
          </CardPlaylistImg>
          <CardPlaylistTexto>
            {musica.nome}
            <ButtonPlay className="ButtonPlay">
              <ImgPlay src={botaoplay} />
            </ButtonPlay>
          </CardPlaylistTexto>
        </ContainerPlaylists>
      );
    });

    return (
      <Container>
        <ContainerTopPlaylist>
          <ContainerImgTopPlaylist>
            <ImgTopPlaylist src={iconetopplaylist} />
          </ContainerImgTopPlaylist>
          <ContainerTextoTopPlaylist>
            <TextoPequeno>PLAYLIST</TextoPequeno>
            <TextoGrande>Sertajeno 2022</TextoGrande>
            <TextoGrande>Mais Tocadas ...</TextoGrande>
            <TextoMedio>
              SEXTOU só com as TOP do SERTANEJO. Ouça agora na melhor playlist
              do labefy!
            </TextoMedio>
            <a
              href="https://www.youtube.com/watch?v=r2ma8WPRppk&list=PL0ao6cotJFFUgKFlnkidAO7S5pWXQtiLB"
              target="_blank"
            >
              <Button>Play</Button>
            </a>
          </ContainerTextoTopPlaylist>
        </ContainerTopPlaylist>
        <NovasPlaylitsTexto>
          <p>Você também pode gostar de:</p>
        </NovasPlaylitsTexto>
        <ContainerOutrasPlaylist>{aparecerPlaylists}</ContainerOutrasPlaylist>
      </Container>
    );
  }
}

export default Inicio;
