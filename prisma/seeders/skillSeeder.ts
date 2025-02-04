import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSkill() {
  // Liste des catégories et compétences
  const skillCategories = [
    {
      title: 'Développement Web',
      masqued: false,
      priority: 1,
      skills: [
        {
          label: 'HTML',
          iconSrc: '/src/assets/html.svg',
          description: 'Structure page web',
          stars: 5,
          masqued: false,
        },
        {
          label: 'CSS',
          iconSrc: '/src/assets/css.svg',
          description: 'Style page web',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Bootstrap',
          iconSrc: '/src/assets/bootstrap.svg',
          description: 'Style page web',
          stars: 4,
          masqued: false,
        },
        {
          label: 'Tailwind CSS',
          iconSrc: '/src/assets/tailwind.svg',
          description: 'Style page web',
          stars: 5,
          masqued: false,
        },
        {
          label: 'JS',
          iconSrc: '/src/assets/js.svg',
          description: 'Interaction',
          stars: 5,
          masqued: false,
        },
        {
          label: 'TS',
          iconSrc: '/src/assets/ts.svg',
          description: 'Interaction',
          stars: 4,
          masqued: false,
        },
        {
          label: 'Framer motion',
          iconSrc: '/src/assets/framer.svg',
          description: 'Animation',
          stars: 4,
          masqued: false,
        },
        {
          label: 'PHP',
          iconSrc: '/src/assets/php.svg',
          description: 'Serveur',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Ruby',
          iconSrc: '/src/assets/ruby.svg',
          description: 'Serveur',
          stars: 3,
          masqued: false,
        },
        {
          label: 'MySql',
          iconSrc: '/src/assets/mysql.svg',
          description: 'Base de données',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Postgre Sql',
          iconSrc: '/src/assets/psql.svg',
          description: 'Base de données',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Mongo DB',
          iconSrc: '/src/assets/mongodb.svg',
          description: 'Base de données',
          stars: 3,
          masqued: false,
        },
      ],
    },
    {
      title: 'Développement Applicatif',
      masqued: false,
      priority: 2,
      skills: [
        {
          label: 'C++',
          iconSrc: '/src/assets/cpp.png',
          description: 'Programmation logiciel',
          stars: 5,
          masqued: false,
        },
        {
          label: 'C',
          iconSrc: '/src/assets/c.png',
          description: 'Programmation système',
          stars: 3,
          masqued: false,
        },
        {
          label: 'C#',
          iconSrc: '/src/assets/cs.png',
          description: 'Programmation logiciel',
          stars: 2,
          masqued: false,
        },
        {
          label: 'Python',
          iconSrc: '/src/assets/python.svg',
          description: 'Programmation de scripts',
          stars: 5,
          masqued: false,
        },
        {
          label: 'JAVA',
          iconSrc: '/src/assets/java.svg',
          description: 'Programmation logiciel',
          stars: 3,
          masqued: false,
        },
        {
          label: 'Android',
          iconSrc: '/src/assets/android.svg',
          description: 'Programmation mobile',
          stars: 3,
          masqued: false,
        },
      ],
    },
    {
      title: 'Frameworks',
      masqued: false,
      priority: 3,
      skills: [
        {
          label: 'Angular JS',
          iconSrc: '/src/assets/angular.svg',
          description: 'Framework JS',
          stars: 4,
          masqued: false,
        },
        {
          label: 'React JS',
          iconSrc: '/src/assets/react.svg',
          description: 'Framework JS',
          stars: 4,
          masqued: false,
        },
        {
          label: 'Laravel',
          iconSrc: '/src/assets/laravel.svg',
          description: 'Framework PHP',
          stars: 5,
          masqued: false,
        },
        {
          label: 'QT',
          iconSrc: '/src/assets/qt.svg',
          description: 'Framework C++',
          stars: 4,
          masqued: false,
        },
        {
          label: 'FastApi',
          iconSrc: '/src/assets/fastapi.svg',
          description: 'Framework Python',
          stars: 4,
          masqued: false,
        },
        {
          label: 'Flutter',
          iconSrc: '/src/assets/flutter.svg',
          description: 'Framework Mobile',
          stars: 2,
          masqued: false,
        },
        {
          label: 'Rails',
          iconSrc: '/src/assets/rails.svg',
          description: 'Framework Ruby',
          stars: 3,
          masqued: false,
        },
        {
          label: 'Jest JS',
          iconSrc: '/src/assets/jest.webp',
          description: 'Framework de Tests',
          stars: 2,
          masqued: false,
        },
        {
          label: 'Nest JS',
          iconSrc: '/src/assets/nest.png',
          description: 'Framework JS',
          stars: 0,
          masqued: false,
        },
      ],
    },
    {
      title: 'Outils de développement',
      masqued: false,
      priority: 4,
      skills: [
        {
          label: 'Git',
          iconSrc: '/src/assets/git.svg',
          description: 'Code versionning',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Docker',
          iconSrc: '/src/assets/docker.svg',
          description: 'Conteneur virtuel',
          stars: 5,
          masqued: false,
        },
        {
          label: 'VSCode',
          iconSrc: '/src/assets/vscode.svg',
          description: 'IDE',
          stars: 5,
          masqued: false,
        },
        {
          label: 'IntelliJ',
          iconSrc: '/src/assets/intellij.svg',
          description: 'IDE',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Postman',
          iconSrc: '/src/assets/postman.svg',
          description: 'Requetteur HTTP',
          stars: 5,
          masqued: false,
        },
        {
          label: 'AWS',
          iconSrc: '/src/assets/aws.svg',
          description: 'Service CLOUD',
          stars: 4,
          masqued: false,
        },
      ],
    },
    {
      title: 'Cybersécurité',
      masqued: false,
      priority: 5,
      skills: [
        {
          label: 'Wireshark',
          iconSrc: '/src/assets/wireshark.svg',
          description: 'Analyse du trafic réseau',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Console',
          iconSrc: '/src/assets/cmd.svg',
          description: 'Ligne de commande',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Burp Suite',
          iconSrc: '/src/assets/burpsuite.svg',
          description: 'Tests de pénétration',
          stars: 3,
          masqued: false,
        },
        {
          label: 'NMap',
          iconSrc: '/src/assets/nmap.svg',
          description: 'Ligne de commande',
          stars: 3,
          masqued: false,
        },
        {
          label: 'OWASP',
          iconSrc: '/src/assets/owasp.svg',
          description: 'Tests de pénétration',
          stars: 0,
          masqued: false,
        },
        {
          label: 'Metasploit',
          iconSrc: '/src/assets/metasploit.png',
          description: 'Tests de pénétration',
          stars: 0,
          masqued: false,
        },
        {
          label: 'OSINT',
          iconSrc: '/src/assets/osint.png',
          description: "Collecte d'informations",
          stars: 2,
          masqued: false,
        },
        {
          label: 'Cryptographie',
          iconSrc: '/src/assets/crypto.png',
          description: 'Méthodes de cryptage',
          stars: 2,
          masqued: false,
        },
        {
          label: 'XSSi',
          iconSrc: '/src/assets/xssi.svg',
          description: 'Cross-Site Script Inclusion',
          stars: 4,
        },
        {
          label: 'SQLi',
          iconSrc: '/src/assets/sqli.svg',
          description: 'SQL injection',
          stars: 4,
          masqued: false,
        },
        {
          label: 'CSRF',
          iconSrc: '/src/assets/csrf.svg',
          description: 'Cross Site Request Forgery',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Privilege escalation',
          iconSrc: '/src/assets/pe.png',
          description: 'Obtenir un accès privilégié',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Social engineering',
          iconSrc: '/src/assets/se.svg',
          description: 'Manipulation psychologique',
          stars: 5,
          masqued: false,
        },
        {
          label: 'ARP Spoofing',
          iconSrc: '/src/assets/arp.png',
          description: 'Manipulation des caches',
          stars: 5,
          masqued: false,
        },
      ],
    },
    {
      title: 'Autres',
      masqued: false,
      priority: 6,
      skills: [
        {
          label: 'Figma',
          iconSrc: '/src/assets/figma.svg',
          description: 'Maquettage',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Algorithme',
          iconSrc: '/src/assets/algo.svg',
          description: 'Conception algorithmique',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Scrum',
          iconSrc: '/src/assets/scrum.png',
          description: 'Gestion de project Agile',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Conception',
          iconSrc: '/src/assets/conception.png',
          description: "Mise en place d'un project",
          stars: 4,
          masqued: false,
        },
        {
          label: 'Analyse statistique',
          iconSrc: '/src/assets/stats.png',
          description: 'Statistique de données',
          stars: 5,
          masqued: false,
        },
        {
          label: 'Ergonomie',
          iconSrc: '/src/assets/ergo.png',
          description: 'Design UI/UX',
          stars: 5,
          masqued: false,
        },
        {
          label: 'JUnit',
          iconSrc: '/src/assets/junit.png',
          description: 'Tests unitaires',
          stars: 2,
          masqued: false,
        },
      ],
    },
  ];

  for (const category of skillCategories) {
    // Vérifier si la catégorie existe déjà
    const existingCategory = await prisma.skillCategory.findFirst({
      where: { title: category.title },
    });

    // Si la catégorie n'existe pas, on la crée
    const skillCategory = existingCategory
      ? existingCategory
      : await prisma.skillCategory.create({
          data: {
            title: category.title,
            priority: category.priority,
            masqued: category.masqued,
          },
        });

    // Insertion des compétences pour chaque catégorie
    for (const skill of category.skills) {
      const existingSkill = await prisma.skill.findFirst({
        where: { title: skill.label },
      });

      if (!existingSkill) {
        // Si la compétence n'existe pas, on l'ajoute
        await prisma.skill.create({
          data: {
            title: skill.label,
            description: skill.description,
            stars: skill.stars,
            iconSrc: skill.iconSrc,
            categoryId: skillCategory.id,
            masqued: category.masqued,
          },
        });
      }
    }
  }

  console.log('Skills and categories seeded successfully');
}
