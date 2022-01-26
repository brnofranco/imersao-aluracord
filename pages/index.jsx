import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';



function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((fullResponse) => {
      setName(fullResponse.name);
    });

  }, [username]);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(http://www.osmais.com/wallpapers/201406/praia-tropical-deserta-wallpaper.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[500],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={
              (event) => {
                event.preventDefault();
                router.push('/chat');
              }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(text) => setUsername(text.target.value)}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[800],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[600],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}
          

          {/* Photo Area */}
          
            
            {
              username.length < 2 
              ? (
                <>
                  <p>Digite seu user</p>
                </>
              )
              : (
                  <Box
                    styleSheet={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxWidth: '200px',
                      padding: '16px',
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                      border: '1px solid',
                      borderColor: appConfig.theme.colors.neutrals[700],
                      borderRadius: '10px',
                      flex: 1,
                      minHeight: '240px',
                    }}
                  >
                      <Image
                          styleSheet={{
                            borderRadius: '50%',
                            marginBottom: '16px',
                          }}
                          src={`https://github.com/${username}.png`}
                      />
                      <Text
                        variant="body4"
                        styleSheet={{
                          color: appConfig.theme.colors.neutrals[200],
                          backgroundColor: appConfig.theme.colors.neutrals[900],
                          padding: '3px 10px',
                          borderRadius: '1000px'
                        }}
                      >
                    {name}
                  </Text>
                  </Box>
              )
            }
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}