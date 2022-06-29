# Projeto Labefy

link do surge: https://quiet-arm.surge.sh/

**Proposta:**  Montar uma integração com a API Labefy, que permite o gerenciamento básico de playlists de músicas.

## Sobre o projeto

O projeto foi feito utilizando apenas React e estilizado com styled-components. Nas últimas horas da confecção do projeto utilizei uma framework chamada Materialize (https://materializecss.com/) para a criação de um controlador de áudio, porém desisti e mantive apenas a estilização dos inputs, fica para um próximo projeto. 

## Funcionalidades/não funcionalidades do projeto

### Barra de navegação esquerda
#### Funciona:<br>
Botão inicial renderiza a tela inicial do site.
Botão criar playlist abre uma área para o usuário inserir o nome da playlist que deseja criar e um botão para cria-lá.
Playlists renderizadas após serem criadas, com um botão para remover-las. Quando clicado em cima das playlists é renderizado na tela da direita os detalhes desta playlist,  como suas músicas e a possibilidade de ouvi-lás.

#### Não funciona:<br>
Botão buscar não teve sua função implementada.

### Tela principal (direita)

#### Pagina inicial<br>
#### Funciona:<br>
Botão play (verde) redireciona para a playlist do youtube em questão (sertanejo 2022)
Dentro de cada playlist no canto inferior ao passar o mouse aparece um botão de play, ao clicar em cima de qualquer parte do card é redirecionado para a playlist em questão no youtube.

#### Página das playlists<br>
#### Funciona:<br>
Ao clicar em cima das músicas ela toca no controlador de áudio fixado no footer da pagina, quando clicamos em outra música, esta agora passa a tocar no mesmo controlador.
Botão para remover cada música no canto direito delas.
Local para adicionar uma música, com 3 inputs e um botão para adicionar, quando adicionadas são renderizadas na tela automaticamente. 

### Prints do labefy

<p>Tela inicial</p>
<img src="https://user-images.githubusercontent.com/100432523/175800707-3c2830ab-8ec4-46fc-9c6f-19d037d1a51b.png" alt="Tela inicial" width="350px" height="200px"/>

<p>Tela detalhes da playlist</p>
<img src="https://user-images.githubusercontent.com/100432523/175800708-a77bbecc-7588-4373-92f5-64726c186525.png" alt="Tela inicial" width="350px" height="200px"/>

<p></p>
<img src="https://user-images.githubusercontent.com/100432523/175800709-54b05033-8e00-4618-8984-6b5e481801ad.png" alt="Tela inicial" width="350px" height="200px"/>

Caso encontre esse warning:<br>
Mixed Content: The page at '<URL>' was loaded over HTTPS, but requested an insecure audio file '<URL>'. This content should also be served over HTTPS.<br>
É porque as músicas tocadas possuem links http, por isso precisará permitir o navegador a mostrar conteúdo não seguro.
  
 <p>Siga esses passos (no caso do chrome) para resolver.</p>
 <img src="https://user-images.githubusercontent.com/100432523/175832520-c2167f87-459d-45f4-998c-418f3a7a488a.png" alt="Tela inicial" width="350px" height="200px"/>
