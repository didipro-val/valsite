const products = [
  {
    "id": "alba",
    "name": "Alba",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-002.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-002.webp?v=5"
    ],
    "description": "Les Alba sont composées de formes turquoise arrondies et d'un motif ondulé, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Alba pour réveiller une tenue sobre, avec un détail lumineux qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère et feuilles d'or",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille : 4 cm",
      "Alba est une pièce artisanale unique, faite main avec soin"
    ],
    "sourceRow": 2,
    "stock": 1
  },
  {
    "id": "violetta",
    "name": "Violetta",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-003.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-003.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-051.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-055.webp?v=5"
    ],
    "description": "Les violletta sont composées d'une pétale violette nervuré avec des éclats dorés, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme des Violettes apporte une touche colorée pleine de caractère, aussi agréable avec une tenue décontrectée qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère feille d'or",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 3 cm",
      "Les Violetta sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 3,
    "stock": 1
  },
  {
    "id": "azura",
    "name": "Azura",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-004.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-004.webp?v=5"
    ],
    "description": "Les Azura sont composées de roses bleues texturées avec une finition dorée, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leurs roses en relief, les Azura apportent une note tendre et romantique sans trop charger le visage.",
    "characteristics": [
      "Pâte polymère feuille d'or",
      "Apprêts dorés en acier inoxydable",
      "Confortables pour la journée.Taille: 2,5 cm",
      "Chaque bijou est réalisé à la main, ce qui rend les Azura uniques"
    ],
    "sourceRow": 4,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "naya",
    "name": "Naya",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-005.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-005.webp?v=5"
    ],
    "description": "Les Naya sont composées de roses turquoise superposées, montées sur des apprêts dorés en acier inoxydable.\n\nLes Naya sont parfaites pour adoucir une tenue simple, tout en gardant un rendu féminin.",
    "characteristics": [
      "Pâte polymère et feuille d'or",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien.Taille: 3,5 cm",
      "Faites à la main, les Naya gardent le charme d'une création unique"
    ],
    "sourceRow": 5,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "prune",
    "name": "Prune",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-006.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-006.webp?v=5"
    ],
    "description": "Les Prune sont composées de fleurs violettes mouchetées d'or, montées sur des apprêts dorés en acier inoxydable.\n\nLes Prune donnent tout de suite une touche colorée pleine de caractère et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte polymère et feuille d'or",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille:3,5 cm",
      "Prune est une création faite main, unique par ses détails"
    ],
    "sourceRow": 6,
    "stock": 1
  },
  {
    "id": "daisy",
    "name": "Daisy",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-007.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-007.webp?v=5"
    ],
    "description": "Les Daisy sont composées de deux roses rouges suspendues à des crochets dorés.\n\nOn choisit les Daisy pour attirer le regard avec élégance, avec un détail affirmé qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts gouttes dorés en acier inoxydable",
      "Pensées pour rester élégantes et légères",
      "Taille:3,5 cm de longueur",
      "Les Daisy sont travaillées à la main pour un rendu unique"
    ],
    "sourceRow": 7,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "manta",
    "name": "Manta",
    "category": "creatives",
    "tag": "Créatives",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-008.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-008.webp?v=5"
    ],
    "description": "Les Manta sont composées d'une silhouette de raie bleue à pois blancs, montées sur des apprêts en acier inoxydable couleur argent. \n\nUn bijou comme les Manta apporte une note fraîche et colorée, aussi agréable avec un jean qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts argent en acier inoxydable (en doré à la demande)",
      "Faciles à mettre avec vos tenues préférées",
      "Taille:3,5 cm",
      "Chaque paire de Manta est confectionnée à la main et possède son caractère unique"
    ],
    "sourceRow": 8,
    "stock": 1
  },
  {
    "id": "liliane",
    "name": "Liliane",
    "category": "creatives",
    "tag": "Créatives",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-009.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-009.webp?v=5"
    ],
    "description": "Les Liliane sont composées de petites fleurs mauves en format discret, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leur ton violet parme, les Liliane apportent une touche colorée tout en étant discretes et pleine de caractère sans trop charger votre tenue ou visage.\nConfortables pour la journée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier ( en couleurs argent à la demande)Un format facile à porter",
      "Taille: 1,50 cm",
      "Liliane est un bijou fait main, pensé comme une pièce unique"
    ],
    "sourceRow": 9,
    "stock": 1
  },
  {
    "id": "plume",
    "name": "Plume",
    "category": "creatives",
    "tag": "Créatives",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-010.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-010.webp?v=5"
    ],
    "description": "Les Plume sont composées de deux plumes bleues agrémenté de feuille dorées, montées sur des apprêts dorés en acier inoxydable.\n\nLes boucles d'oreille Plume donnent tout de suite un mouvement léger et naturel et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte polymère feuille d'or",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter.Taille: 3,5 cm",
      "Chaque modèle Plume est fait à la main, avec une finition toujours unique"
    ],
    "sourceRow": 10,
    "stock": 1
  },
  {
    "id": "rosalie",
    "name": "Rosalie",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-017.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-017.webp?v=5"
    ],
    "description": "Les Rosalie sont composées de médaillons couleur teracotta ornée d'une fleur dorée en relief, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Rosalie pour adoucir une tenue simple, avec un détail discret qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères.Taille: 2,5 cm",
      "Créées à la main, les Rosalie restent uniques et ne ressemblent à aucune autre paire"
    ],
    "sourceRow": 11,
    "stock": 1
  },
  {
    "id": "palma",
    "name": "Palma",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-012.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-012.webp?v=5"
    ],
    "description": "Les Palma sont composées d'un petit médaillon orné d'une disctrete petite fleur or et d'un éventail doré, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme Palma apporte une touche élégante et lumineuse, avec une tenue simple ou plus habillée.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 4 cm",
      "Palma est une paire unique, façonnée à la main avec attention"
    ],
    "sourceRow": 12,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "pivoine",
    "name": "Pivoine",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-013.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-013.webp?v=5"
    ],
    "description": "Les Pivoine sont composées de medaillons bleues clair au motif bleus cintillants, montées sur des apprêts dorés en acier inoxydable.\n\nLes Pivoine donnent tout de suite une note fraîche et colorée et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille : 2,5 cm",
      "Chaque paire de Pivoine est faite à la main et reste unique"
    ],
    "sourceRow": 13,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "terracotta",
    "name": "Terracotta",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-014.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-014.webp?v=5"
    ],
    "description": "Les Terracotta sont composées de medailloncouleur terre cuite avec une empreinte de feuille rouge dorée , montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Terracotta pour embellir joliment une tenue, avec un détail végétal qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille : 3,5 cm",
      "Réalisées à la main, les terracotta ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 14,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "celeste",
    "name": "Celeste",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-015.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-015.webp?v=5"
    ],
    "description": "Les Celeste sont composées de lunes bleus ornées de feuilles dorées pendantes. Montées sur des clous dorés en acier inoxydable.\n\nUn bijou comme les Celeste apporte un mouvement naturel et lumineux, aussi agréable avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 4,5 cm",
      "Celeste est une pièce artisanale unique, faite main avec soin"
    ],
    "sourceRow": 15,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "gaia",
    "name": "Gaia",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-016.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-016.webp?v=5"
    ],
    "description": "Les Gaia sont composées d'un médaillon rond couleur terracotta ornés d'un apprêts dorés style anciens, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leurs détails travaillés, les Gaia apportent une touche soignée sans trop charger votre tenue ou visage.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Confortables et légeres pour la journée",
      "Taille : 5 cm",
      "Les Gaia sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 16,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "rose",
    "name": "Rose",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-011.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-011.webp?v=5"
    ],
    "description": "Les Rose sont composées de petites gouttes de couleur roses pastel avec le motif d'une feuille de rose, montées sur des apprêts dorés en acier inoxydable.\n\nLes Rose sont parfaites pour adoucir une tenue simple, tout en gardant un rendu chic et élégant.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille : 3 cm",
      "Chaque bijou est réalisé à la main, ce qui rend les Rose uniques"
    ],
    "sourceRow": 17,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "luna",
    "name": "Luna",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-018.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-018.webp?v=5"
    ],
    "description": "Les Luna sont composées d'une lune rose lumineuse ornées de feuilles dorées, montées sur des apprêts dorés en acier inoxydable.\n\nLes Luna donnent tout de suite une note tendre et romantique et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille : 4 cm",
      "Faites à la main, les Luna gardent le charme d'une création unique"
    ],
    "sourceRow": 18,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "miel",
    "name": "Miel",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-019.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-019.webp?v=5"
    ],
    "description": "Les Miel sont composées de gouttes blanches decorées d'une feuille dorées, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Miel pour sublimer joliment une tenue, avec son détail doré doux et naturel comme sortie d'un pot de miel. Elles se feront remarquer juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille : 3,5 cm",
      "Miel est une création faite main, unique par ses détails"
    ],
    "sourceRow": 19,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "clea",
    "name": "Cléa",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-020.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-020.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-041.webp?v=5"
    ],
    "description": "Les Cléa sont composées de petits médaillons couleur teracotta ornée de feuilles dorées, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Cléa apporte un mouvement naturel et lumineux, aussi agréable avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 4,5 cm",
      "Les Cléa sont travaillées à la main pour un rendu unique"
    ],
    "sourceRow": 20,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "azule",
    "name": "Azule",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-021.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-021.webp?v=5"
    ],
    "description": "Les Azule sont composées de médaillons bleues à motif bleus cintillants, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leurs deux nuances de bleues, les Azule apportent une note fraîche et colorée sans trop charger votre tenue.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Confortables pour toutes occasions",
      "Taille : 4,5 cm",
      "Chaque paire d'Azule est confectionnée à la main et possède son caractère unique"
    ],
    "sourceRow": 21,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "avia",
    "name": "Avia",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-022.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-022.webp?v=5"
    ],
    "description": "Les Avia sont composées d'une forme géometrique discrète d'un rose pale nervurées d'un motif discret couleur rouge cintillant ,ornées d'une feuille dorées, montées sur des apprêts dorés en acier inoxydable.\n\nLes Avia donnent tout de suite une note tendre et romantique et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille : 4,5 cm",
      "Les Avia sont une création artisanale, unique et faite à la main"
    ],
    "sourceRow": 22,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "soleia",
    "name": "Soleia",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-023.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-023.webp?v=5"
    ],
    "description": "Boucle Soleia\n\nLes Soleia sont composées de lunes blanches avec un discret détail végétal dorés, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Soleia pour donner du caractère à votre tenue, avec un détail simple et chic à la fois, qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légèreset éléguantes",
      "Taille : 3 cm",
      "Chaque modèle Soleia est faite à la main, avec une finition toujours unique"
    ],
    "sourceRow": 23,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "lagune",
    "name": "Lagune",
    "category": "creatives",
    "tag": "Créatives",
    "price": 13,
    "image": "./assets/catalogue-saugardevalerie/photos/row-024.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-024.webp?v=5"
    ],
    "description": "Les Lagune sont composées de deux formes géométrique turquoise agrément de dorés, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Lagune apporte une note fraîche et colorée, aussi agréable avec une tenues simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 4,5 cm",
      "Créées à la main, les Lagune ne ressemblent à aucune autre paire"
    ],
    "sourceRow": 24,
    "stock": 1
  },
  {
    "id": "selene",
    "name": "Sélène",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-025.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-025.webp?v=5"
    ],
    "description": "Les Sélène sont composées d'une lune couleur ivoire agrémentée d'un décor doré, ornés d' apprêts dorés style anciens, montées sur des apprêts en acier inoxydable.\n\nAvec leurs reflets doux, les Sélène apportent une touche élégante et lumineuse sans trop charger votre tenue.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Confortables pour toutes occasions",
      "Taille : 4 cm",
      "Sélène est une paire unique, façonnée à la main avec attention"
    ],
    "sourceRow": 25,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "oria",
    "name": "Oria",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-026.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-026.webp?v=5"
    ],
    "description": "Les Oria sont composées de lunes bleues et de petites feuilles dorées, montées sur des apprêts dorés en acier inoxydable.\n\nLes Oria sont parfaites pour embellir votre tenue, tout en gardant un rendu chisc élégant.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille : 4 cm",
      "Les Oria portent la touche du fait main et d'une pièce unique"
    ],
    "sourceRow": 26,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "dune",
    "name": "Dune",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-027.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-027.webp?v=5"
    ],
    "description": "Les Dune sont composées de deux lunes blanches ornés de petites branches dorées, montées sur des apprêts dorés en acier inoxydable.\n\nLes Dune donnent tout de suite un mouvement naturel et lumineux et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Un style facile à porter",
      "Taille : 3 cm",
      "Dune est une création unique, façonnée à la main"
    ],
    "sourceRow": 27,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "flamme",
    "name": "Flamme",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-028.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-028.webp?v=5"
    ],
    "description": "Les Flamme sont composées de formes terracotta ondulées, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Flamme pour donner du caractère au look, avec un détail graphique qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille : 2,5 cm",
      "Chaque paire de Flamme est faite à la main et reste unique"
    ],
    "sourceRow": 28,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "roselia",
    "name": "Rosélia",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-029.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-029.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-029-2.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-050.webp?v=5"
    ],
    "description": "Les rosélia sont composées de petits médaillons roses pale décoré de fin feuillage légèrement cintillant agrémentée de branches bronze style ancien, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les rosélia apporte une note tendre et romantique, aussi agréable avec une de tout les jours qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêt dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille : 5 cm",
      "Réalisées à la main, les rosélia ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 29,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "onatha",
    "name": "Onatha",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-030.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-030.webp?v=5"
    ],
    "description": "Les Onatha sont composées de médaillonscouleur teracotta ornée d'une fleur dorée en relief, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Onatha pour adoucir une tenue simple, avec un détail discret qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte auto durcissante",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille: 2,5 cm",
      "Les Onatha sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 30,
    "stock": 1
  },
  {
    "id": "cristal",
    "name": "Cristal",
    "category": "faconnees",
    "tag": "Façonnées",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-031.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-031.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-031-2.webp?v=5"
    ],
    "description": "Les Cristal sont composées d'un médaillon en résine transparente une petite fleur rose emprisonée à l'interieur fait tout son charme, montées sur des apprêts dorés en acier inoxydable.\n\nLes Cristal donnent tout de suite une note tendre et romantique et finissent joliment une tenue tout en légèreté.",
    "characteristics": [
      "Résine époxy transparente",
      "Apprêts dorés en acier légere et agreéable à porteés",
      "Taille: 2,5 cm",
      "Cette paire de boucles d'oreilles est réalisée à la main, ce qui rend son effet cristal uniques"
    ],
    "sourceRow": 31,
    "stock": 1
  },
  {
    "id": "nea",
    "name": "Néa",
    "category": "florales",
    "tag": "Florales",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-032.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-032.webp?v=5"
    ],
    "description": "Les Néa sont composées de deux petites fleurs blanches à coeur jaune, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Néa pour illuminer son quotidien comme un air de primptemps, avec un détail joyeux qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêtsdorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille:3,5 cm",
      "Les Néa sont une création artisanale, unique et faite à la main"
    ],
    "sourceRow": 32,
    "stock": 1
  },
  {
    "id": "azalee",
    "name": "Azalée",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue-saugardevalerie/photos/row-033.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-033.webp?v=5"
    ],
    "description": "Les Azalée sont composées de pétales aux nuances de rose, faconnées et montées à la mains une à une ce qui leur donne cet effet naturel , montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Azalée apporte une présence chaleureuse, aussi agréableà porter avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille: 4,5 cm",
      "Azalée est une paire unique, façonnée à la main avec attention"
    ],
    "sourceRow": 33,
    "stock": 1
  },
  {
    "id": "azelie",
    "name": "Azélie",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue-saugardevalerie/photos/row-034.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-034.webp?v=5"
    ],
    "description": "Les Azélie sont composées de pétales roses fushia, faconnées et montées à la mains une à une ce qui leur donne cet effet naturel , montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Azélie apporte une présence chaleureuse, aussi agréableà porter avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien",
      "taille: 4 à 4,5 cm",
      "Azélie est une paire unique, façonnée à la main avec attention"
    ],
    "sourceRow": 34,
    "stock": 1
  },
  {
    "id": "moka",
    "name": "Moka",
    "category": "florales",
    "tag": "Florales",
    "price": 5,
    "image": "./assets/catalogue-saugardevalerie/photos/row-035.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-035.webp?v=5"
    ],
    "description": "Les Moka sont composées de petites fleurs blanches à coeur brun, montées sur des apprêts dorés en acier inoxydable.\n\nLes Moka donnent tout de suite une touche discrète, soignée et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille: 2 cm",
      "Les",
      "Moka est une paire unique faite à la main"
    ],
    "sourceRow": 35,
    "stock": 1
  },
  {
    "id": "selea",
    "name": "Séléa",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-036.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-036.webp?v=5"
    ],
    "description": "Les Séléa sont composées de marguerites blanches ornées de feuilles dorées, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Séléa pour illuminer une tenue, avec un détail joyeux qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille: longueur 4,5 cm",
      "Séléa est une création unique, façonnée à la main"
    ],
    "sourceRow": 36,
    "stock": 1
  },
  {
    "id": "margot",
    "name": "Margot",
    "category": "florales",
    "tag": "Florales",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-037.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-037.webp?v=5"
    ],
    "description": "Les Margot sont composées de grandes marguerites blanches à coeur jaune, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Margot apporte une fraîcheur printanière, par son coté originale elle seront unique à porter autant avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille:2,5 cm",
      "Chaque paire de Margot est faite à la main et reste unique"
    ],
    "sourceRow": 37,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "flora",
    "name": "Flora",
    "category": "florales",
    "tag": "Florales",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-038.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-038.webp?v=5"
    ],
    "description": "Les Flora sont composées de deux marguerites blanches au coeur jaune, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Flora apporte une fraîcheur printanière, par son coté originale elle seront unique à porter autant avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Confortables pour la journée",
      "taille: 2,5 cm",
      "Réalisées à la main, les Flora ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 38,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "petalia",
    "name": "Pétalia",
    "category": "florales",
    "tag": "Florales",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-039.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-039.webp?v=5"
    ],
    "description": "Les Pétalia sont composées de plusieurs marguerites blanches en cascade au coeur couleur moka, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Pétalia pour illuminer votre visage, avec un détail joyeux qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères.Taille: 5 cm de longueur",
      "Pétalia sont réalisées à la main, ce qui rend les uniques et originales"
    ],
    "sourceRow": 39,
    "stock": 1
  },
  {
    "id": "citronelle",
    "name": "Citronelle",
    "category": "florales",
    "tag": "Florales",
    "price": 5,
    "image": "./assets/catalogue-saugardevalerie/photos/row-040.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-040.webp?v=5"
    ],
    "description": "Les Citronelle sont de deux marguerites jaune au coeur clair, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Citronelle apporte une note solaire, discrèts aussi agréable avec une simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille: 2 cm",
      "Faites à la main, les Citronelle gardent le charme d'une création unique"
    ],
    "sourceRow": 40,
    "stock": 1
  },
  {
    "id": "clea-2",
    "name": "Cléa",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-041.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-020.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-041.webp?v=5"
    ],
    "description": "Les Cléa sont composées d'une petites fleur blanche, ornées de deux feuilles dorées, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leur details dorés, les Feuillages de Cléa apportent un mouvement naturel et lumineux sans trop charger votre tenue.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Confortables pour la journée",
      "Taille 4 cm de longueur",
      "Cléa est une création faite main, unique par ses détails"
    ],
    "sourceRow": 41,
    "stock": 1
  },
  {
    "id": "eclat-floral",
    "name": "Éclat Floral",
    "category": "florales",
    "tag": "Florales",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-042.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-042.webp?v=5"
    ],
    "description": "Les Éclat Floral sont composées de deux fleurs rouges au coeur doré, montées sur des apprêts dorés en acier inoxydable.\n\nLes Éclat Floral donnent tout de suite une présence chaleureuse et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "Taille: 2,5 cm",
      "Chaque paire d'Éclat Floral est confectionnée à la main et possède son caractère unique"
    ],
    "sourceRow": 42,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "prunelle",
    "name": "Prunelle",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-043.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-043.webp?v=5"
    ],
    "description": "Les Prunelle sont composées de pétales violettes façonées à la main, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Prunelle pour changer des bijoux trop classiques, avec un détail délicat qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille 4 cm de longueur",
      "Prunelle est un bijou fait main, pensé comme une pièce unique"
    ],
    "sourceRow": 43,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "nacria-deux-paires-disponibles",
    "name": "Nacria",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-044.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-044.webp?v=5"
    ],
    "description": "Les Nacria sont composées de pétales couleur nacré façonées à la main unes à unes ornées d'un pistile doré , montées sur des apprêts créolesdorées en acier inoxydable.\n\nLes Nacria donnent tout de suite une touche élégante et lumineuse et finissent joliment une tenue de soirée ou tout simple votre tenue du jour;",
    "characteristics": [
      "Pâte polymère effet nacré",
      "Apprêts dorés en acier inoxydable",
      "Un format léger facile à porter",
      "taille:2cm",
      "Nacria est une paire unique, façonnée à la main avec attention"
    ],
    "sourceRow": 44,
    "stock": 2
  },
  {
    "id": "viola-deux-paires-disponibles",
    "name": "Viola",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-045.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-045.webp?v=5"
    ],
    "description": "Les Viola sont composées de pétales violettes façonées à la main unes à une ornées d' un coeur perlé, montées sur des apprêts créoles en acier inoxydable couleur argent.\n\nOn choisit les Viola pour changer des bijoux trop classiques, avec un détail délicat qui change votre tenue en un clin d'oeil.",
    "characteristics": [
      "Pâte polymère et perle nacré fantaisie",
      "Apprêts créoles couleur argent en acier inoxydable",
      "Pensées pour rester légères",
      "taille: 2,5 cm",
      "Les Viola portent la touche du fait main avec passion et d'une pièce unique"
    ],
    "sourceRow": 45,
    "stock": 2
  },
  {
    "id": "grandes-mauvea",
    "name": "Grandes Mauvéa",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue-saugardevalerie/photos/row-046.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-046.webp?v=5"
    ],
    "description": "Les Grandes Mauvéa est une grandes fleurs mauve composées de pétales façonées à la main unes à , montées sur des apprêts en acier inoxydable. couleur argent ou dorés au choix.\n\nUn bijou comme les Grandes Mauvéa apporte une touche colorée pleine de caractère, avec un détail délicat qui change votre tenue en un clin d'oeil.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts créole en acier inoxydable couleur argent ou dorés au choix",
      "Faciles à mettre avec vos tenues préférées",
      "Taille:4 cm",
      "Grandes",
      "Mauvéa est une création unique, façonnée à la main avec passion"
    ],
    "sourceRow": 46,
    "choice": {
      "code": "C1",
      "options": [
        "Attache dorée",
        "Attache argentée"
      ]
    },
    "stock": 1
  },
  {
    "id": "liera",
    "name": "Liera",
    "category": "florales",
    "tag": "Florales",
    "price": 16,
    "image": "./assets/catalogue-saugardevalerie/photos/row-047.webp?v=6",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-047.webp?v=6"
    ],
    "description": "Les Liera sont composées de pétales façonées à la main unes à unes, marbrée de \"vert et de teracotta\" ce qui les rends uniques par leur couleur originale pénsées avec soins. montées sur des apprêts en acier inoxydable dorés.\n\nLes Liera sont parfaites pour attirer le regard avec élégance, tout en gardant un rendu affirmé sans trop charger votre visage.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts en acier inoxydable doré",
      "Légeres et agréables à porter au quotidien",
      "taille: 4 à 4,5 cm",
      "Réalisées à la main, les Liera ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 47,
    "choice": {
      "code": "C1",
      "options": [
        "Attache dorée",
        "Attache argentée"
      ]
    },
    "stock": 1
  },
  {
    "id": "azurine-deux-paires-disponibles",
    "name": "Azurine",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-048.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-048.webp?v=5"
    ],
    "description": "Les Azurine sont composées de pétales couleur bleus azur façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts dorés en acier inoxydable.\n\nLes Azurine donnent tout de suite une note fraîche et colorée avec un détail délicat qui change votre tenue en un clin d'oeil.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter",
      "taille: 2,5 à 3 cm",
      "Azurine est une pièce artisanale unique, faite main avec soin"
    ],
    "sourceRow": 48,
    "stock": 2
  },
  {
    "id": "mauvea-deux-paires-disponibles",
    "name": "Mauvéa",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-049.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-049.webp?v=5"
    ],
    "description": "Les Mauvéa sont composées de pétales couleur mauves façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Mauvéa pour changer des bijoux trop classiques, avec un détail délicat qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille: 3 à 4 cm",
      "Les Mauvéa sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 49,
    "stock": 2
  },
  {
    "id": "roselia-2",
    "name": "Rosélia",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-050.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-029.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-029-2.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-050.webp?v=5"
    ],
    "description": "Les Rosélia sont composées de deux fleurs roses à coeur doré, composées de pétales couleur rose pastel façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts doré en acier inoxydable.\n\nUn bijou comme les Rosélia apporte une note tendre et romantique, aussi agréable avec une tenue simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille: 2,5 cm",
      "Les Rosélia sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 50,
    "stock": 1
  },
  {
    "id": "violetta-2",
    "name": "Violetta",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-051.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-003.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-051.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-055.webp?v=5"
    ],
    "description": "Les Violetta sont composées de deux fleurs mauve à coeur doré, composées de pétales rose façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts doré en acier inoxydable.\n\nAvec leur ton mauve, les Violetta apportent une touche colorée pleine de caractère sans trop charger votre tenue en soirée ou au quotidien .",
    "characteristics": [
      "Pâte polymère",
      "Apprêts créoles dorées de 3cm en acier inoxydable",
      "Confortables pour la journée",
      "Taille: 2,5 cm",
      "Faites à la main, les Violetta gardent le charme d'une création unique"
    ],
    "sourceRow": 51,
    "stock": 1
  },
  {
    "id": "petits-coquelicot-huit-paires-disponible",
    "name": "Petits Coquelicot",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-052.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-052.webp?v=5"
    ],
    "description": "orné d'un petit coeur noir, montées sur des apprêts dorés ou couleur argent en acier inoxydable. ( au choix)\n\nOn choisit les Petits Coquelicot pour attirer le regard avec élégance, avec un détail affirmé qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts en acier inoxydable deux",
      "tailles \"3 ou 2 cm deux couleurs dorés ou argent (au choix)",
      "Pensées pour rester légères",
      "Taille: 2à 2,5 cm",
      "Chaque paire de Petits Coquelicot est confectionnée à la main et possède son caractère unique"
    ],
    "sourceRow": 52,
    "choice": {
      "code": "C1",
      "options": [
        "Attache dorée",
        "Attache argentée"
      ]
    },
    "stock": 8
  },
  {
    "id": "vaninee-deux-paires-disponibles",
    "name": "Vaninée",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-053.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-053.webp?v=5"
    ],
    "description": "Les Vaninée sont composées de deux fleurs blanches à centre jaune, pétales façonées à la main unes à unes, montées sur des apprêts dorés en acier inoxydable.\n\nAvec leur jaune lumineux, les Vaninée apportent une note solaire sans trop charger votre tenue.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts créole dorés 3 cm en acier inoxydable",
      "Confortables et légères",
      "Taille:3 cm",
      "Les Vaninée sont une création artisanale, unique et faite à la main"
    ],
    "sourceRow": 53,
    "stock": 2
  },
  {
    "id": "p-orangeade",
    "name": "Orangeade",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-054.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-054.webp?v=5"
    ],
    "description": "Les Orangeade sont de pétales couleur oranges façonées à la main unes à unes ornées d'une perle nacrées , montées sur des apprêts créoles dorés en acier inoxydable.\n\nLes Orangeade donnent tout de suite une touche pep's et finissent joliment une tenue de soirée ou du quotidien.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts créoles dorés en acier inoxydable",
      "Un format facile à porter",
      "taille:3,5 cm",
      "Réalisées à la main, les Orangeade ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 54,
    "stock": 1
  },
  {
    "id": "violetta-3",
    "name": "Violetta",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-055.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-003.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-051.webp?v=5",
      "./assets/catalogue-saugardevalerie/photos/row-055.webp?v=5"
    ],
    "description": "Les Sélène sont deux belles fleurs éclosent à coeur doré, composées de pétales couleur fushia façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts gouttes dorés en acier inoxydable.\n\nOn choisit les Sélène pour changer des bijoux trop classiques, avec un détail délicat qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts goutte dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille: 3 cm",
      "Sélène est une pièce artisanale unique, faite main avec soin"
    ],
    "sourceRow": 55,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "azuline",
    "name": "Azuline",
    "category": "florales",
    "tag": "Florales",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-056.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-056.webp?v=5"
    ],
    "description": "Les Azuline sont des boucle d'oreilles puces, composées de petites pétales bleue azure façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Azuline apporte une note légère et colorée, aussi agréable avec une tenue de soirée qu'avec une tenue plus simple.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "taille:1,5 à 2 cm",
      "Les Azuline sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 56,
    "stock": 1
  },
  {
    "id": "camelia",
    "name": "Camelia",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-057.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-057.webp?v=5"
    ],
    "description": "Les Camelia sont sont composées de pétales couleur blanches légèrement pailletées, façonées à la main unes à unes ornées d'un pistile doré , montées sur des apprêts créoles dorés en acier inoxydable.\n\nOn choisit les Camelia pour compléter une tenue avec douceur et élégance, avec un détail facile à porter qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts en acier inoxydable",
      "Pensées pour rester légères",
      "taille 3,5 cm",
      "Les Camelia sont travaillées à la main avec passsion pour un rendu unique"
    ],
    "sourceRow": 57,
    "stock": 1
  },
  {
    "id": "viola-fushia",
    "name": "Viola Fushia",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-058.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-058.webp?v=5"
    ],
    "description": "Viola Fushia sont deux belles fleurs éclosent à coeur doré, composées de pétales couleur fushia et gris légèrement pailletées, façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts gouttes dorés en acier inoxydable.\n\n\nOn choisit les Viola Fushia pour changer des bijoux trop classiques, avec un détail délicat qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts goutte dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille: 3 cm de longueur",
      "Chaque paire de Viola Fushia est confectionnée à la main et possède son caractère unique"
    ],
    "sourceRow": 58,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "soline",
    "name": "Soline",
    "category": "florales",
    "tag": "Florales",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-059.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-059.webp?v=5"
    ],
    "description": "Boucle Soline \n\nLes Bouton Soline sont deux belles fleurs éclosent à coeur doré, composées de pétales couleur fushia légèrement pailletées, façonées à la main unes à unes ornées d'un pistile doré, montées sur des apprêts créoles dorés en acier inoxydable.\n\nAvec leur ton violet, les Soline apportent une touche colorée pleine de caractère sans trop charger votre tenue..",
    "characteristics": [
      "Pâte polymère",
      "Apprêts en acier inoxydable",
      "Confortables pour la journée",
      "Taille: 2,5 cm",
      "Soline est un bijou fait main, pensé comme une pièce unique"
    ],
    "sourceRow": 59,
    "stock": 1
  },
  {
    "id": "tiare",
    "name": "Tiaré",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-060.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-060.webp?v=5"
    ],
    "description": "Les Tiaré sont composées de deux fleurs blanches à centre jaune, chaques pétales façonées à la main unes à unes, montées sur des apprêts créoles dorés en acier inoxydable.\n\nOn choisit les Tiaré pour apporter de l'éclat aux beaux jours, avec un détail chaleureux qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts créoles dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille:4 cm",
      "Créées à la main, les Tiaré restent uniques et ne ressemblent à aucune autre paire"
    ],
    "sourceRow": 60,
    "stock": 1
  },
  {
    "id": "les-givrees",
    "name": "Les Givrées",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-061.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-061.webp?v=5"
    ],
    "description": "Les Givrées sont composées de fleurs grises légèrement pailletées juste se quil faut pour éteinceler chaques pétales façonées à la main unes, montées sur des apprêts gouttes dorées en acier inoxydable.\n\nLes Givrées sont parfaites pour compléter une tenue habillée ou simple de tout les jours avec douceur, tout en gardant un rendu facile à porter.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts gouttes dorées en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille: 3 cm",
      "Les",
      "Givrées est une création unique, façonnée à la main avec passion"
    ],
    "sourceRow": 61,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "viola-parme-deux-paires-disponibles",
    "name": "Viola parme",
    "category": "florales",
    "tag": "Florales",
    "price": 10,
    "image": "./assets/catalogue-saugardevalerie/photos/row-062.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-062.webp?v=5"
    ],
    "description": "Les Viola parme sont composées de petites fleurs couleur violettes et grise légèrement pailletées chaques pétales sont façonées à la main unes à unes ornées, d'un pistile doré, montées sur des apprêts gouttes dorées en acier inoxydable.\n\nLes Viola parme sont parfaites pour changer des bijoux trop classiques, tout en gardant un rendu délicat et éléguant.",
    "characteristics": [
      "Pâte polymère",
      "Apprêts gouttes dorées en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille: 2,5 à 3 cm",
      "Chaque bijou est réalisé à la main, ce qui rend les Viola parme uniques et originales"
    ],
    "sourceRow": 62,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 2
  },
  {
    "id": "thaiti",
    "name": "Thaiti",
    "category": "florales",
    "tag": "Florales",
    "price": 12,
    "image": "./assets/catalogue-saugardevalerie/photos/row-063.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-063.webp?v=5"
    ],
    "description": "Les Thaiti sont des boucles d'oreilles puce, composées de fleurs couleur bleus marbré et feuille d'or, chaques pétales sont façonées à la main unes à unes, ornées d'un pistile doré, montées sur des apprêts dorées en acier inoxydable.\n\ngrace à leur mélange de bleu et leur touche de doré,Les Thaiti sont parfaites pour réveiller une tenue sobre, tout en gardant un rendu lumineux.",
    "characteristics": [
      "Pâte polymère et aprêts dorés",
      "Apprêts en acier inoxydable",
      "Agréables à porter au quotidien ou pour une tenue de soirée",
      "Taille: 3 cm",
      "Les Thaiti sont travaillées à la main pour un rendu unique"
    ],
    "sourceRow": 63,
    "stock": 1
  },
  {
    "id": "solea",
    "name": "Solea",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-064.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-064.webp?v=5"
    ],
    "description": "Les Solea sont composées de pétales acryliques jaunes de petites perlesjaunes ornées d'un apprêt doré style ancien, montées sur des apprêts dorés en acier inoxydable.\n\nLes Solea sont parfaites pour apporter de l'éclats, tout en gardant un rendu chaleureux et stylé",
    "characteristics": [
      "Perles pétales acryliques, perles et aprêts dorés style ancien",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien",
      "Taille: 5 cm de longueur",
      "Les Solea portent la touche du fait main et d'une pièce unique"
    ],
    "sourceRow": 64,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "neptune",
    "name": "Neptune",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-065.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-065.webp?v=5"
    ],
    "description": "Les Neptune sont composées de perles turquoise marbrées et nacrées ornées d'aprêts éventails dorés, montées sur des apprêts dorés en acier inoxydable.\n\nLes Neptune donnent tout de suite une touche élégante et lumineuse et finissent joliment une tenue du quotidien comme une tenue de soirée.",
    "characteristics": [
      "Perles marbrées et nacrées turquoises aprêts dorés",
      "Apprêts dorés en acier inoxydable Pensées pour rester légères",
      "Taille: 3cm de longueur Neptune est faite à la main et reste unique"
    ],
    "sourceRow": 65,
    "stock": 1
  },
  {
    "id": "ambra",
    "name": "Ambra",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-066.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-066.webp?v=5"
    ],
    "description": "Les Ambra sont composées de petites perles fleurs fantaisies orange de perles crystal rose clairese ornées d'un aprêt feuilles bronze dorées, montées sur des apprêts gouttes dorées en acier inoxydable.\n\nOn choisit les Ambra pour briller avec discrétion, avec un détail végétal qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Perles perles fantaisies et crystal ton orangés aprêts feilles dorées",
      "Apprêts goutte dorées en acier inoxydable",
      "Pensées pour rester légères",
      "Taille: 4cm de longueur",
      "Chaque paire d'Ambra est faite à la main et reste unique"
    ],
    "sourceRow": 66,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "cyane",
    "name": "Cyane",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-067.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-067.webp?v=5"
    ],
    "description": "Les Cyane sont composées de perles de verre et nacées turquoise ornées d'aprêtd feuilles dorées , montées sur des apprêts dorés en acier inoxydable.\n\nUn bijou comme les Cyane apporte un mouvement naturel et lumineux, aussi agréable avec une simple qu'avec une tenue plus habillée.",
    "characteristics": [
      "Perles de verre et naceés turquoise aprêts feuilles dorées",
      "Apprêts dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées.Taille:3 cm de longueur",
      "Réalisées à la main, les Cyane ont chacune leurs petits détails uniques"
    ],
    "sourceRow": 67,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "marina-blue",
    "name": "Marina blue",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-068.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-068.webp?v=5"
    ],
    "description": "Les Marina blue sont composées de perles turquoise marbrées et nacrées ornées de franges en éventail bleu azur, montées sur des apprêts gouttes dorés en acier inoxydable.\n\nAvec leurs reflets doux, les Marina blue apportent une touche élégante et lumineuse tout en gardant une tenue chic et simple à la fois.",
    "characteristics": [
      "Perles marbées et nacrées turquoises aprêts coton turquoise",
      "Apprêts gouttes dorées en acier inoxydable",
      "Confortables pour la journée.Taille: 4 cm de longueur",
      "Marina blue est une pièce artisanale unique, faite main avec soin"
    ],
    "sourceRow": 68,
    "stock": 1
  },
  {
    "id": "nocturne",
    "name": "Nocturne",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-069.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-069.webp?v=5"
    ],
    "description": "Les Nocturne sont composées de perles noires et perles crystal ornées d'un aprêt éventail noirs, montées sur des apprêts dorés en acier inoxydable.\n\nLes Nocturne sont parfaites pour briller avec discrétion, tout en gardant un rendu raffiné.",
    "characteristics": [
      "Perles acrylyques et aprêts acier noir",
      "Apprêts dorés en acier inoxydable",
      "Agréables à porter au quotidien.Taille:3 cm de longueur",
      "Les Nocturne sont façonnées à la main, en modèle unique"
    ],
    "sourceRow": 69,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "talis",
    "name": "Talis",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-070.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-070.webp?v=5"
    ],
    "description": "Les Talis sont composées de perles fantaisies couleur pêche, une petite perle bois naturel et une autre rose saumoné ornées de feuilles couleur dorées , montées sur des apprêts gouttes en acier inoxydable.\n\nLes Talis donnent tout de suite un mouvement naturel et lumineux et finissent joliment une tenue du quotidien.",
    "characteristics": [
      "Perles acryliques saumon et perles fantaisie fleurs",
      "Apprêts dorés en acier inoxydable",
      "Un format facile à porter.Taille:4 cm de longueur",
      "Chaque bijou est réalisé à la main, ce qui rend les Talis uniques"
    ],
    "sourceRow": 70,
    "choice": {
      "code": "C2",
      "options": [
        "Attache dorée",
        "Pince à vis dorée"
      ]
    },
    "stock": 1
  },
  {
    "id": "eventia",
    "name": "Eventia",
    "category": "perles",
    "tag": "Perles",
    "price": 8,
    "image": "./assets/catalogue-saugardevalerie/photos/row-071.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-071.webp?v=5"
    ],
    "description": "Les Eventia sont composées de perles bleu roi et de grands éventails couleur dorés, montées sur des apprêts dorés en acier inoxydable.\n\nOn choisit les Eventia pour briller avec discrétion, avec un détail raffiné qui se remarque juste ce qu'il faut.",
    "characteristics": [
      "Perles en verre ton bleuté",
      "Apprêts dorés en acier inoxydable",
      "Pensées pour rester légères",
      "Taille: 3,5 cmde longueur",
      "Faites à la main, les Eventia gardent le charme d'une création unique"
    ],
    "sourceRow": 71,
    "stock": 1
  },
  {
    "id": "auguste",
    "name": "Auguste",
    "category": "perles",
    "tag": "Perles",
    "price": 6,
    "image": "./assets/catalogue-saugardevalerie/photos/row-072.webp?v=5",
    "gallery": [
      "./assets/catalogue-saugardevalerie/photos/row-072.webp?v=5"
    ],
    "description": "Les Auguste sont composées d'un aprêt esgargot bronze et de deux perles de verre couleur ambres et rose pale montées, sur des apprêts fantaisie dorés en acier inoxydable.\n\nUn bijou comme les Auguste apporte une présence chaleureuse, et rigolotte avec cette paires de boucles d'oreilles vous etes sur d'etre la personne la plus fun de la journée. Agréable avec une simple ou pour mettre une petite touche d'originalité avec plus habillée.",
    "characteristics": [
      "Perles de verre ambre et rose pale /petit escargot bronze",
      "Apprêt rectangulaire dorés en acier inoxydable",
      "Faciles à mettre avec vos tenues préférées",
      "Taille:3 cm",
      "Auguste est une création faite main, unique par son originalité"
    ],
    "sourceRow": 72,
    "stock": 1
  }
];

