const products = [
  {
    "id": "mira",
    "name": "Mira",
    "category": "creatives",
    "tag": "Créatives",
    "price": 13,
    "image": "./assets/catalogue/photos/creatives/creatives-001.webp",
    "description": "Les Mira sont composées de deux roses bleues texturées avec de petites touches dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "alba",
    "name": "Alba",
    "category": "creatives",
    "tag": "Créatives",
    "price": 13,
    "image": "./assets/catalogue/photos/creatives/creatives-002.webp",
    "description": "Les Alba sont composées de formes turquoise arrondies et d'un motif ondulé, montées sur une attache en acier inoxydable."
  },
  {
    "id": "violette",
    "name": "Violette",
    "category": "creatives",
    "tag": "Créatives",
    "price": 14,
    "image": "./assets/catalogue/photos/creatives/creatives-003.webp",
    "description": "Les Violette sont composées de pétales violets nervurés avec des éclats dorés, montées sur une attache en acier inoxydable."
  },
  {
    "id": "azura",
    "name": "Azura",
    "category": "creatives",
    "tag": "Créatives",
    "price": 14,
    "image": "./assets/catalogue/photos/creatives/creatives-004.webp",
    "description": "Les Azura sont composées de roses bleues texturées avec une finition dorée, montées sur une attache en acier inoxydable."
  },
  {
    "id": "naya",
    "name": "Naya",
    "category": "creatives",
    "tag": "Créatives",
    "price": 10,
    "image": "./assets/catalogue/photos/creatives/creatives-005.webp",
    "description": "Les Naya sont composées de roses turquoise superposées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "prune",
    "name": "Prune",
    "category": "creatives",
    "tag": "Créatives",
    "price": 12,
    "image": "./assets/catalogue/photos/creatives/creatives-006.webp",
    "description": "Les Prune sont composées de fleurs violettes mouchetées d'or, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rosia",
    "name": "Rosia",
    "category": "creatives",
    "tag": "Créatives",
    "price": 15,
    "image": "./assets/catalogue/photos/creatives/creatives-007.webp",
    "description": "Les Rosia sont composées de deux roses rouges suspendues à des crochets dorés."
  },
  {
    "id": "manta",
    "name": "Manta",
    "category": "creatives",
    "tag": "Créatives",
    "price": 13,
    "image": "./assets/catalogue/photos/creatives/creatives-008.webp",
    "description": "Les Manta sont composées d'une silhouette de raie bleue à pois blancs, montées sur une attache en acier inoxydable."
  },
  {
    "id": "liliane",
    "name": "Liliane",
    "category": "creatives",
    "tag": "Créatives",
    "price": 11,
    "image": "./assets/catalogue/photos/creatives/creatives-009.webp",
    "description": "Les Liliane sont composées de petites fleurs mauves en format discret, montées sur une attache en acier inoxydable."
  },
  {
    "id": "ondine",
    "name": "Ondine",
    "category": "creatives",
    "tag": "Créatives",
    "price": 12,
    "image": "./assets/catalogue/photos/creatives/creatives-010.webp",
    "description": "Les Ondine sont composées d'une silhouette bleue à pois blancs, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bleuet",
    "name": "Bleuet",
    "category": "creatives",
    "tag": "Créatives",
    "price": 13,
    "image": "./assets/catalogue/photos/creatives/creatives-011.webp",
    "description": "Les Bleuet sont composées de deux feuilles bleues nervurées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "onatha",
    "name": "Onatha",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 15,
    "image": "./assets/catalogue/photos/faconnees/faconnees-001.webp",
    "description": "Les Onatha sont composées de médaillons roses avec une fleur claire en relief, montées sur une attache en acier inoxydable."
  },
  {
    "id": "nacre",
    "name": "Nacre",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 17,
    "image": "./assets/catalogue/photos/faconnees/faconnees-002.webp",
    "description": "Les Nacre sont composées d'une petite fleur blanche et d'un éventail doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "miel",
    "name": "Miel",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-003.webp",
    "description": "Les Miel sont composées de gouttes blanches décorées de feuilles jaunes, montées sur une attache en acier inoxydable."
  },
  {
    "id": "terracotta",
    "name": "Terracotta",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 13,
    "image": "./assets/catalogue/photos/faconnees/faconnees-004.webp",
    "description": "Les Terracotta sont composées de ronds rose terre cuite avec un motif de feuille, montées sur une attache en acier inoxydable."
  },
  {
    "id": "porcelaine",
    "name": "Porcelaine",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 14,
    "image": "./assets/catalogue/photos/faconnees/faconnees-005.webp",
    "description": "Les Porcelaine sont composées de pastilles bleues au motif blanc, montées sur une attache en acier inoxydable."
  },
  {
    "id": "argile",
    "name": "Argile",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 17,
    "image": "./assets/catalogue/photos/faconnees/faconnees-006.webp",
    "description": "Les Argile sont composées de ronds saumon avec une empreinte de feuille, montées sur une attache en acier inoxydable."
  },
  {
    "id": "celeste",
    "name": "Celeste",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 18,
    "image": "./assets/catalogue/photos/faconnees/faconnees-007.webp",
    "description": "Les Celeste sont composées de anneaux bleus à des feuilles dorées pendantes."
  },
  {
    "id": "corail",
    "name": "Corail",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-008.webp",
    "description": "Les Corail sont composées de mélange des ronds corail et de apprêts dorés anciens, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mini-rose",
    "name": "Mini Rose",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue/photos/faconnees/faconnees-009.webp",
    "description": "Les Mini Rose sont composées de petites gouttes roses avec un motif végétal, montées sur une attache en acier inoxydable."
  },
  {
    "id": "luna",
    "name": "Luna",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-010.webp",
    "description": "Les Luna sont composées de croissants rose saumon et de feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mieline",
    "name": "Mieline",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 17,
    "image": "./assets/catalogue/photos/faconnees/faconnees-011.webp",
    "description": "Les Mieline sont composées de gouttes blanches avec une feuille jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "amande",
    "name": "Amande",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 17,
    "image": "./assets/catalogue/photos/faconnees/faconnees-012.webp",
    "description": "Les Amande sont composées de petits ronds rosés avec des feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "azulejo",
    "name": "Azulejo",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 15,
    "image": "./assets/catalogue/photos/faconnees/faconnees-013.webp",
    "description": "Les Azulejo sont composées de pastilles bleues à motif blanc, montées sur une attache en acier inoxydable."
  },
  {
    "id": "ivoire",
    "name": "Ivoire",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-014.webp",
    "description": "Les Ivoire sont composées de croissants blancs décorés de doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "roseau",
    "name": "Roseau",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-015.webp",
    "description": "Les Roseau sont composées de formes roses nervurées et de feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquillage",
    "name": "Coquillage",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-016.webp",
    "description": "Les Coquillage sont composées de croissants blancs avec des détails dorés, montées sur une attache en acier inoxydable."
  },
  {
    "id": "lagune",
    "name": "Lagune",
    "category": "creatives",
    "tag": "Créatives",
    "price": 14,
    "image": "./assets/catalogue/photos/faconnees/faconnees-017.webp",
    "description": "Les Lagune sont composées de formes turquoise avec des motifs dorés, montées sur une attache en acier inoxydable."
  },
  {
    "id": "selene",
    "name": "Sélène",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-018.webp",
    "description": "Les Sélène sont composées de croissants ivoire à des apprêts dorés anciens, montées sur une attache en acier inoxydable."
  },
  {
    "id": "cobalt",
    "name": "Cobalt",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 17,
    "image": "./assets/catalogue/photos/faconnees/faconnees-019.webp",
    "description": "Les Cobalt sont composées de lunes bleues et de petites feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "dune",
    "name": "Dune",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-020.webp",
    "description": "Les Dune sont composées de croissants blancs ornés de branches dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "flamme",
    "name": "Flamme",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-021.webp",
    "description": "Les Flamme sont composées de formes terracotta ondulées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "roselia",
    "name": "Rosélia",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 18,
    "image": "./assets/catalogue/photos/faconnees/faconnees-022.webp",
    "description": "Les rosélia sont composées de pastilles roses et de longues branches bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "gaia",
    "name": "Gaïa",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-023.webp",
    "description": "Les Gaïa sont composées de mélange des ronds corail et de apprêts dorés anciens, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rosalie",
    "name": "Rosalie",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue/photos/faconnees/faconnees-024.webp",
    "description": "Les Rosalie sont composées de médaillons roses avec une fleur claire en relief, montées sur une attache en acier inoxydable."
  },
  {
    "id": "cristal",
    "name": "Cristal",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 14,
    "image": "./assets/catalogue/photos/faconnees/faconnees-025.webp",
    "description": "Les Cristal sont composées de pastilles transparentes avec une petite fleur rose, montées sur une attache en acier inoxydable."
  },
  {
    "id": "grenadine",
    "name": "Grenadine",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 16,
    "image": "./assets/catalogue/photos/faconnees/faconnees-026.webp",
    "description": "Les Grenadine sont composées de médaillons rouges avec une fleur claire, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rosee",
    "name": "Rosée",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue/photos/faconnees/faconnees-029.webp",
    "description": "Les Rosée sont composées de pastilles transparentes avec une petite fleur rose, montées sur une attache en acier inoxydable."
  },
  {
    "id": "camelia",
    "name": "Camélia",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-001.webp",
    "description": "Les Camélia sont composées de deux fleurs blanches sur un feuillage rouge, montées sur une attache en acier inoxydable."
  },
  {
    "id": "marguerite",
    "name": "Marguerite",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-002.webp",
    "description": "Les Marguerite sont composées de deux fleurs blanches à coeur jaune par boucle, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquelicot",
    "name": "Coquelicot",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-003.webp",
    "description": "Les Coquelicot sont composées de grandes fleurs rose foncé aux bords froissés, montées sur une attache en acier inoxydable."
  },
  {
    "id": "daisy",
    "name": "Daisy",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-004.webp",
    "description": "Les Daisy sont composées de petites marguerites blanches à coeur jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "orchidee",
    "name": "Orchidée",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-005.webp",
    "description": "Les Orchidée sont composées de grandes fleurs fuchsia suspendues, montées sur une attache en acier inoxydable."
  },
  {
    "id": "moka",
    "name": "Moka",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-006.webp",
    "description": "Les Moka sont composées de petites fleurs blanches à coeur brun, montées sur une attache en acier inoxydable."
  },
  {
    "id": "soleil",
    "name": "Soleil",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue/photos/florales/florales-007.webp",
    "description": "Les Soleil sont composées de marguerites blanches et de feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "margot",
    "name": "Margot",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-008.webp",
    "description": "Les Margot sont composées de grandes marguerites blanches à coeur jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mimosa",
    "name": "Mimosa",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-009.webp",
    "description": "Les Mimosa sont composées de deux marguerites blanches au coeur jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "blanchette",
    "name": "Blanchette",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-010.webp",
    "description": "Les Blanchette sont composées de marguerites blanches à coeur brun, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bouton-d-or",
    "name": "Bouton d'or",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-011.webp",
    "description": "Les Bouton d'or sont composées de deux petites marguerites blanches à coeur jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "couronne",
    "name": "Couronne",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-012.webp",
    "description": "Les Couronne sont composées de plusieurs marguerites blanches en cascade, montées sur une attache en acier inoxydable."
  },
  {
    "id": "tournesol",
    "name": "Tournesol",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-013.webp",
    "description": "Les Tournesol sont composées de deux fleurs jaunes au coeur clair, montées sur une attache en acier inoxydable."
  },
  {
    "id": "feuillage",
    "name": "Feuillage",
    "category": "florales",
    "tag": "Florales",
    "price": 17,
    "image": "./assets/catalogue/photos/florales/florales-014.webp",
    "description": "Les Feuillage sont composées d'une fleur blanche, de perles dorées et de deux feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bouquet-daisy",
    "name": "Bouquet Daisy",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-015.webp",
    "description": "Les Bouquet Daisy sont composées d'une cascade de petites marguerites blanches, montées sur une attache en acier inoxydable."
  },
  {
    "id": "eclat-floral",
    "name": "Éclat Floral",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-016.webp",
    "description": "Les Éclat Floral sont composées de deux fleurs rouges au coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "prunelle",
    "name": "Prunelle",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-017.webp",
    "description": "Les Prunelle sont composées de fleurs violettes en forme de cloche, montées sur une attache en acier inoxydable."
  },
  {
    "id": "daisy-feuillage",
    "name": "Daisy Feuillage",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue/photos/florales/florales-018.webp",
    "description": "Les Daisy Feuillage sont composées de marguerites blanches et de feuilles dorées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "daisy-2",
    "name": "Daisy",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-019.webp",
    "description": "Les Daisy sont composées de deux roses rouges suspendues à des crochets dorés."
  },
  {
    "id": "citron",
    "name": "Citron",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-020.webp",
    "description": "Les Citron sont composées de petites fleurs jaunes au coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "perle-fleur",
    "name": "Perle Fleur",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-021.webp",
    "description": "Les Perle Fleur sont composées de fleurs nacrées avec un coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "viola",
    "name": "Viola",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-022.webp",
    "description": "Les Viola sont composées de fleurs violettes avec un coeur perlé, montées sur une attache en acier inoxydable."
  },
  {
    "id": "glycine",
    "name": "Glycine",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-023.webp",
    "description": "Les Glycine sont composées de grandes fleurs violettes superposées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "pensee",
    "name": "Pensée",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-024.webp",
    "description": "Les Pensée sont composées de fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "lierre",
    "name": "Lierre",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-025.webp",
    "description": "Les Lierre sont composées de fleurs vertes et rouges très texturées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bleuet-2",
    "name": "Bleuet",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-026.webp",
    "description": "Les Bleuet sont composées de fleurs bleues à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "iris",
    "name": "Iris",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-027.webp",
    "description": "Les Iris sont composées de fleurs violettes de deux tailles, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rose-bonbon",
    "name": "Rose Bonbon",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-028.webp",
    "description": "Les Rose Bonbon sont composées de deux fleurs roses à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mauve",
    "name": "Mauve",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-029.webp",
    "description": "Les Mauve sont composées de deux fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "perle-de-lune",
    "name": "Perle de Lune",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue/photos/florales/florales-030.webp",
    "description": "Les Perle de Lune sont composées de fleurs nacrées avec un coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "violette-2",
    "name": "Violette",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-031.webp",
    "description": "Les Violette sont composées de grandes fleurs violettes texturées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquelicot-rouge",
    "name": "Coquelicot Rouge",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-032.webp",
    "description": "Les Coquelicot Rouge sont composées de fleurs rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "grappe-mauve",
    "name": "Grappe Mauve",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-033.webp",
    "description": "Les Grappe Mauve sont composées de petites fleurs violettes avec un coeur perlé, montées sur une attache en acier inoxydable."
  },
  {
    "id": "vanille",
    "name": "Vanille",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-034.webp",
    "description": "Les Vanille sont composées de deux fleurs blanches à centre jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "jardin-vert",
    "name": "Jardin Vert",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-035.webp",
    "description": "Les Jardin Vert sont composées de fleurs vertes et rouges très texturées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bleu-jardin",
    "name": "Bleu Jardin",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-036.webp",
    "description": "Les Bleu Jardin sont composées de fleurs bleues à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rose-tendre",
    "name": "Rose Tendre",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-037.webp",
    "description": "Les Rose Tendre sont composées de deux fleurs roses à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "frangipanier",
    "name": "Frangipanier",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-038.webp",
    "description": "Les Frangipanier sont composées de deux fleurs blanches et jaunes, montées sur une attache en acier inoxydable."
  },
  {
    "id": "pensee-violette",
    "name": "Pensée Violette",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-039.webp",
    "description": "Les Pensée Violette sont composées de fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rouge-coeur",
    "name": "Rouge Coeur",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-040.webp",
    "description": "Les Rouge Coeur sont composées de fleurs rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "orangeade",
    "name": "Orangeade",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-041.webp",
    "description": "Les Orangeade sont composées de deux fleurs orange à coeur clair, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mauve-doree",
    "name": "Mauve Dorée",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-042.webp",
    "description": "Les Mauve Dorée sont composées de fleurs violettes posées sur un support blanc, montées sur une attache en acier inoxydable."
  },
  {
    "id": "nuit-bleue",
    "name": "Nuit Bleue",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-043.webp",
    "description": "Les Nuit Bleue sont composées de petites fleurs bleues à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "perline",
    "name": "Perline",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-044.webp",
    "description": "Les Perline sont composées de deux petites fleurs blanches à coeur brun, montées sur une attache en acier inoxydable."
  },
  {
    "id": "fleur-rouge",
    "name": "Fleur Rouge",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-045.webp",
    "description": "Les Fleur Rouge sont composées de petites fleurs rouges et roses, montées sur une attache en acier inoxydable."
  },
  {
    "id": "miel-fleuri",
    "name": "Miel Fleuri",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-046.webp",
    "description": "Les Miel Fleuri sont composées de deux fleurs jaunes au coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquille",
    "name": "Coquille",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-047.webp",
    "description": "Les Coquille sont composées de fleurs crème aux bords souples, montées sur une attache en acier inoxydable."
  },
  {
    "id": "violet-clair",
    "name": "Violet Clair",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-048.webp",
    "description": "Les Violet Clair sont composées de fleurs violettes avec un coeur vert et doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bouton-violet",
    "name": "Bouton Violet",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-049.webp",
    "description": "Les Bouton Violet sont composées de deux fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "fleur-vanille",
    "name": "Fleur Vanille",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-050.webp",
    "description": "Les Fleur Vanille sont composées de deux fleurs blanches et jaunes, montées sur une attache en acier inoxydable."
  },
  {
    "id": "pensee-boheme",
    "name": "Pensée Bohème",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-051.webp",
    "description": "Les Pensée Bohème sont composées de grandes fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "frangipane",
    "name": "Frangipane",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-052.webp",
    "description": "Les Frangipane sont composées de deux fleurs blanches à centre jaune, montées sur une attache en acier inoxydable."
  },
  {
    "id": "jardin-rouge",
    "name": "Jardin Rouge",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-053.webp",
    "description": "Les Jardin Rouge sont composées de fleurs vertes et rouges texturées, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rouge-intense",
    "name": "Rouge Intense",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-054.webp",
    "description": "Les Rouge Intense sont composées de coquelicots rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "givre",
    "name": "Givre",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-055.webp",
    "description": "Les Givre sont composées de fleurs grises au coeur clair, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mauve-double",
    "name": "Mauve Double",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-056.webp",
    "description": "Les Mauve Double sont composées de deux fleurs violettes par boucle, montées sur une attache en acier inoxydable."
  },
  {
    "id": "petite-pensee",
    "name": "Petite Pensée",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-057.webp",
    "description": "Les Petite Pensée sont composées de deux petites fleurs violettes, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bleu-double",
    "name": "Bleu Double",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-058.webp",
    "description": "Les Bleu Double sont composées de fleurs bleues en deux niveaux, montées sur une attache en acier inoxydable."
  },
  {
    "id": "rose-poudre",
    "name": "Rose Poudré",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-059.webp",
    "description": "Les Rose Poudré sont composées de deux fleurs roses à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "mini-violette",
    "name": "Mini Violette",
    "category": "florales",
    "tag": "Florales",
    "price": 11,
    "image": "./assets/catalogue/photos/florales/florales-060.webp",
    "description": "Les Mini Violette sont composées de petites fleurs violettes sur support blanc, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bouquet-mauve",
    "name": "Bouquet Mauve",
    "category": "florales",
    "tag": "Florales",
    "price": 13,
    "image": "./assets/catalogue/photos/florales/florales-061.webp",
    "description": "Les Bouquet Mauve sont composées de petites fleurs violettes en grappe, montées sur une attache en acier inoxydable."
  },
  {
    "id": "violette-ronde",
    "name": "Violette Ronde",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-062.webp",
    "description": "Les Violette Ronde sont composées de grandes fleurs violettes, montées sur une attache en acier inoxydable."
  },
  {
    "id": "soleil-orange",
    "name": "Soleil Orange",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-063.webp",
    "description": "Les Soleil Orange sont composées de fleurs orange et jaunes en ligne verticale, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquelicot-duo",
    "name": "Coquelicot Duo",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-064.webp",
    "description": "Les Coquelicot Duo sont composées de coquelicots rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "azur-fleuri",
    "name": "Azur Fleuri",
    "category": "florales",
    "tag": "Florales",
    "price": 14,
    "image": "./assets/catalogue/photos/florales/florales-065.webp",
    "description": "Les Azur Fleuri sont composées de deux fleurs bleues au coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "perle-blanche",
    "name": "Perle Blanche",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-066.webp",
    "description": "Les Perle Blanche sont composées de fleurs nacrées avec des coeurs dorés, montées sur une attache en acier inoxydable."
  },
  {
    "id": "pensee-royale",
    "name": "Pensée Royale",
    "category": "florales",
    "tag": "Florales",
    "price": 15,
    "image": "./assets/catalogue/photos/florales/florales-067.webp",
    "description": "Les Pensée Royale sont composées de fleurs violettes à coeur doré, montées sur une attache en acier inoxydable."
  },
  {
    "id": "coquelicot-chic",
    "name": "Coquelicot Chic",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue/photos/florales/florales-068.webp",
    "description": "Les Coquelicot Chic sont composées de fleurs rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "bouquet-rouge",
    "name": "Bouquet Rouge",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue/photos/florales/florales-069.webp",
    "description": "Les Bouquet Rouge sont composées de plusieurs coquelicots rouges à coeur noir, montées sur une attache en acier inoxydable."
  },
  {
    "id": "solea",
    "name": "Solea",
    "category": "perles",
    "tag": "Perles",
    "price": 16,
    "image": "./assets/catalogue/photos/perles/perles-001.webp",
    "description": "Les Solea sont composées de gouttes jaunes avec des apprêts bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "turquoise",
    "name": "Turquoise",
    "category": "perles",
    "tag": "Perles",
    "price": 17,
    "image": "./assets/catalogue/photos/perles/perles-002.webp",
    "description": "Les Turquoise sont composées de perles turquoise et de éventails bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "ambra",
    "name": "Ambra",
    "category": "perles",
    "tag": "Perles",
    "price": 19,
    "image": "./assets/catalogue/photos/perles/perles-003.webp",
    "description": "Les Ambra sont composées de petites fleurs orange et de feuilles bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "cyane",
    "name": "Cyane",
    "category": "perles",
    "tag": "Perles",
    "price": 18,
    "image": "./assets/catalogue/photos/perles/perles-004.webp",
    "description": "Les Cyane sont composées de perles turquoise à des feuilles bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "marina",
    "name": "Marina",
    "category": "perles",
    "tag": "Perles",
    "price": 17,
    "image": "./assets/catalogue/photos/perles/perles-005.webp",
    "description": "Les Marina sont composées de perles turquoise et de franges en éventail, montées sur une attache en acier inoxydable."
  },
  {
    "id": "nocturne",
    "name": "Nocturne",
    "category": "perles",
    "tag": "Perles",
    "price": 17,
    "image": "./assets/catalogue/photos/perles/perles-006.webp",
    "description": "Les Nocturne sont composées de perles noires et de éventails noirs, montées sur une attache en acier inoxydable."
  },
  {
    "id": "talis",
    "name": "Talis",
    "category": "perles",
    "tag": "Perles",
    "price": 17,
    "image": "./assets/catalogue/photos/perles/perles-007.webp",
    "description": "Les Talis sont composées de perles pêche, une petite fleur orange et de feuilles bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "eventia",
    "name": "Eventia",
    "category": "perles",
    "tag": "Perles",
    "price": 19,
    "image": "./assets/catalogue/photos/perles/perles-008.webp",
    "description": "Les Eventia sont composées de perles bleu roi et de grands éventails bronze, montées sur une attache en acier inoxydable."
  },
  {
    "id": "auguste",
    "name": "Auguste",
    "category": "perles",
    "tag": "Perles",
    "price": 17,
    "image": "./assets/catalogue/photos/perles/perles-009.webp",
    "description": "Les Auguste sont composées de petites perles rouges et de breloques bronze, montées sur une attache en acier inoxydable."
  }
];

