import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    
      <hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>

  )
}

function ProfileRelationsBox(props){
  console.log(props)
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      {/* <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id }>
                <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                  <img src={itemAtual.image}/>
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'BrunoXL';
  const [comunidades, setComunidades] = React.useState([{
    id: '46465465486',
    title: 'Eu amo Uplifting Trance',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSCNHKhvv2Ikn8proNDKszX4ZC4qyrJdscw&usqp=CAU'
  }])
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
  ]
 
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function() {
    fetch('https://api.github.com/users/BrunoXL/followers')
      .then( (respostaAPI) => {
         return respostaAPI.json()
      })
      .then( (respostaJson) => {
        setSeguidores(respostaJson)
      })
  },[])

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer? </h2>
            <form onSubmit={function handleCommunitiesCreation(e){
              e.preventDefault()
              const dadosDoForm = new FormData(e.target)
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  type="text" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  />
                </div>
              <div>
                <input 
                  placeholder="Coloque uma url para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa"
                  />
              </div>

                <button>
                  Criar comunidade
                </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title={"Seguidores"} items={seguidores} />

          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id }>
                      <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                        <img src={itemAtual.image}/>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}