const productOrder = {
  "alba": {
    "order": 1,
    "row": 3,
    "original": 0
  },
  "violetta": {
    "order": 1,
    "row": 4,
    "original": 1
  },
  "azura": {
    "order": 1,
    "row": 5,
    "original": 2
  },
  "naya": {
    "order": 1,
    "row": 6,
    "original": 3
  },
  "prune": {
    "order": 1,
    "row": 7,
    "original": 4
  },
  "daisy": {
    "order": 2,
    "row": 8,
    "original": 5
  },
  "manta": {
    "order": 1,
    "row": 9,
    "original": 6
  },
  "liliane": {
    "order": 1,
    "row": 10,
    "original": 7
  },
  "plume": {
    "order": 2,
    "row": 11,
    "original": 8
  },
  "rosalie": {
    "order": 2,
    "row": 12,
    "original": 9
  },
  "palma": {
    "order": 1,
    "row": 13,
    "original": 10
  },
  "pivoine": {
    "order": 1,
    "row": 14,
    "original": 11
  },
  "terracotta": {
    "order": 1,
    "row": 15,
    "original": 12
  },
  "celeste": {
    "order": 1,
    "row": 16,
    "original": 13
  },
  "gaia": {
    "order": 1,
    "row": 17,
    "original": 14
  },
  "rose": {
    "order": 2,
    "row": 18,
    "original": 15
  },
  "luna": {
    "order": 1,
    "row": 19,
    "original": 16
  },
  "miel": {
    "order": 1,
    "row": 20,
    "original": 17
  },
  "clea": {
    "order": 1,
    "row": 21,
    "original": 18
  },
  "azule": {
    "order": 1,
    "row": 22,
    "original": 19
  },
  "avia": {
    "order": 1,
    "row": 23,
    "original": 20
  },
  "soleia": {
    "order": 1,
    "row": 24,
    "original": 21
  },
  "lagune": {
    "order": 1,
    "row": 2,
    "original": 22
  },
  "selene": {
    "order": 1,
    "row": 25,
    "original": 23
  },
  "oria": {
    "order": 1,
    "row": 26,
    "original": 24
  },
  "dune": {
    "order": 1,
    "row": 27,
    "original": 25
  },
  "flamme": {
    "order": 1,
    "row": 28,
    "original": 26
  },
  "roselia": {
    "order": 1,
    "row": 29,
    "original": 27
  },
  "onatha": {
    "order": 2,
    "row": 30,
    "original": 28
  },
  "cristal": {
    "order": 2,
    "row": 31,
    "original": 29
  },
  "nea": {
    "order": 4,
    "row": 32,
    "original": 30
  },
  "azalee": {
    "order": 1,
    "row": 33,
    "original": 31
  },
  "azelie": {
    "order": 1,
    "row": 34,
    "original": 32
  },
  "moka": {
    "order": 4,
    "row": 35,
    "original": 33
  },
  "selea": {
    "order": 4,
    "row": 36,
    "original": 34
  },
  "margot": {
    "order": 4,
    "row": 37,
    "original": 35
  },
  "flora": {
    "order": 4,
    "row": 38,
    "original": 36
  },
  "petalia": {
    "order": 4,
    "row": 39,
    "original": 37
  },
  "citronelle": {
    "order": 4,
    "row": 40,
    "original": 38
  },
  "clea-2": {
    "order": 4,
    "row": 41,
    "original": 39
  },
  "eclat-floral": {
    "order": 2,
    "row": 42,
    "original": 40
  },
  "prunelle": {
    "order": 2,
    "row": 43,
    "original": 41
  },
  "nacria-deux-paires-disponibles": {
    "order": 1,
    "row": 44,
    "original": 42
  },
  "viola-deux-paires-disponibles": {
    "order": 1,
    "row": 45,
    "original": 43
  },
  "grandes-mauvea": {
    "order": 1,
    "row": 46,
    "original": 44
  },
  "liera": {
    "order": 1,
    "row": 47,
    "original": 45
  },
  "azurine-deux-paires-disponibles": {
    "order": 1,
    "row": 48,
    "original": 46
  },
  "mauvea-deux-paires-disponibles": {
    "order": 1,
    "row": 49,
    "original": 47
  },
  "roselia-2": {
    "order": 1,
    "row": 50,
    "original": 48
  },
  "violetta-2": {
    "order": 1,
    "row": 51,
    "original": 49
  },
  "petits-coquelicot-huit-paires-disponible": {
    "order": 1,
    "row": 52,
    "original": 50
  },
  "vaninee-deux-paires-disponibles": {
    "order": 1,
    "row": 53,
    "original": 51
  },
  "p-orangeade": {
    "order": 1,
    "row": 54,
    "original": 52
  },
  "violetta-3": {
    "order": 3,
    "row": 55,
    "original": 53
  },
  "azuline": {
    "order": 1,
    "row": 56,
    "original": 54
  },
  "camelia": {
    "order": 1,
    "row": 57,
    "original": 55
  },
  "viola-fushia": {
    "order": 3,
    "row": 58,
    "original": 56
  },
  "soline": {
    "order": 3,
    "row": 59,
    "original": 57
  },
  "tiare": {
    "order": 1,
    "row": 60,
    "original": 58
  },
  "les-givrees": {
    "order": 3,
    "row": 61,
    "original": 59
  },
  "viola-parme-deux-paires-disponibles": {
    "order": 3,
    "row": 62,
    "original": 60
  },
  "thaiti": {
    "order": 1,
    "row": 63,
    "original": 61
  },
  "solea": {
    "order": 2,
    "row": 64,
    "original": 62
  },
  "neptune": {
    "order": 1,
    "row": 65,
    "original": 63
  },
  "ambra": {
    "order": 2,
    "row": 66,
    "original": 64
  },
  "cyane": {
    "order": 1,
    "row": 67,
    "original": 65
  },
  "marina-blue": {
    "order": 1,
    "row": 68,
    "original": 66
  },
  "nocturne": {
    "order": 1,
    "row": 69,
    "original": 67
  },
  "talis": {
    "order": 2,
    "row": 70,
    "original": 68
  },
  "eventia": {
    "order": 1,
    "row": 71,
    "original": 69
  },
  "auguste": {
    "order": 2,
    "row": 72,
    "original": 70
  }
};