const cart = new Map();
const productGrid = document.querySelector("[data-products]");
const cartPanel = document.querySelector("[data-cart-panel]");
const overlay = document.querySelector("[data-overlay]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const form = document.querySelector("[data-checkout-form]");
const formNote = document.querySelector("[data-form-note]");

function euro(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderProducts(filter = "all") {
  const visibleProducts =
    filter === "all" ? products : products.filter((product) => product.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-content">
            <div class="product-meta">
              <span class="product-tag">${product.tag}</span>
              <span class="price">${euro(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="button primary" type="button" data-add="${product.id}">
              Ajouter au panier
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function updateCart() {
  const rows = [...cart.values()];
  const totalQuantity = rows.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = rows.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = euro(totalPrice);

  if (!rows.length) {
    cartItems.innerHTML = '<p class="empty-cart">Ton panier est vide pour le moment.</p>';
    return;
  }

  cartItems.innerHTML = rows
    .map(
      (item) => `
        <div class="cart-row">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <p>${item.name}</p>
            <small>${euro(item.price)} l'unite</small>
          </div>
          <div class="qty-controls" aria-label="Quantite pour ${item.name}">
            <button type="button" data-decrease="${item.id}" aria-label="Retirer une unite">-</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-increase="${item.id}" aria-label="Ajouter une unite">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const existing = cart.get(id);

  cart.set(id, {
    ...product,
    quantity: existing ? existing.quantity + 1 : 1
  });

  updateCart();
  openCart();
}

function changeQuantity(id, direction) {
  const item = cart.get(id);
  if (!item) return;

  const quantity = item.quantity + direction;
  if (quantity <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, { ...item, quantity });
  }

  updateCart();
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const filterButton = event.target.closest("[data-filter]");
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");

  if (addButton) addToCart(addButton.dataset.add);

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button === filterButton);
    });
    renderProducts(filterButton.dataset.filter);
  }

  if (increaseButton) changeQuantity(increaseButton.dataset.increase, 1);
  if (decreaseButton) changeQuantity(decreaseButton.dataset.decrease, -1);

  if (event.target.closest(".cart-toggle")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target === overlay) closeCart();
  if (event.target.closest("[data-close-cart-link]")) closeCart();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const totalQuantity = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  formNote.textContent = totalQuantity
    ? "Demande preparee. Le paiement reste volontairement simule pour cette version."
    : "Ajoute au moins une piece au panier avant de finaliser la demande.";
});

renderProducts();
updateCart();
