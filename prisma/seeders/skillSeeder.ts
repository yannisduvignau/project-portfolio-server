import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSkill() {
  // Liste des catégories et compétences
  const skillCategories = [
    {
      title: 'Développement Web',
      title_en: 'Web development',
      slug: 'web_development',
      masqued: false,
      priority: 1,
      skills: [
        {
          title: 'HTML',
          title_en: 'HTML',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/html.svg',
          description: 'Structure page web',
          description_en: 'Web page structure',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'html',
        },
        {
          title: 'CSS',
          title_en: 'CSS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/css.svg',
          description: 'Style page web',
          description_en: 'Web page style',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'css',
        },
        {
          title: 'Bootstrap',
          title_en: 'Bootstrap',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/bootstrap.svg',
          description: 'Style page web',
          description_en: 'Web page style framework',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'bootstrap',
        },
        {
          title: 'Tailwind CSS',
          title_en: 'Tailwind CSS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/tailwind.svg',
          description: 'Style page web',
          description_en: 'Web page style framework',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'tailwind',
        },
        {
          title: 'JS',
          title_en: 'JS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/js.svg',
          description: 'Intéraction',
          description_en: 'Interaction',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'javascript',
        },
        {
          title: 'TS',
          title_en: 'TS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/ts.svg',
          description: 'Intéraction',
          description_en: 'Interaction',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'typescript',
        },
        {
          title: 'Framer motion',
          title_en: 'Framer motion',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/framer.svg',
          description: 'Animation',
          description_en: 'Animation',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'framer_motion',
        },
        {
          title: 'PHP',
          title_en: 'PHP',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/php.svg',
          description: 'Serveur',
          description_en: 'Server',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'php',
        },
        {
          title: 'Ruby',
          title_en: 'Ruby',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/ruby.svg',
          description: 'Serveur',
          description_en: 'Server',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'ruby',
        },
        {
          title: 'MySql',
          title_en: 'MySql',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/mysql.svg',
          description: 'Base de données',
          description_en: 'Database',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'mysql',
        },
        {
          title: 'Postgre Sql',
          title_en: 'Postgre Sql',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/psql.svg',
          description: 'Base de données',
          description_en: 'Database',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'postgresql',
        },
        {
          title: 'Mongo DB',
          title_en: 'Mongo DB',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/mongodb.svg',
          description: 'Base de données',
          description_en: 'Database',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'mongodb',
        },
      ],
    },
    {
      title: 'Développement Applicatif',
      title_en: 'App Development',
      masqued: false,
      priority: 1,
      slug: 'app_development',
      skills: [
        {
          title: 'C++',
          title_en: 'C++',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/cpp.png',
          description: 'Programmation logiciel',
          description_en: 'Software programming',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'cpp',
        },
        {
          title: 'C',
          title_en: 'C',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/c.png',
          description: 'Programmation système',
          description_en: 'System programming',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'c',
        },
        {
          title: 'C#',
          title_en: 'C#',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/cs.png',
          description: 'Programmation logiciel',
          description_en: 'Software programming',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'csharp',
        },
        {
          title: 'Python',
          title_en: 'Python',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/python.svg',
          description: 'Programmation de scripts',
          description_en: 'Script programming',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'python',
        },
        {
          title: 'JAVA',
          title_en: 'JAVA',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/java.svg',
          description: 'Programmation logiciel',
          description_en: 'Software programming',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'java',
        },
        {
          title: 'Android',
          title_en: 'Android',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/android.svg',
          description: 'Programmation mobile',
          description_en: 'Mobile programming',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'android',
        },
      ],
    },
    {
      title: 'Frameworks',
      title_en: 'Frameworks',
      masqued: false,
      priority: 1,
      slug: 'frameworks',
      skills: [
        {
          title: 'Angular JS',
          title_en: 'Angular JS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/angular.svg',
          description: 'Framework JS',
          description_en: 'JS Framework',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'angularjs',
        },
        {
          title: 'React JS',
          title_en: 'React JS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/react.svg',
          description: 'Framework JS',
          description_en: 'JS Framework',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'reactjs',
        },
        {
          title: 'Laravel',
          title_en: 'Laravel',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/laravel.svg',
          description: 'Framework PHP',
          description_en: 'PHP Framework',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'laravel',
        },
        {
          title: 'QT',
          title_en: 'QT',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/qt.svg',
          description: 'Framework C++',
          description_en: 'C++ Framework',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'qt',
        },
        {
          title: 'FastApi',
          title_en: 'FastApi',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/fastapi.svg',
          description: 'Framework Python',
          description_en: 'Python Framework',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'fastapi',
        },
        {
          title: 'Flutter',
          title_en: 'Flutter',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/flutter.svg',
          description: 'Framework Mobile',
          description_en: 'Mobile Framework',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'flutter',
        },
        {
          title: 'Rails',
          title_en: 'Rails',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/rails.svg',
          description: 'Framework Ruby',
          description_en: 'Ruby Framework',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'rails',
        },
        {
          title: 'Jest JS',
          title_en: 'Jest JS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/jest.webp',
          description: 'Framework de Tests',
          description_en: 'Testing Framework',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'jestjs',
        },
        {
          title: 'Nest JS',
          title_en: 'Nest JS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/nest.png',
          description: 'Framework JS',
          description_en: 'JS Framework',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'nestjs',
        },
      ],
    },
    {
      title: 'Outils de développement',
      title_en: 'Development tools',
      masqued: false,
      priority: 1,
      slug: 'development_tools',
      skills: [
        {
          title: 'Git',
          title_en: 'Git',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/git.svg',
          description: 'Versionnage du code',
          description_en: 'Code versionning',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'git',
        },
        {
          title: 'Docker',
          title_en: 'Docker',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/docker.svg',
          description: 'Conteneur virtuel',
          description_en: 'Virtual containers',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'docker',
        },
        {
          title: 'VSCode',
          title_en: 'VSCode',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/vscode.svg',
          description: 'IDE',
          description_en: 'IDE',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'vscode',
        },
        {
          title: 'IntelliJ',
          title_en: 'IntelliJ',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/intellij.svg',
          description: 'IDE',
          description_en: 'IDE',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'intellij',
        },
        {
          title: 'Postman',
          title_en: 'Postman',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/postman.svg',
          description: 'Requetteur HTTP',
          description_en: 'HTTP requestor',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'postman',
        },
        {
          title: 'AWS',
          title_en: 'AWS',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/aws.svg',
          description: 'Service CLOUD',
          description_en: 'CLOUD service',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'aws',
        },
      ],
    },
    {
      title: 'Cybersécurité',
      title_en: 'Cybersecurity',
      masqued: false,
      priority: 1,
      slug: 'cybersecurity',
      skills: [
        {
          title: 'Wireshark',
          title_en: 'Wireshark',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/wireshark.svg',
          description: 'Analyse du trafic réseau',
          description_en: 'Network traffic analysis',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'wireshark',
        },
        {
          title: 'Console',
          title_en: 'Console',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/cmd.svg',
          description: 'Ligne de commande',
          description_en: 'Command line',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'console',
        },
        {
          title: 'Burp Suite',
          title_en: 'Burp Suite',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/burpsuite.svg',
          description: 'Tests de pénétration',
          description_en: 'Pentest',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'burpsuite',
        },
        {
          title: 'NMap',
          title_en: 'NMap',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/nmap.svg',
          description: 'Ligne de commande',
          description_en: 'Command line',
          stars: 3,
          masqued: false,
          priority: 1,
          slug: 'nmap',
        },
        {
          title: 'OWASP',
          title_en: 'OWASP',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/owasp.svg',
          description: 'Tests de pénétration',
          description_en: 'Pentest',
          stars: 0,
          masqued: false,
          priority: 1,
          slug: 'owasp',
        },
        {
          title: 'Metasploit',
          title_en: 'Metasploit',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/metasploit.png',
          description: 'Tests de pénétration',
          description_en: 'Pentest',
          stars: 0,
          masqued: false,
          priority: 1,
          slug: 'metasploit',
        },
        {
          title: 'OSINT',
          title_en: 'OSINT',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/osint.png',
          description: "Collecte d'informations",
          description_en: 'Information gathering',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'osint',
        },
        {
          title: 'Cryptographie',
          title_en: 'Cryptography',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/crypto.png',
          description: 'Méthodes de cryptage',
          description_en: 'Encryption methods',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'cryptography',
        },
        {
          title: 'XSSi',
          title_en: 'XSSi',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/xssi.svg',
          description: 'Cross-Site Script Inclusion',
          description_en: 'Cross-Site Script Inclusion',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'xssi',
        },
        {
          title: 'SQLi',
          title_en: 'SQLi',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/sqli.svg',
          description: 'SQL injection',
          description_en: 'SQL injection',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'sqli',
        },
        {
          title: 'CSRF',
          title_en: 'CSRF',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/csrf.svg',
          description: 'Cross Site Request Forgery',
          description_en: 'Cross Site Request Forgery',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'csrf',
        },
        {
          title: 'Privilege escalation',
          title_en: 'Privilege escalation',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/pe.png',
          description: 'Obtenir un accès privilégié',
          description_en: 'Obtain privileged access',
          stars: 5,
          masqued: true,
          priority: 1,
          slug: 'privilege escalation',
        },
        {
          title: 'Social engineering',
          title_en: 'Social engineering',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/se.svg',
          description: 'Manipulation psychologique',
          description_en: 'Psychological manipulation',
          stars: 5,
          masqued: true,
          priority: 1,
          slug: 'social_engineering',
        },
        {
          title: 'ARP Spoofing',
          title_en: 'ARP Spoofing',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/arp.png',
          description: 'Manipulation des caches',
          description_en: 'Handling caches',
          stars: 5,
          masqued: true,
          priority: 1,
          slug: 'arp_spoofing',
        },
      ],
    },
    {
      title: 'Autres',
      title_en: 'Others',
      masqued: false,
      priority: 1,
      slug: 'others',
      skills: [
        {
          title: 'Figma',
          title_en: 'Figma',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/figma.svg',
          description: 'Maquettage',
          description_en: 'Mock-up',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'figma',
        },
        {
          title: 'Algorithme',
          title_en: 'Algorithm',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/algo.svg',
          description: 'Conception algorithmique',
          description_en: 'Algorithmic design',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'algorithme',
        },
        {
          title: 'Scrum',
          title_en: 'Scrum',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/scrum.png',
          description: 'Gestion de project Agile',
          description_en: 'Agile project management',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'scrum',
        },
        {
          title: 'Conception',
          title_en: 'Conception',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/conception.png',
          description: "Mise en place d'un project",
          description_en: 'Setting up a project',
          stars: 4,
          masqued: false,
          priority: 1,
          slug: 'conception',
        },
        {
          title: 'Analyse statistique',
          title_en: 'Statistical analysis',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/stats.png',
          description: 'Statistiques de données',
          description_en: 'Data statistics',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'statistical_analysis',
        },
        {
          title: 'Ergonomie',
          title_en: 'Ergonomics',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/ergo.png',
          description: 'Design UI/UX',
          description_en: 'UI/UX design',
          stars: 5,
          masqued: false,
          priority: 1,
          slug: 'ergonomics',
        },
        {
          title: 'JUnit',
          title_en: 'JUnit',
          iconSrc:
            'https://gfndzciwqmgwfyrvaxir.supabase.co/storage/v1/object/public/portfolio-images/junit.png',
          description: 'Tests unitaires',
          description_en: 'Unit testing',
          stars: 2,
          masqued: false,
          priority: 1,
          slug: 'junit',
        },
      ],
    },
  ];

  try {
    for (const category of skillCategories) {
      const skillCategory = await prisma.skillCategory.upsert({
        where: { slug: category.slug },
        update: {
          title: category.title,
          title_en: category.title_en,
          slug: category.slug,
          priority: category.priority,
          masqued: category.masqued,
        },
        create: {
          title: category.title,
          title_en: category.title_en,
          slug: category.slug,
          priority: category.priority,
          masqued: category.masqued,
        },
      });

      for (const skill of category.skills) {
        await prisma.skill.upsert({
          where: { slug: skill.slug },
          update: {
            title: skill.title,
            title_en: skill.title_en,
            slug: skill.slug,
            description: skill.description,
            description_en: skill.description_en,
            stars: skill.stars,
            iconSrc: skill.iconSrc,
            categoryId: skillCategory.id,
            masqued: skill.masqued,
          },
          create: {
            title: skill.title,
            title_en: skill.title_en,
            slug: skill.slug,
            description: skill.description,
            description_en: skill.description_en,
            stars: skill.stars,
            iconSrc: skill.iconSrc,
            categoryId: skillCategory.id,
            masqued: skill.masqued,
          },
        });
      }
    }

    console.log('✅ Skills and categories seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding Skills:', error);
  } finally {
    await prisma.$disconnect();
  }
}