const CART_STORAGE_KEY = "valmeo-cart-reservation-v1";
const CART_HOLD_DURATION = 30 * 60 * 1000;
const STOCK_SYNC_INTERVAL = 60 * 1000;
const STOCK_API_URL = "https://script.google.com/macros/s/AKfycbwb2KrVbhq8R1lrHdomMHZnIPg324mDCl_dJmtaeNhJFr66MgZnBzgJ5CLm09JelNHf/exec";

const cart = new Map();
let activeFilter = "florales";
let cartExpiresAt = 0;
let cartExpiryTimer = null;
let stockSyncTimer = null;
const productGrid = document.querySelector("[data-products]");
const cartPanel = document.querySelector("[data-cart-panel]");
const overlay = document.querySelector("[data-overlay]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const productModal = document.querySelector("[data-product-modal]");
const modalImage = document.querySelector("[data-modal-image]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalMeta = document.querySelector("[data-modal-meta]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalCharacteristics = document.querySelector("[data-modal-characteristics]");
const modalThumbnails = document.querySelector("[data-modal-thumbnails]");
const modalAdd = document.querySelector("[data-modal-add]");
const modalChoice = document.querySelector("[data-modal-choice]");
const choicePreviewImage = "./assets/choice-guides/attaches-pince-vis.jpeg?v=1";
const choicePreview = document.createElement("div");
choicePreview.className = "choice-photo-preview";
choicePreview.hidden = true;
choicePreview.innerHTML = `<img src="${choicePreviewImage}" alt="Photo des pinces à vis">`;
document.body.appendChild(choicePreview);

let activeProductId = null;
let activeChoice = "";

function euro(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

function paragraphs(text) {
  return String(text || "")
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function escapeAttribute(value) {
  return String(value || "").replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function productNeedsChoice(product) {
  return Boolean(product.choice?.options?.length);
}

function productUsesEarAttachmentGuide(product) {
  return product.choice?.code === "C2";
}

function renderChoiceOptionLabel(product, option) {
  if (productUsesEarAttachmentGuide(product) && option === "Pince à vis dorée") {
    return `${option} <span class="choice-photo-trigger" data-choice-preview-trigger>(photo)</span>`;
  }

  return option;
}

function cartKey(id, choice = "") {
  return `${id}::${choice}`;
}

function stockApiConfigured() {
  return /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(STOCK_API_URL);
}

function productBaseStock(product) {
  return Math.max(0, Number(product.stock || 0));
}

function cartQuantityForProduct(productId) {
  return [...cart.values()]
    .filter((item) => item.id === productId)
    .reduce((sum, item) => sum + item.quantity, 0);
}

function availableStock(product) {
  return Math.max(0, productBaseStock(product) - cartQuantityForProduct(product.id));
}

function stockLabel(product) {
  const stock = availableStock(product);
  return `${stock} ${stock > 1 ? "articles disponibles" : "article disponible"}`;
}

function productIsOutOfStock(product) {
  return availableStock(product) <= 0;
}

function getCartRowsForStorage() {
  return [...cart.values()].map((item) => ({
    id: item.id,
    selectedChoice: item.selectedChoice || "",
    quantity: item.quantity
  }));
}

function scheduleCartExpiry() {
  if (cartExpiryTimer) window.clearTimeout(cartExpiryTimer);
  if (!cartExpiresAt) return;

  const delay = cartExpiresAt - Date.now();
  if (delay <= 0) {
    expireCartReservation();
    return;
  }

  cartExpiryTimer = window.setTimeout(expireCartReservation, delay);
}

function saveCartReservation() {
  if (!cart.size) {
    cartExpiresAt = 0;
    localStorage.removeItem(CART_STORAGE_KEY);
    if (cartExpiryTimer) window.clearTimeout(cartExpiryTimer);
    return;
  }

  cartExpiresAt = Date.now() + CART_HOLD_DURATION;
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify({
      expiresAt: cartExpiresAt,
      rows: getCartRowsForStorage()
    })
  );
  scheduleCartExpiry();
}

function clearCartReservation() {
  cart.clear();
  cartExpiresAt = 0;
  localStorage.removeItem(CART_STORAGE_KEY);
  if (cartExpiryTimer) window.clearTimeout(cartExpiryTimer);
}

function restoreCartReservation() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "null");
    if (!saved?.expiresAt || saved.expiresAt <= Date.now()) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    saved.rows?.forEach((row) => {
      const product = products.find((item) => item.id === row.id);
      if (!product) return;

      const quantity = Math.min(Number(row.quantity || 0), productBaseStock(product));
      if (quantity <= 0) return;

      const selectedChoice = row.selectedChoice || "";
      cart.set(cartKey(product.id, selectedChoice), {
        ...product,
        cartKey: cartKey(product.id, selectedChoice),
        selectedChoice,
        quantity
      });
    });

    cartExpiresAt = saved.expiresAt;
    scheduleCartExpiry();
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}

function expireCartReservation() {
  if (!cart.size) return;
  clearCartReservation();
  updateCart();
  renderProducts(activeFilter);
  if (activeProductId) openProduct(activeProductId);
  formNote.textContent = "Le panier a expiré après 30 minutes. Les stocks ont été libérés.";
}

function refreshStockViews() {
  updateCart();
  renderProducts(activeFilter);
}

function applyStockSnapshot(stocks) {
  if (!stocks || typeof stocks !== "object") return;

  products.forEach((product) => {
    const liveStock = Number(stocks[product.id]);
    if (Number.isFinite(liveStock) && liveStock >= 0) {
      product.stock = Math.floor(liveStock);
    }
  });

  let cartChanged = false;
  products.forEach((product) => {
    let remaining = productBaseStock(product);
    [...cart.entries()]
      .filter(([, item]) => item.id === product.id)
      .forEach(([key, item]) => {
        const nextQuantity = Math.min(item.quantity, remaining);
        remaining -= nextQuantity;

        if (nextQuantity <= 0) {
          cart.delete(key);
          cartChanged = true;
        } else if (nextQuantity !== item.quantity) {
          cart.set(key, { ...item, quantity: nextQuantity });
          cartChanged = true;
        }
      });
  });

  if (cartChanged) saveCartReservation();
  refreshStockViews();
  if (activeProductId) openProduct(activeProductId);
}

async function syncStockFromSheet({ silent = false } = {}) {
  if (!stockApiConfigured()) return false;

  try {
    const url = new URL(STOCK_API_URL);
    url.searchParams.set("action", "stocks");
    url.searchParams.set("t", String(Date.now()));
    const response = await fetch(url, { cache: "no-store", redirect: "follow" });
    const payload = await response.json();
    if (!response.ok || !payload.ok || !payload.stocks) {
      throw new Error(payload.message || "Réponse de stock invalide");
    }

    applyStockSnapshot(payload.stocks);
    return true;
  } catch (error) {
    console.error("Synchronisation du stock impossible", error);
    if (!silent) {
      formNote.textContent = "Le stock en direct est momentanément indisponible. Réessaie dans quelques instants.";
    }
    return false;
  }
}

function getProductOrder(product) {
  return productOrder[product.id] || { order: 9999, row: product.sourceRow || 9999, original: 9999 };
}

function compareProducts(a, b) {
  const orderA = getProductOrder(a);
  const orderB = getProductOrder(b);
  return (
    orderA.order - orderB.order ||
    orderA.row - orderB.row ||
    orderA.original - orderB.original ||
    a.name.localeCompare(b.name, "fr")
  );
}

function renderProducts(filter = "all") {
  activeFilter = filter;
  const visibleProducts = [...(filter === "all" ? products : products.filter((product) => product.category === filter))].sort(compareProducts);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => {
        const outOfStock = productIsOutOfStock(product);
        const actionAttributes = outOfStock
          ? 'disabled aria-disabled="true"'
          : productNeedsChoice(product)
            ? `data-open-product="${product.id}"`
            : `data-add="${product.id}"`;
        const actionLabel = outOfStock ? "Rupture de stock" : productNeedsChoice(product) ? "Détails" : "Ajouter au panier";

        return `
        <article class="product-card ${productNeedsChoice(product) ? "requires-choice" : ""} ${outOfStock ? "out-of-stock" : ""}">
          ${outOfStock ? '<span class="stock-ribbon">Rupture de stock</span>' : ""}
          <button class="product-image" type="button" data-open-product="${product.id}" aria-label="Agrandir la photo de ${escapeAttribute(product.name)}">
            <img src="${product.image}" alt="${escapeAttribute(product.name)}" loading="lazy">
          </button>
          <div class="product-content">
            <div class="product-meta">
              <span class="product-tag">${product.tag}</span>
              <span class="price">${euro(product.price)}</span>
            </div>
            <h3>${escapeHtml(product.name)} <span class="product-stock">(${stockLabel(product)})</span></h3>
            <button class="button primary" type="button" ${actionAttributes}>
              ${actionLabel}
            </button>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderModalChoice(product) {
  const outOfStock = productIsOutOfStock(product);
  activeChoice = "";
  modalAdd.dataset.choice = "";

  if (!productNeedsChoice(product)) {
    modalChoice.hidden = true;
    modalChoice.innerHTML = "";
    modalAdd.disabled = outOfStock;
    modalAdd.toggleAttribute("aria-disabled", outOfStock);
    modalAdd.textContent = outOfStock ? "Rupture de stock" : "Ajouter au panier";
    return;
  }

  modalChoice.hidden = false;
  modalChoice.innerHTML = `
    <h3>${productUsesEarAttachmentGuide(product) ? "Choisissez l'attache adaptée à vos oreilles" : "Choix obligatoire"}</h3>
    <p>Sélectionne une option avant d'ajouter cet article au panier.</p>
    <div class="choice-options" role="radiogroup" aria-label="Choix pour ${product.name}">
      ${product.choice.options
        .map(
          (option) => `
            <button type="button" class="choice-option" role="radio" aria-checked="false" data-choice-option="${escapeAttribute(option)}">
              ${renderChoiceOptionLabel(product, option)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
  modalAdd.disabled = true;
  modalAdd.setAttribute("aria-disabled", "true");
  modalAdd.textContent = outOfStock ? "Rupture de stock" : "Choisis une option";
}

function selectModalChoice(option) {
  const product = products.find((item) => item.id === activeProductId);
  activeChoice = option;
  modalAdd.dataset.choice = option;
  const outOfStock = product ? productIsOutOfStock(product) : true;
  modalAdd.disabled = outOfStock;
  modalAdd.toggleAttribute("aria-disabled", outOfStock);
  modalAdd.textContent = outOfStock ? "Rupture de stock" : "Ajouter au panier";
  modalChoice.querySelectorAll("[data-choice-option]").forEach((button) => {
    const isActive = button.dataset.choiceOption === option;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function positionChoicePreview(x, y) {
  const margin = 14;
  const offset = 18;
  const previewRect = choicePreview.getBoundingClientRect();
  const left = Math.min(window.innerWidth - previewRect.width - margin, Math.max(margin, x + offset));
  const top = Math.min(window.innerHeight - previewRect.height - margin, Math.max(margin, y - previewRect.height - offset));
  choicePreview.style.left = `${left}px`;
  choicePreview.style.top = `${top}px`;
}

function showChoicePreview(event) {
  const trigger = event.target.closest("[data-choice-preview-trigger]");
  if (!trigger) return;

  choicePreview.hidden = false;
  const rect = trigger.getBoundingClientRect();
  positionChoicePreview(event.clientX || rect.left + rect.width / 2, event.clientY || rect.top);
}

function hideChoicePreview(event) {
  if (!event.target.closest("[data-choice-preview-trigger]")) return;
  choicePreview.hidden = true;
}

function renderModalImage(product, image) {
  modalImage.src = image;
  modalImage.alt = product.name;
  modalThumbnails.innerHTML = product.gallery
    .map(
      (galleryImage) => `
        <button class="${galleryImage === image ? "active" : ""}" type="button" data-modal-thumb="${galleryImage}" aria-label="Voir cette photo de ${product.name}">
          <img src="${galleryImage}" alt="">
        </button>
      `
    )
    .join("");
}

function openProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  activeProductId = id;
  modalTitle.innerHTML = "";
  const name = document.createElement("span");
  name.className = "modal-product-name";
  name.textContent = product.name;
  const stock = document.createElement("span");
  stock.className = "modal-stock";
  stock.textContent = stockLabel(product);
  const price = document.createElement("span");
  price.className = "modal-price";
  price.textContent = euro(product.price);
  modalTitle.append(name, price, stock);
  modalMeta.textContent = product.tag;
  modalDescription.innerHTML = paragraphs(product.description);
  modalCharacteristics.innerHTML = product.characteristics.length
    ? product.characteristics.map((item) => `<li>${item}</li>`).join("")
    : "<li>Caractéristiques non renseignées dans le fichier Excel.</li>";
  modalAdd.dataset.add = product.id;
  renderModalChoice(product);
  renderModalImage(product, product.gallery[0] || product.image);
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProduct() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  choicePreview.hidden = true;
  activeProductId = null;
  activeChoice = "";
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
      (item) => {
        const product = products.find((candidate) => candidate.id === item.id) || item;
        const canIncrease = availableStock(product) > 0;

        return `
        <div class="cart-row">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <p>${escapeHtml(item.name)}</p>
            <small>${euro(item.price)} l'unite${item.selectedChoice ? ` · ${item.selectedChoice}` : ""}</small>
          </div>
          <div class="qty-controls" aria-label="Quantite pour ${item.name}">
            <button type="button" data-decrease="${item.cartKey}" aria-label="Retirer une unite">-</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-increase="${item.cartKey}" aria-label="Ajouter une unite" ${canIncrease ? "" : "disabled"}>+</button>
          </div>
        </div>
      `;
      }
    )
    .join("");
}

function addToCart(id, selectedChoice = "") {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const addedFromProductModal = activeProductId === id;

  if (productNeedsChoice(product) && !selectedChoice) {
    openProduct(id);
    return;
  }

  if (availableStock(product) <= 0) {
    renderProducts(activeFilter);
    if (activeProductId === id) renderModalChoice(product);
    return;
  }

  const key = cartKey(id, selectedChoice);
  const existing = cart.get(key);

  cart.set(key, {
    ...product,
    cartKey: key,
    selectedChoice,
    quantity: existing ? existing.quantity + 1 : 1
  });

  saveCartReservation();
  updateCart();
  renderProducts(activeFilter);
  if (addedFromProductModal) closeProduct();
  openCart();
}

function changeQuantity(id, direction) {
  const item = cart.get(id);
  if (!item) return;
  const product = products.find((candidate) => candidate.id === item.id) || item;

  if (direction > 0 && availableStock(product) <= 0) return;

  const quantity = item.quantity + direction;
  if (quantity <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, { ...item, quantity });
  }

  saveCartReservation();
  updateCart();
  renderProducts(activeFilter);
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
  const openProductButton = event.target.closest("[data-open-product]");
  const modalThumb = event.target.closest("[data-modal-thumb]");
  const choiceButton = event.target.closest("[data-choice-option]");

  if (openProductButton) openProduct(openProductButton.dataset.openProduct);

  if (choiceButton) selectModalChoice(choiceButton.dataset.choiceOption);

  if (addButton && !addButton.disabled) addToCart(addButton.dataset.add, addButton.dataset.choice || "");

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button === filterButton);
    });
    renderProducts(filterButton.dataset.filter);
  }

  if (modalThumb && activeProductId) {
    const product = products.find((item) => item.id === activeProductId);
    if (product) renderModalImage(product, modalThumb.dataset.modalThumb);
  }

  if (increaseButton) changeQuantity(increaseButton.dataset.increase, 1);
  if (decreaseButton) changeQuantity(decreaseButton.dataset.decrease, -1);

  if (event.target.closest(".cart-toggle")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target === overlay) closeCart();
  if (event.target.closest("[data-close-cart-link]")) closeCart();
  if (event.target.closest("[data-close-product]") || event.target === productModal) closeProduct();
});

document.addEventListener("mouseover", showChoicePreview);
document.addEventListener("mousemove", (event) => {
  if (event.target.closest("[data-choice-preview-trigger]") && !choicePreview.hidden) {
    positionChoicePreview(event.clientX, event.clientY);
  }
});
document.addEventListener("mouseout", hideChoicePreview);
document.addEventListener("focusin", showChoicePreview);
document.addEventListener("focusout", hideChoicePreview);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    choicePreview.hidden = true;
    closeProduct();
    closeCart();
  }
});

restoreCartReservation();
renderProducts("florales");
updateCart();
syncStockFromSheet({ silent: true });
stockSyncTimer = window.setInterval(() => syncStockFromSheet({ silent: true }), STOCK_SYNC_INTERVAL);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") syncStockFromSheet({ silent: true });
});
