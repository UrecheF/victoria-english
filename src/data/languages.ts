export type LanguageLesson = {
  id: string;
  title: string;
  phrase: string;
  translation: string;
};

export type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  greeting: string;
  translation: string;
  color: string;
  lessons: LanguageLesson[];
};

export const languageOptions: LanguageOption[] = [
  { code:'en', name:'English', nativeName:'English', flag:'🇺🇸', greeting:'Hello!', translation:'¡Hola!', color:'#5B7CFF', lessons:[
    {id:'greetings',title:'Greetings',phrase:'Good morning, everyone!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'My Family',phrase:'This is my family.',translation:'Esta es mi familia.'},
    {id:'animals',title:'Animals',phrase:'The turtle is green.',translation:'La tortuga es verde.'},
  ]},
  { code:'fr', name:'French', nativeName:'Français', flag:'🇫🇷', greeting:'Bonjour !', translation:'¡Buenos días!', color:'#496CF2', lessons:[
    {id:'greetings',title:'Salutations',phrase:'Bonjour, tout le monde !',translation:'¡Buenos días a todos!'},
    {id:'family',title:'Ma famille',phrase:'Voici ma famille.',translation:'Esta es mi familia.'},
    {id:'animals',title:'Les animaux',phrase:'La tortue est verte.',translation:'La tortuga es verde.'},
  ]},
  { code:'it', name:'Italian', nativeName:'Italiano', flag:'🇮🇹', greeting:'Ciao!', translation:'¡Hola!', color:'#20B66D', lessons:[
    {id:'greetings',title:'Saluti',phrase:'Buongiorno a tutti!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'La mia famiglia',phrase:'Questa è la mia famiglia.',translation:'Esta es mi familia.'},
    {id:'animals',title:'Gli animali',phrase:'La tartaruga è verde.',translation:'La tortuga es verde.'},
  ]},
  { code:'es', name:'Spanish', nativeName:'Español', flag:'🇪🇸', greeting:'¡Hola!', translation:'Hello!', color:'#FFB21A', lessons:[
    {id:'greetings',title:'Saludos',phrase:'¡Buenos días a todos!',translation:'Good morning, everyone!'},
    {id:'family',title:'Mi familia',phrase:'Esta es mi familia.',translation:'This is my family.'},
    {id:'animals',title:'Animales',phrase:'La tortuga es verde.',translation:'The turtle is green.'},
  ]},
  { code:'de', name:'German', nativeName:'Deutsch', flag:'🇩🇪', greeting:'Hallo!', translation:'¡Hola!', color:'#202B3D', lessons:[
    {id:'greetings',title:'Begrüßungen',phrase:'Guten Morgen zusammen!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'Meine Familie',phrase:'Das ist meine Familie.',translation:'Esta es mi familia.'},
    {id:'animals',title:'Tiere',phrase:'Die Schildkröte ist grün.',translation:'La tortuga es verde.'},
  ]},
  { code:'pt', name:'Portuguese', nativeName:'Português', flag:'🇧🇷', greeting:'Olá!', translation:'¡Hola!', color:'#27A74A', lessons:[
    {id:'greetings',title:'Saudações',phrase:'Bom dia a todos!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'Minha família',phrase:'Esta é a minha família.',translation:'Esta es mi familia.'},
    {id:'animals',title:'Animais',phrase:'A tartaruga é verde.',translation:'La tortuga es verde.'},
  ]},
  { code:'zh', name:'Chinese', nativeName:'中文', flag:'🇨🇳', greeting:'你好！', translation:'¡Hola!', color:'#E84545', lessons:[
    {id:'greetings',title:'问候',phrase:'大家早上好！',translation:'¡Buenos días a todos!'},
    {id:'family',title:'我的家人',phrase:'这是我的家人。',translation:'Esta es mi familia.'},
    {id:'animals',title:'动物',phrase:'乌龟是绿色的。',translation:'La tortuga es verde.'},
  ]},
  { code:'ja', name:'Japanese', nativeName:'日本語', flag:'🇯🇵', greeting:'こんにちは！', translation:'¡Hola!', color:'#F25A72', lessons:[
    {id:'greetings',title:'あいさつ',phrase:'みなさん、おはようございます！',translation:'¡Buenos días a todos!'},
    {id:'family',title:'家族',phrase:'これは私の家族です。',translation:'Esta es mi familia.'},
    {id:'animals',title:'動物',phrase:'カメは緑色です。',translation:'La tortuga es verde.'},
  ]},
  { code:'ko', name:'Korean', nativeName:'한국어', flag:'🇰🇷', greeting:'안녕하세요!', translation:'¡Hola!', color:'#4764D8', lessons:[
    {id:'greetings',title:'인사',phrase:'여러분, 좋은 아침이에요!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'가족',phrase:'이것은 제 가족이에요.',translation:'Esta es mi familia.'},
    {id:'animals',title:'동물',phrase:'거북이는 초록색이에요.',translation:'La tortuga es verde.'},
  ]},
  { code:'ar', name:'Arabic', nativeName:'العربية', flag:'🇸🇦', greeting:'مرحباً!', translation:'¡Hola!', color:'#168A63', lessons:[
    {id:'greetings',title:'التحيات',phrase:'صباح الخير جميعاً!',translation:'¡Buenos días a todos!'},
    {id:'family',title:'عائلتي',phrase:'هذه عائلتي.',translation:'Esta es mi familia.'},
    {id:'animals',title:'الحيوانات',phrase:'السلحفاة خضراء.',translation:'La tortuga es verde.'},
  ]},
];

export const getLanguage = (code?: string) => languageOptions.find((item) => item.code === code) ?? languageOptions[0];
