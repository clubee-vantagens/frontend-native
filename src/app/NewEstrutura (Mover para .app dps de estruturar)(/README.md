



    Após a reestruturação das pastas deve-se mover
    tudo dentro de NewEstrutura e exclui-lá.
    ficando com a estrutura esperada abaixo:
    
    src/
├── app/
│   ├── _layout.js              # Layout raiz para navegação
│
│   ├── (tabs)/                 # Rotas principais com abas (Expo Router usa () para nested routes https://docs.expo.dev/router/advanced/tabs/)
│   │   ├── index.js            # Home (tab principal)
│   │   ├── menu.js             # Abas: Menu
│   │   ├── profile.js          # Abas: Perfil
│   │   ├── support.js          # Abas: Suporte
│   │   ├── notifications.js    # Abas: Notificações
│
│   ├── authentication/         # Fora das abas: fluxo de login
│   │   ├── signin.js
│   │   ├── signup.js
│   │   ├── confirmEmail.js
│
│   ├── menu/                   # Subrotas do menu
│   │   ├── categories.js
│   │   ├── rescues.js
│   │   └── menuScreen.js
│
│   ├── profile/                # Subrotas do perfil
│   │   ├── editProfile.js
│   │   ├── changePassword.js
│   │   └── security.js
│
│   ├── support/                # Subrotas de ajuda e suporte
│   │   ├── faleConosco.js
│   │   ├── faq.js
│   │   └── helpCenter.js
│
│   ├── notifications/          # Subrotas de notificações
│   │   └── notifications.js
│
│   ├── others/                 # páginas avulsas
│   │   ├── referralPage.js
│   │   └── avaliation.js
│
│   └── onboardingScreen.js     # Tela de onboarding inicial
│
├── assets/                     # Imagens, fontes, etc.
├── components/                 # Componentes reutilizáveis 
├── constants/                  # Constantes globais 
├── context/                    # Context API 
├── hooks/                      # Hooks customizados
├── services/                   # Requisições API
├── themes/                     # Temas 
├── utils/                      # Funções auxiliares e helpers
├── navigation/                 # (Opcional) Configuração extra de navegação
│   └── AppTabs.js              # Tabs customizadas 
├── .gitignore
├── README.md
├── app.json
├── babel.config.js
├── package-lock.json
└── package.json
