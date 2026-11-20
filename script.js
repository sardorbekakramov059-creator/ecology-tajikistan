/* Экологияи Тоҷикистон — версияи навшуда */
'use strict';

// Расми захиравӣ: агар манбаи акс бор нашавад, broken-image намоиш намеёбад.
document.addEventListener('error', function (event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  if (image.dataset.fallbackApplied === '1') return;
  image.dataset.fallbackApplied = '1';
  image.src = 'assets/image-unavailable.svg';
}, true);

const pageNames = {
  home:'Асосӣ', vaziyat:'Вазъияти экологӣ', mushkilot:'Мушкилоти экологӣ',
  rohihall:'Роҳҳои ҳал', hayvonot:'Ҳайвоноти нодир', gallery:'Галерея',
  xarita:'Харитаи экологӣ', navigariho:'Навигариҳо', tamos:'Тамос'
};
const imageSources = {
  iskander:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Tajikistan._Iskander-Kul.jpg/1280px-Tajikistan._Iskander-Kul.jpg',
  fedchenko:'https://upload.wikimedia.org/wikipedia/commons/e/ee/Fedchenko_Glacier.jpg',
  sarez:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Lake_Sarez%2C_Tajikistan_%282077%29.jpg/1280px-Lake_Sarez%2C_Tajikistan_%282077%29.jpg',
  nurek:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nurek_Reservoir%2C_Tajikistan.jpg/1280px-Nurek_Reservoir%2C_Tajikistan.jpg',
  karakul:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Karakul_lake_Tajikistan.jpg/1280px-Karakul_lake_Tajikistan.jpg',
  tigrovaya:'https://commons.wikimedia.org/wiki/Special:FilePath/Tigrovaya_Balka_Elaeagnus_Grove.jpg?width=1000',
  pamir:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Pamir_Mountains_%286%29.jpg/1280px-Pamir_Mountains_%286%29.jpg'
};

const detailData = {
  water:{parent:'vaziyat',title:'Захираҳои об ва дарёҳои Тоҷикистон',lede:'Дарёҳои Панҷ, Вахш, Зарафшон ва Сирдарё қисми муҳими низоми обии Осиёи Марказӣ мебошанд.',sections:[
    ['Нақши об','Мувофиқи Вазорати корҳои хориҷии Тоҷикистон, тақрибан 60 фоизи захираҳои обии Осиёи Марказӣ дар қаламрави Тоҷикистон ташаккул меёбанд. Ин мафҳум ба захираҳои минтақа дахл дорад, на ба фоизи оби ошомидании ҳамаи сокинон.'],
    ['Кӯлҳо ва дарёҳо','FAO аз тақрибан 1 300 кӯли Тоҷикистон ёд мекунад. Дарёҳои Панҷ ва Вахш ба ҳавзаи Амударё, Зарафшон ба ҳавзаи Зарафшон ва Сирдарё ба ҳавзаи Сирдарё тааллуқ доранд.'],
    ['Идоракунии устувор','Муҳофизати сарчашмаҳои об, мониторинги сифати об, сарфаи оби обёрӣ ва ҳамкории фаромарзӣ барои устувории захираҳо муҳиманд.']
  ],fact:'60% — ҳиссаи захираҳои обии Осиёи Марказӣ, ки дар Тоҷикистон ташаккул меёбанд. Манбаъ: Вазорати корҳои хориҷии ҶТ.',source:'https://mfa.tj/en/main/view/826/statement-by-the-president-of-tajikistan-at-the-world-water-forum'},
  glaciers:{parent:'vaziyat',title:'Пиряхи Федченко ва пиряхҳои Тоҷикистон',lede:'Пиряхҳо барои нигоҳдории захираи об ва танзими ҷараёни мавсимии дарёҳо аҳаммияти калон доранд.',sections:[
    ['Шумора ва майдон','UNEP дар Атласи соли 2025 менависад, ки Тоҷикистон дар даҳсолаҳои охир тақрибан 14 000 пирях дошт ва зиёда аз 1 000-тои онҳо пурра аз байн рафтаанд. Ин рақам аз маълумоти ҷамъбастии шаш даҳсолаи миллӣ ва моҳворавӣ гирифта шудааст.'],
    ['Тағйирёбии иқлим','UNEP афзоиши миёнаи ҳарорати солонаи Тоҷикистонро аз сатҳи муқоисавии гузашта 1,2°C арзёбӣ мекунад. Гармшавӣ ба тавозуни массаи пиряхҳо ва вақти обшавии барфу ях таъсир мерасонад.'],
    ['Чӣ бояд кард','Мониторинги доимии пиряхҳо, пешгӯии ҷараёни об, ҳифзи обанборҳо ва омодагӣ ба селу обхезӣ барои мутобиқшавӣ муҳиманд.']
  ],fact:'Зиёда аз 1 000 пирях дар даҳсолаҳои охир аз байн рафтааст (UNEP, 2 сентябри 2025).',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  forests:{parent:'vaziyat',title:'Ҷангалҳо ва экосистемаҳои Тоҷикистон',lede:'Кишвар ҳам ҷангалҳои кӯҳии арча ва ҳам ҷангалҳои туғайи водиҳои ҷанубиро дар бар мегирад.',sections:[
    ['Ҷангалҳои кӯҳӣ','Дар қаторкӯҳҳои Тоҷикистон арчазорҳо, буттазорҳо ва марғзорҳои баландкӯҳ ҷой доранд. Онҳо барои устувории хок, гуногунии биологӣ ва нигоҳ доштани об муҳиманд.'],
    ['Ҷангалҳои туғай','Мамнуъгоҳи давлатии «Бешаи палангон» дар ҷануби кишвар бо экосистемаҳои туғайи назди дарёӣ маъруф аст. Ин макони муҳофизатшаванда барои ҳифзи растаниҳо ва ҳайвоноти водии Вахш аҳаммият дорад.'],
    ['Ҳифз','Истифодаи устувори ҳезум, барқарорсозии растанипӯш, пешгирии сӯхтор ва идоракунии чарогоҳҳо аз тадбирҳои асосӣ мебошанд.']
  ],fact:'Тибқи UNEP, минтақаҳои муҳофизатшаванда соли 2023 21,6% ҳудуди Тоҷикистонро фаро гирифта буданд.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  hydropower:{parent:'vaziyat',title:'Энергияи обӣ ва амнияти энергетикӣ',lede:'Нерӯгоҳҳои обӣ дар истеҳсоли нерӯи барқи Тоҷикистон нақши асосӣ доранд.',sections:[
    ['Ҳиссаи нерӯи обӣ','UNEP нишон медиҳад, ки нерӯи обӣ то 95 фоизи барқи Тоҷикистонро таъмин мекунад. Ин нишондиҳанда ба сохтори тавлиди нерӯи барқ дахл дорад, на ба ҳамаи навъҳои энергия дар иқтисод.'],
    ['Норак ва Вахш','Нерӯгоҳи Норак дар дарёи Вахш ва обанбори он яке аз иншооти муҳимми энергетикии кишвар аст. Идоракунии обанбор бояд эҳтиёҷоти энергетикӣ, обёрӣ ва амнияти поёнобро ба назар гирад.'],
    ['Хавфҳо','Тағйирёбии ҷараёни об дар натиҷаи иқлим, таҳшиншавии обанборҳо ва зарурати нигоҳдории иншоот ба банақшагирии дарозмуддат таъсир мерасонанд.']
  ],fact:'То 95% барқи Тоҷикистон аз нерӯи обӣ таъмин мешавад (UNEP, 2025).',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  'glacier-loss':{parent:'mushkilot',title:'Обшавии пиряхҳо ва оқибатҳои он',lede:'Коҳиши пиряхҳо метавонад мавсимияти ҷараёни обро тағйир диҳад ва хатарҳои табииро пурзӯр кунад.',sections:[
    ['Далели мушоҳидашуда','UNEP дар соли 2025 хабар дод, ки зиёда аз 1 000 пиряхи Тоҷикистон дар даҳсолаҳои охир пурра аз байн рафтааст. Атлас афзоиши ҳарорати миёнаро 1,2°C нишон медиҳад.'],
    ['Таъсир ба мардум','Тағйирёбии захираи барфу ях метавонад ба обёрӣ, истеҳсоли барқи обӣ, дастрасии об ва хатари селу ярч таъсир расонад. Хавф дар ҳавзаҳои гуногун яксон нест.'],
    ['Мониторинг','Муқоисаи аксҳои моҳворавӣ, андозагирии массаи пирях, барфсанҷӣ ва ченкунии ҷараёни дарёҳо барои арзёбии воқеӣ заруранд.']
  ],fact:'Пиряхҳои нобудшуда: зиёда аз 1 000-то дар даҳсолаҳои охир, тибқи UNEP.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  'urban-air':{parent:'mushkilot',title:'Сифати ҳаво дар шаҳрҳои Тоҷикистон',lede:'Барои арзёбии олудашавии ҳаво бояд ченкунии PM2.5, PM10 ва газҳои ифлоскунанда истифода шавад.',sections:[
    ['Манбаъҳои имконпазир','Нақлиёти роҳ, фаъолияти саноатӣ, гармидиҳии хонаҳо, сӯзиши сӯзишворӣ ва чангу ғубори табиӣ метавонанд ба сифати ҳаво таъсир расонанд. Саҳми ҳар манбаъ бояд бо маълумоти ченкунӣ муайян шавад.'],
    ['Ченкунии дуруст','Нишондиҳандаҳои AQI ё PM бояд бо ҷой, сана, давомнокии ченкунӣ ва навъи сенсор нишон дода шаванд. Аз ин сабаб, дар сомона рақами фоизии бе манбаъ истифода намешавад.'],
    ['Коҳиш додани таъсир','Нақлиёти ҷамъиятии самаранок, назорати партовҳои саноатӣ, гармидиҳии тоза ва сабзкорӣ аз тадбирҳои муфиданд.']
  ],fact:'Дар ин портал рақами миллӣ бе силсилаи ченкунии санҷидашуда пешниҳод намешавад.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  waste:{parent:'mushkilot',title:'Партовҳо ва идоракунии онҳо',lede:'Идоракунии партов танҳо ҷамъоварӣ нест: он ҷудокунӣ, коркард, интиқол ва безараргардониро низ дар бар мегирад.',sections:[
    ['Чӣ мушкил аст','Омехта партофтани партовҳо имкони истифодаи такрориро кам карда, ба хок, об ва манзара таъсир мерасонад. Пластик ва дигар маводҳои дертаҷзияшаванда метавонанд муддати дароз дар муҳит боқӣ монанд.'],
    ['Тадбирҳои амалӣ','Ҷудокунии коғаз, шиша ва пластик; кам кардани маҳсулоти яккарата; компост кардани партовҳои органикӣ; ва супоридани мавод ба коркардкунандагони боэътимод.'],
    ['Омор','Барои нашри тоннаҳои солона ҳисоботи расмӣ бо соли ҳисоботӣ, фарогирии минтақа ва усули ҳисоб лозим аст. Сомона рақами сохтаро истифода намекунад.']
  ],fact:'Омори дақиқи партов бояд аз ҳисоботи расмии соли муайян гирифта шавад.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  'soil-erosion':{parent:'mushkilot',title:'Эрозияи хок ва таназзули замин',lede:'Нишебиҳои кӯҳӣ ба боришоти шадид, камшавии растанипӯш ва истифодаи нодурусти чарогоҳ ҳассос мебошанд.',sections:[
    ['Сабабҳои умумӣ','Чаронидани аз ҳад зиёд, буридани растанӣ, коркарди нодурусти замин ва роҳсозӣ дар нишебиҳо метавонанд эрозияро пурзӯр кунанд.'],
    ['Оқибатҳо','Шуста шудани қабати ҳосилхез, таҳшиншавии маҷрои дарёҳо ва афзоиши хавфи баъзе ярчҳо метавонанд ба заминҳои кишоварзӣ ва инфрасохтор осеб расонанд.'],
    ['Пешгирӣ','Идоракунии чарогоҳ, террасасозии мувофиқ, барқарорсозии растанипӯш ва нигоҳ доштани минтақаҳои соҳилӣ аз тадбирҳои асосӣ мебошанд.']
  ],fact:'Сатҳи хавф бояд барои ҳар ноҳия алоҳида арзёбӣ шавад; як фоизи умумӣ дуруст нест.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  solar:{parent:'rohihall',title:'Нерӯи офтобӣ дар ҷамоатҳои дурдаст',lede:'Системаҳои офтобӣ метавонанд дастрасӣ ба барқро пурра ё қисман дастгирӣ кунанд, аммо тарҳрезии маҳаллӣ лозим аст.',sections:[
    ['Арзёбии пешакӣ','Миқдори нури офтоб, фасл, барф, дастрасии қисмҳои эҳтиётӣ ва талаботи барқи бино бояд ҳисоб карда шавад.'],
    ['Истифодаи мувофиқ','Мактабҳо, нуқтаҳои тиббӣ, алоқа ва хонаҳои дур аз шабака метавонанд аз системаҳои хурди офтобӣ баҳра баранд.'],
    ['Масъулияти экологӣ','Батареяҳо ва панелҳои фарсуда бояд ба ҷамъоварӣ ва коркарди махсус супорида шаванд.']
  ],fact:'Пеш аз сармоягузорӣ ҳисоб кардани арзиши тамоми давраи истифода муҳим аст.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  restoration:{parent:'rohihall',title:'Барқарорсозии ҷангал ва чарогоҳ',lede:'Барномаи сабзкорӣ бояд зиндамонии ниҳол ва таъсири воқеиро чен кунад, на танҳо шумораи ниҳолҳои шинондашударо.',sections:[
    ['Навъҳои маҳаллӣ','Интихоби навъ бояд ба баландӣ, намнокӣ, навъи хок ва иқлими маҳал мувофиқат кунад.'],
    ['Нигоҳубин','Обёрӣ дар давраи аввал, муҳофизат аз чорво ва назорати сабзиш имкони зинда мондани ниҳолро зиёд мекунанд.'],
    ['Натиҷагирӣ','Меъёри зиндамонӣ пас аз якчанд мавсим, майдони барқароршуда ва тағйири ҳолати хокро чен кардан лозим аст.']
  ],fact:'Барқарорсозии табиӣ ва нигоҳубини баъдӣ баробари шинонидан муҳиманд.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  recycling:{parent:'rohihall',title:'Ҷудокунии партов ва коркарди такрорӣ',lede:'Истифодаи такрорӣ аз он оғоз мешавад, ки партовҳо аз манбаъ дуруст ҷудо карда шаванд.',sections:[
    ['Ҷудокунии мавод','Коғаз, шиша, металл, пластик ва партови органикӣ метавонанд ба ҷараёнҳои гуногуни идоракунӣ ҷудо карда шаванд.'],
    ['Инфрасохтор','Қуттиҳои ранга танҳо вақте самараноканд, ки ҷамъоварии ҷудогона ва коркардкунанда воқеан вуҷуд дошта бошад.'],
    ['Чен кардани натиҷа','Вазни маводи қабулшуда ва коркардшуда бояд алоҳида сабт шавад, то нишондиҳандаҳо дуруст бошанд.']
  ],fact:'Пеш аз эълони фоизи коркард, манбаи маълумот ва соли ҳисоботро нишон диҳед.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  'clean-transport':{parent:'rohihall',title:'Нақлиёти шаҳрии камифлос',lede:'Коҳиши ифлосшавии шаҳр бо нақлиёти ҷамъиятӣ, ҳаракати фаъол ва мониторинги партовҳо алоқаманд аст.',sections:[
    ['Нақлиёти ҷамъиятӣ','Автобусҳои самаранок, хатсайрҳои мувофиқ ва нигоҳдории мунтазам метавонанд истифодаи мошини шахсиро кам кунанд.'],
    ['Пиёдагардӣ ва велосипед','Роҳҳои бехатар ва пайваста барои пиёдагардону велосипедронҳо сафарҳои кӯтоҳро бе мошин имконпазир мекунанд.'],
    ['Мониторинг','Натиҷа бояд бо шумораи сафарҳо, сифати ҳаво ва таркиби парк чен карда шавад.']
  ],fact:'Нақлиёти барқӣ низ ба идоракунии батарея ва манбаи тавлиди барқ ниёз дорад.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  'snow-leopard':{parent:'hayvonot',title:'Паланги барфӣ (ирбис)',lede:'Паланги барфӣ яке аз намудҳои хоси экосистемаҳои баландкӯҳи Помир ва Ҳисор мебошад.',sections:[
    ['Муҳити зист','Ин гурбаи калон дар нишебиҳои баландкӯҳ ва релефи санглох зиндагӣ мекунад. Дастрасии сайд ва пайвастагии маконҳои зист барои он муҳиманд.'],
    ['Таҳдидҳо','Тақсимшавии муҳити зист, коҳиши ҳайвоноти шикорӣ ва бархӯрди инсон бо ҳайвоноти ваҳшӣ метавонанд ба популятсия таъсир расонанд.'],
    ['Муҳофизат','Назорати шикори ғайриқонунӣ, ҳамкорӣ бо ҷамоатҳои маҳаллӣ ва мониторинги илмӣ муҳиманд.']
  ],fact:'Ин сомона саршумори миллиро бе ҳисоботи расмии нав нишон намедиҳад.',source:'https://www.icimod.org/wp-content/uploads/2019/12/Zorkul-Nature-Reserve.pdf'},
  argali:{parent:'hayvonot',title:'Арғалӣ — гӯсфанди Марко Поло',lede:'Арғалӣ (Ovis ammon polii) дар минтақаҳои баландкӯҳи Помири шарқӣ, аз ҷумла муҳити Зоркӯл, зикр мешавад.',sections:[
    ['Муҳити зист','Арғалӣ нишебиҳои баландкӯҳ ва чарогоҳҳои кушодро истифода мебарад. Он бо экосистемаҳои баландкӯҳи Помир алоқаманд аст.'],
    ['Муҳофизат','Ҳифзи макони зист, идоракунии чарогоҳ ва пешгирии шикори ғайриқонунӣ барои нигоҳ доштани популятсия зарур аст.'],
    ['Мониторинг','Шумора бояд бо тадқиқоти саҳроӣ ва методикаи муайян чен карда шавад; рақамҳои кӯҳна ё бе манбаъро ҳамчун маълумоти нав нишон додан дуруст нест.']
  ],fact:'Зоркӯл ҳамчун минтақаи муҳимми зисти арғалӣ (Marco Polo sheep) дар маълумоти ICIMOD зикр шудааст.',source:'https://www.icimod.org/wp-content/uploads/2019/12/Zorkul-Nature-Reserve.pdf'},
  'brown-bear':{parent:'hayvonot',title:'Хирси қаҳваранг',lede:'Хирси қаҳваранг дар баъзе экосистемаҳои кӯҳии минтақа зиндагӣ мекунад.',sections:[
    ['Нақш дар табиат','Хирс ҳайвони ҳамаҷонибахӯр буда, дар шабакаи ғизоии экосистемаҳои кӯҳӣ нақш дорад.'],
    ['Ҳифзи макон','Пайвастагии ҷангалу дараҳо, кам кардани партовҳои ғизоӣ дар наздикии макони зист ва пешгирии таъқиби ҳайвон муҳим аст.'],
    ['Рафтори бехатар','Ҳангоми дидани ҳайвони ваҳшӣ масофаро нигоҳ доред ва ба он наздик нашавед ё ғизо надиҳед.']
  ],fact:'Сомона шумораи миллӣ ё вазъи ҳуқуқии намудро бе манбаи расмӣ дақиқ эълон намекунад.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  'golden-eagle':{parent:'hayvonot',title:'Уқоби тиллоӣ',lede:'Уқоби тиллоӣ яке аз паррандаҳои шикории минтақаҳои кӯҳӣ аст.',sections:[
    ['Муҳити зист','Қояҳо ва майдонҳои кушод барои лонасозӣ ва шикори ин парранда аҳаммият доранд.'],
    ['Таҳдидҳо','Осеб дидани макони лона, нооромии инсон ва заҳролудшавии ғайримустақим метавонад ба паррандаҳои шикорӣ таъсир расонад.'],
    ['Муҳофизат','Ҳифзи макони лона, кам кардани халалрасонӣ ва мушоҳидаи илмӣ муҳиманд.']
  ],fact:'Акс ё саршумори маҳаллӣ танҳо баъд аз тасдиқи манбаи саҳроӣ бояд илова шавад.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  wolf:{parent:'hayvonot',title:'Гурги хокистарӣ',lede:'Гург як қисми табиии низоми ғизоии экосистемаҳои кӯҳистонӣ мебошад.',sections:[
    ['Нақши экологӣ','Даррандаҳои калон ба танзими популятсияи ҳайвоноти шикорӣ мусоидат мекунанд.'],
    ['Ҳамзистӣ','Муҳофизати чорво бо усулҳои ғайриосебрасон ва паст кардани партовҳои ғизоӣ метавонад муноқишаи одамон ва ҳайвоноти ваҳширо кам кунад.'],
    ['Маълумоти намуд','Тасниф ва вазъи муҳофизат бояд бо Китоби Сурхи миллӣ ва маълумоти илмии нав санҷида шаванд.']
  ],fact:'Ин ҷо рақами саршумор оварда намешавад, зеро сарчашмаи омории нав муайян нашудааст.',source:'https://www.fao.org/tajikistan/tajikistan-at-a-glance/en'},
  'bukhara-deer':{parent:'hayvonot',title:'Оҳуи бухороӣ',lede:'Оҳуи бухороӣ бо ҷангалҳои туғайи водиҳои Осиёи Марказӣ алоқаманд аст.',sections:[
    ['Муҳити зист','Ҷангалҳои туғайи соҳили дарёҳо паноҳгоҳ, ғизо ва роҳҳои ҳаракати ин намудро таъмин мекунанд.'],
    ['Таҳдидҳо','Коҳиши ҷангалҳои соҳилӣ, тағйири режими об ва пароканда шудани муҳити зист метавонанд ба намуд таъсир расонанд.'],
    ['Ҳифз','Муҳофизати минтақаҳои соҳилӣ ва пайваст кардани маконҳои зист барои барқароршавии ҳайвонот аҳаммият доранд.']
  ],fact:'Бешаи палангон яке аз минтақаҳои муҳофизатшавандаи ҷануби Тоҷикистон аст.',source:'https://commons.wikimedia.org/wiki/Category:Tigrovaya_balka'},
  'climate-atlas':{parent:'navigariho',title:'Атласи UNEP оид ба тағйирёбии муҳити зист',lede:'UNEP 2 сентябри соли 2025 Атласи тағйирёбии муҳити зисти Тоҷикистонро муаррифӣ кард.',sections:[
    ['Гармшавӣ','Атлас баландшавии ҳарорати миёнаи солонаи Тоҷикистонро 1,2°C арзёбӣ мекунад ва онро бо сатҳи муқоисавии глобалӣ муқоиса менамояд.'],
    ['Пиряхҳо','Аз тақрибан 14 000 пиряхи дар даҳсолаҳои охир вуҷуддошта, зиёда аз 1 000-то пурра аз байн рафтаанд.'],
    ['Захираҳои об','UNEP таъкид мекунад, ки идоракунии ҳамгирои захираҳои об ва ҳамкории фаромарзӣ муҳим аст.']
  ],fact:'Нашр: 2 сентябри 2025. Манбаъ: Созмони Милали Муттаҳид.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  'natural-disasters':{parent:'navigariho',title:'Офатҳои табиӣ дар солҳои 2020–2023',lede:'Атласи UNEP шумораи офатҳои табиии сабтшударо барои чор соли 2020–2023 ҷамъбаст мекунад.',sections:[
    ['Шумора','Дар давраи солҳои 2020–2023 дар Тоҷикистон 1 826 офати табиӣ сабт шудааст.'],
    ['Навъҳои хатар','Сел, заминларза, ярч, фурӯрезии санг ва тарма аз хатарҳои зикршуда мебошанд.'],
    ['Омодагӣ','Огоҳсозии барвақт, банақшагирии маҳаллӣ, мониторинги нишебиҳо ва инфрасохтори тобовар метавонанд хавфро кам кунанд.']
  ],fact:'1 826 ҳодиса дар солҳои 2020–2023; рақам ба ҳамин давра дахл дорад.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'},
  'protected-areas':{parent:'navigariho',title:'Минтақаҳои муҳофизатшавандаи Тоҷикистон',lede:'Минтақаҳои муҳофизатшаванда барои ҳифзи манзараҳо, намудҳо ва равандҳои табиӣ таъсис дода мешаванд.',sections:[
    ['Фарогирии ҳудуд','UNEP гузориш медиҳад, ки ҳиссаи ҳудуди муҳофизатшаванда аз 3,6% дар соли 1991 то 21,6% дар соли 2023 афзоиш ёфтааст.'],
    ['Сохтор','Дар иттилои UNEP чор мамнуъгоҳ, 13 паноҳгоҳи табиӣ ва се боғи миллӣ зикр шудаанд.'],
    ['Намунаҳо','Бешаи палангон ва Зоркӯл аз ҷумлаи минтақаҳои муҳофизатшавандаи дорои арзиши экологӣ мебошанд. Ҳудудҳои ҳуқуқӣ бояд аз харитаҳои расмӣ санҷида шаванд.']
  ],fact:'21,6% — ҳиссаи ҳудуди муҳофизатшаванда дар соли 2023, на нишондиҳандаи ҳар соли нав.',source:'https://tajikistan.un.org/en/300896-tajikistan%E2%80%99s-melting-glaciers-put-water-resources-under-stress-unep-atlas-reveals'}
};

let mapInstance = null;
let mapLayers = [];
let toastTimer = null;

function getActiveParent(pageId) {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.page === pageId);
  });
  const badge = document.getElementById('navCurrentBadge');
  if (badge) badge.innerHTML = `<span>Саҳифа: <strong>${pageNames[pageId] || 'Маълумоти муфассал'}</strong></span>`;
}
function showPage(pageId, updateUrl = true, scroll = true) {
  const page = document.getElementById(`page-${pageId}`);
  if (!page) return;
  document.querySelectorAll('.site-page').forEach(item => item.classList.remove('active'));
  page.classList.add('active');
  getActiveParent(pageId);
  if (updateUrl && location.hash !== `#${pageId}`) history.pushState({pageId}, '', `#${pageId}`);
  if (scroll) window.scrollTo({top:0,behavior:'smooth'});
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
  page.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
  // Дар саҳифаҳои пинҳонии SPA баъзе браузерҳо lazy-image-ро дер оғоз мекунанд.
  page.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
  if (pageId === 'home') animateCounters();
  if (pageId === 'xarita') setTimeout(() => { if (mapInstance) mapInstance.invalidateSize(); }, 120);
}
function switchPage(pageId, event) {
  if (event) event.preventDefault();
  if (pageId === 'home' || pageNames[pageId]) showPage(pageId, true, true);
}
function openDetail(id, updateUrl = true) {
  const data = detailData[id];
  if (!data) return;
  const page = document.getElementById('page-detail');
  if (!page) return;
  const cards = data.sections.map(([title, body]) => `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`).join('');
  page.innerHTML = `<div class="detail-page"><button class="detail-back" type="button" onclick="returnFromDetail('${data.parent}')"><i class="fas fa-arrow-left"></i> Бозгашт ба ${escapeHtml(pageNames[data.parent] || 'бахш')}</button><span class="sec-tag">Маълумоти муфассал · Тоҷикистон</span><h1>${escapeHtml(data.title)}</h1><p class="detail-lede">${escapeHtml(data.lede)}</p><div class="detail-content">${cards}</div><div class="detail-fact">${escapeHtml(data.fact)}</div><a class="detail-source" href="${data.source}" target="_blank" rel="noopener noreferrer">Кушодани манбаи маълумот ↗</a></div>`;
  document.querySelectorAll('.site-page').forEach(item => item.classList.remove('active'));
  page.classList.add('active');
  getActiveParent(data.parent);
  if (updateUrl) history.pushState({detailId:id}, '', `#detail-${id}`);
  window.scrollTo({top:0,behavior:'smooth'});
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
}
function returnFromDetail(parent) { showPage(parent || 'home', true, true); }
function handleLocation() {
  const hash = location.hash.replace(/^#/, '');
  if (hash.startsWith('detail-')) openDetail(hash.slice(7), false);
  else if (pageNames[hash]) showPage(hash, false, false);
  else showPage('home', false, false);
}
function menuToggle() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    if (el.dataset.done === '1') return;
    el.dataset.done = '1';
    const target = Number(el.dataset.target || 0);
    const finalText = el.dataset.display || String(target);
    const start = performance.now();
    const duration = 1200;
    function tick(now) {
      const progress = Math.min(1, (now-start)/duration);
      const raw = target * (1-Math.pow(1-progress,3));
      const current = Number.isInteger(target) ? Math.round(raw) : Math.round(raw*10)/10;
      el.textContent = current.toLocaleString('tg-TJ');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    }
    requestAnimationFrame(tick);
  });
}
function toast(message, type='success') {
  const box = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  const icon = document.getElementById('toastIcon');
  if (!box || !msg) return;
  msg.textContent = message;
  if (icon) icon.innerHTML = type === 'danger' ? '<i class="fas fa-exclamation-circle"></i>' : '<i class="fas fa-check-circle"></i>';
  box.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('show'), 5000);
}
function filterGallery(category, event) {
  document.querySelectorAll('.gallery-filters .filter-btn').forEach(btn => btn.classList.toggle('active', btn === event?.currentTarget));
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.display = category === 'all' || item.dataset.cat === category ? 'block' : 'none';
  });
}
function openLightbox(url,title,desc) {
  const modal=document.getElementById('lightboxModal');
  const img=document.getElementById('lightboxImg');
  const t=document.getElementById('lightboxTitle');
  const d=document.getElementById('lightboxDesc');
  if (!modal || !img) return;
  img.src=url; img.alt=title; if(t)t.textContent=title; if(d)d.textContent=desc;
  modal.classList.add('open'); document.body.style.overflow='hidden';
}
function closeLightbox() {
  const modal=document.getElementById('lightboxModal');
  if(modal) modal.classList.remove('open');
  document.body.style.overflow='';
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

const ecoPlaces = [
 {name:'Искандаркӯл',type:'water',kind:'Кӯли табиӣ',coords:[39.072070,68.354551],desc:'Кӯли кӯҳии ноҳияи Айнӣ, вилояти Суғд; масоҳат тақрибан 3,4 км², умқи то 72 м.',source:'https://commons.wikimedia.org/wiki/File:Tajikistan._Iskander-Kul.jpg'},
 {name:'Ҳафткӯл (Марғузор)',type:'water',kind:'Маҷмӯи кӯлҳои табиӣ',coords:[39.14250,67.85500],desc:'Маҷмӯи ҳафт кӯли кӯҳӣ дар ноҳияи Панҷакент, вилояти Суғд.',source:'https://en.wikipedia.org/wiki/Seven_Lakes_(Tajikistan)'},
 {name:'Кӯли Сарез',type:'water',kind:'Кӯли табиӣ',coords:[38.20167,72.75750],desc:'Кӯли баландкӯҳи Помир, ки соли 1911 пас аз заминларза ва лағзиши кӯҳӣ ба вуҷуд омадааст.',source:'https://commons.wikimedia.org/wiki/File:Lake_Sarez,_Tajikistan_(2077).jpg'},
 {name:'Кӯли Қарокӯл',type:'water',kind:'Кӯли табиӣ',coords:[39.165911,73.484117],desc:'Кӯли баландкӯҳ дар ноҳияи Мурғоб, Бадахшон; наздики шоҳроҳи Помир.',source:'https://commons.wikimedia.org/wiki/File:Karakul_lake_Tajikistan.jpg'},
 {name:'Обанбори Норак',type:'reservoir',kind:'Обанбор / нерӯгоҳи обӣ',coords:[38.37372,69.34818],desc:'Обанбори нерӯгоҳи Норак дар дарёи Вахш, вилояти Хатлон.',source:'https://commons.wikimedia.org/wiki/File:Nurek_Reservoir,_Tajikistan.jpg'},
 {name:'Мамнуъгоҳи «Бешаи палангон»',type:'protected',kind:'Мамнуъгоҳ',coords:[37.387249,68.551659],desc:'Минтақаи муҳофизатшаванда дар ноҳияи Дӯстӣ, вилояти Хатлон; ҷангали туғай ва ботлоқзорҳо.',source:'https://commons.wikimedia.org/wiki/Category:Tigrovaya_balka'},
 {name:'Мамнуъгоҳи давлатии Зоркӯл',type:'protected',kind:'Мамнуъгоҳи баландкӯҳ',coords:[37.4263,73.7722],desc:'Минтақаи муҳофизатшавандаи баландкӯҳи Помир дар атрофи кӯли Зоркӯл; координата нуқтаи марказии тақрибӣ аст.',source:'https://whc.unesco.org/en/tentativelists/2111/'}
];
function initEcoMap() {
  const el=document.getElementById('ecoMap');
  if(!el || mapInstance || !window.L) return;
  mapInstance=L.map(el,{scrollWheelZoom:false}).setView([38.7,71.1],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:17, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(mapInstance);
  mapLayers=ecoPlaces.map(place=>{
    const color=place.type==='protected'?'#198754':(place.type==='reservoir'?'#d98b20':'#278aa7');
    const marker=L.circleMarker(place.coords,{radius:9,color:'#fff',weight:2,fillColor:color,fillOpacity:.95});
    marker.bindPopup(`<strong>${escapeHtml(place.name)}</strong><br><small>${escapeHtml(place.kind)}</small><p>${escapeHtml(place.desc)}</p><a href="${place.source}" target="_blank" rel="noopener noreferrer">Манбаъ ↗</a>`);
    marker.addTo(mapInstance);
    marker.ecoType=place.type;
    return marker;
  });
  document.querySelectorAll('[data-map-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-map-filter]').forEach(b=>b.classList.toggle('active',b===btn));
    const filter=btn.dataset.mapFilter;
    mapLayers.forEach(layer=>{
      const show=filter==='all'||layer.ecoType===filter;
      if(show&&!mapInstance.hasLayer(layer)) layer.addTo(mapInstance);
      if(!show&&mapInstance.hasLayer(layer)) mapInstance.removeLayer(layer);
    });
  }));
}
function handleContactSubmit(event) {
  event.preventDefault();
  const form=document.getElementById('contactForm');
  const name=document.getElementById('cName')?.value.trim();
  const email=document.getElementById('cEmail')?.value.trim().toLowerCase();
  const region=document.getElementById('cRegion')?.value;
  const topic=document.getElementById('cTopic')?.value;
  const message=document.getElementById('cMessage')?.value.trim();
  const consent=document.getElementById('cConsent')?.checked;
  const subscribe=document.getElementById('cSubscribe')?.checked || false;
  if(!form || !form.reportValidity()) return;
  if(!consent){toast('Барои сабти дархост розигӣ лозим аст.','danger');return;}
  const key='tajikEcoRequestsV2';
  let records=[];
  try { records=JSON.parse(localStorage.getItem(key)||'[]'); } catch { records=[]; }
  if(records.some(row=>row.email===email)){
    toast('Бо ин почтаи электронӣ дархост аллакай дар ҳамин браузер сабт шудааст.','danger');return;
  }
  const record={id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),name,email,region,topic,message,subscribe,createdAt:new Date().toISOString()};
  try { records.push(record); localStorage.setItem(key,JSON.stringify(records)); }
  catch(error){ console.error(error); toast('Сабт нашуд: захираи браузер дастнорас аст.','danger'); return; }
  form.reset();
  toast(`Ташаккур, ${name}. Дархост дар ҳамин браузер сабт шуд.`);
  const note=form.querySelector('.form-privacy-note');
  if(note) note.textContent='Дархост сабт шуд. Он танҳо дар ҳамин браузер нигоҳ дошта мешавад; барои қабули марказӣ сервер лозим аст.';
}
function acceptCookies() {
  try { localStorage.setItem('tajikEcoCookieChoice','accepted'); } catch {}
  const bar=document.getElementById('cookieBar'); if(bar) bar.style.display='none';
}
function initSite() {
  document.querySelectorAll('.detail-card').forEach(card=>{
    card.addEventListener('click',()=>openDetail(card.dataset.detail));
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openDetail(card.dataset.detail);}});
  });
  document.querySelectorAll('.nav-tab').forEach(tab=>tab.addEventListener('click',event=>switchPage(tab.dataset.page,event)));
  const form=document.getElementById('contactForm');
  if(form) form.addEventListener('submit',handleContactSubmit);
  if(!localStorage.getItem('tajikEcoCookieChoice')) { const bar=document.getElementById('cookieBar'); if(bar) bar.style.display='flex'; }
  else { const bar=document.getElementById('cookieBar'); if(bar) bar.style.display='none'; }
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>navbar?.classList.toggle('scrolled',window.scrollY>40),{passive:true});
  const observed=document.querySelectorAll('.animate-on-scroll');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
    observed.forEach(el=>observer.observe(el));
  } else observed.forEach(el=>el.classList.add('visible'));
  if(window.L) initEcoMap();
  if(location.hash.startsWith('#detail-')) handleLocation();
  else if(pageNames[location.hash.slice(1)]) handleLocation();
  else showPage('home',false,false);
  animateCounters();
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox();});
  document.getElementById('lightboxModal')?.addEventListener('click',event=>{if(event.target.classList.contains('lightbox-overlay'))closeLightbox();});
}
window.addEventListener('hashchange',handleLocation);
window.addEventListener('popstate',handleLocation);
document.addEventListener('DOMContentLoaded',initSite);


/* === Се забони сомона: тоҷикӣ, ӯзбекӣ ва русӣ === */
(function () {
  const ecoTranslations = {"Экологияи Тоҷикистон":["Tojikiston ekologiyasi","Экология Таджикистана"],"Асосӣ":["Bosh sahifa","Главная"],"Вазъият":["Holat","Состояние"],"Мушкилот":["Muammolar","Проблемы"],"Роҳи Ҳалл":["Yechimlar","Решения"],"Ҳайвонот":["Hayvonot","Животные"],"Галерея":["Galereya","Галерея"],"Харита":["Xarita","Карта"],"Навигариҳо":["Yangiliklar","Новости"],"Тамос":["Aloqa","Контакты"],"Саҳифа:":["Sahifa:","Страница:"],"Ҳифзи Сарватҳои Табиии Тоҷикистон":["Tojikiston tabiiy boyliklarini asrash","Сохранение природных богатств Таджикистана"],"Экологияи":["Ekologiya","Экология"],"Тоҷикистон":["Tojikiston","Таджикистан"],"— Табиати Нодир ва Ояндаи Сабз":["— Noyob tabiat va yashil kelajak","— Уникальная природа и зелёное будущее"],"Тоҷикистон сарчашмаи муҳими оби Осиёи Марказӣ ва макони кӯҳҳои баланд, пиряхҳо ва экосистемаҳои нодир аст. Ин портал маълумоти санҷидашавандаро дар бораи табиат ва ҳифзи муҳити зист ҷамъ мекунад.":["Тожикистон — Марказий Осиёдаги муҳим сув манбаи, баланд тоғлар, музликлар ва ноёб экотизимлар маконидир. Ушбу портал табиат ва атроф-муҳитни муҳофаза қилиш ҳақида текшириш мумкин бўлган маълумотларни жамлайди.","Таджикистан — важный источник воды в Центральной Азии, страна высоких гор, ледников и уникальных экосистем. Портал собирает проверяемую информацию о природе и охране окружающей среды."],"Оморҳои зиндаи оғозӣ":["Asosiy ko‘rsatkichlar","Ключевые показатели"],"Ҳиссаи захираҳои обии Осиёи Марказӣ дар Тоҷикистон":["Марказий Осиё сув захираларининг Тожикистонда шаклланадиган қисми","Доля водных ресурсов Центральной Азии, формирующаяся в Таджикистане"],"Ҳудуди кӯҳсори кишвар":["Мамлакатнинг тоғли ҳудуди","Горная территория страны"],"Тақрибан 14 000 пирях дар арзёбии даҳсолаҳои пеш":["Аввалги баҳолашларда тахминан 14 000 музлик","Около 14 000 ледников по прежним оценкам"],"Ҳудуди минтақаҳои муҳофизатшаванда (2023)":["Муҳофаза қилинадиган ҳудудлар улуши (2023)","Доля охраняемых территорий (2023)"],"Манбаъҳо: Вазорати корҳои хориҷии ҶТ ва Атласи UNEP, 2025. 14 000 — арзёбии қаблии пиряхҳо; UNEP хабар медиҳад, ки зиёда аз 1 000 пирях аллакай пурра аз байн рафтааст.":["Manbalar: Tojikiston Tashqi ishlar vazirligi va UNEP atlasi, 2025. 14 000 — muzliklarning oldingi bahosi; UNEP 1 000 dan ortiq muzlik butunlay yo‘qolganini bildiradi.","Источники: МИД Таджикистана и Атлас ЮНЕП, 2025. 14 000 — прежняя оценка числа ледников; ЮНЕП сообщает, что более 1 000 ледников уже полностью исчезли."],"Галереяи Аксҳо":["Fotogalereya","Фотогалерея"],"Мушкилоти Асосӣ":["Asosiy muammolar","Основные проблемы"],"Ҳамроҳ шудан":["Qo‘shilish","Присоединиться"],"Искандаркӯл — вилояти Суғд":["Iskandarko‘l — Sug‘d viloyati","Искандеркуль — Согдийская область"],"Кӯли кӯҳии воқеъ дар кӯҳҳои Фон":["Fon tog‘laridagi tog‘ ko‘li","Горное озеро в Фанских горах"],"Саҳифаҳои Сомона":["Sayt sahifalari","Страницы сайта"],"Бахши Дилхоҳатонро Интихоб Кунед":["Kerakli bo‘limni tanlang","Выберите нужный раздел"],"Барои гузаштан ба ҳар як бахш тугмаи онро пахш намоед":["Bo‘limga o‘tish uchun uning tugmasini bosing","Нажмите кнопку, чтобы перейти в нужный раздел"],"Вазъияти Имрӯза":["Bugungi holat","Текущее состояние"],"Захираҳои об, яхчоли Федченко, ҷангалҳои арча ва нерӯи сабзи Тоҷикистон.":["Suv resurslari, Fedchenko muzligi, archa o‘rmonlari va Tojikistonning yashil energetikasi.","Водные ресурсы, ледник Федченко, арчовые леса и зелёная энергетика Таджикистана."],"Кушодани саҳифа":["Bo‘limni ochish","Открыть раздел"],"Таҳдидҳо":["Tahdidlar","Угрозы"],"Обшавии босуръати яхчолҳо, дуди зимистона, партовҳои пластикӣ ва эрозия.":["Muzliklarning tez erishi, qishki tutun, plastik chiqindilar va eroziya.","Быстрое таяние ледников, зимний смог, пластиковые отходы и эрозия."],"Амалҳо":["Amaliy choralar","Действия"],"Нерӯи офтобӣ, маъракаи дарахтшинонӣ, коркарди партов ва нақлиёти сабз.":["Quyosh energiyasi, daraxt ekish, chiqindilarni qayta ishlash va ekologik transport.","Солнечная энергия, посадка деревьев, переработка отходов и экологичный транспорт."],"Китоби Сурх":["Qizil kitob","Красная книга"],"Паланги барфӣ, арғалӣ (Марко Поло), хирси қаҳваранг, шоҳуқоб ва оҳуи бухороӣ.":["Qor barsi, arxar (Marko Polo), qo‘ng‘ir ayiq, burgut va Buxoro bug‘usi.","Снежный барс, архар (Марко Поло), бурый медведь, беркут и бухарский олень."],"Искандаркӯл, Помир, кӯли Сарез ва Ҳафткӯл дар тасвирҳои баландсифат.":["Iskandarko‘l, Pomir, Sarez ko‘li va Haftko‘lning yuqori sifatli suratlari.","Искандеркуль, Памир, озеро Сарез и Хафткуль в качественных фотографиях."],"Вилоятҳои Суғд, Бадахшон, Хатлон ва НТҶТ бо маълумоти муфассали экологӣ.":["Sug‘d, Badaxshon, Xatlon viloyatlari va respublikaga bo‘ysunuvchi tumanlar haqida ekologik ma’lumot.","Экологическая информация о Согде, Бадахшане, Хатлоне и районах республиканского подчинения."],"Саҳифаи Баъдӣ: Вазъияти Экологӣ":["Keyingi sahifa: Ekologik holat","Следующая страница: Экологическое состояние"],"Вазъияти Экологӣ":["Ekologik holat","Экологическое состояние"],"Ҳолати Экологии Тоҷикистон":["Tojikistonning ekologik holati","Экологическое состояние Таджикистана"],"Маълумоти воқеӣ оид ба манобеи об, яхчолҳо, ҷангалзор ва барқи сабзи кишвар":["Mamlakat suv manbalari, muzliklari, o‘rmonlari va yashil energetikasi haqida ma’lumot","Данные о водных ресурсах, ледниках, лесах и зелёной энергетике страны"],"Захираи фаровон":["Mo‘l resurs","Богатый ресурс"],"Оби Ошомиданӣ":["Ichimlik suvi","Питьевая вода"],"Дарёҳо ва кӯлҳои Тоҷикистон":["Tojikiston daryolari va ko‘llari","Реки и озёра Таджикистана"],"Тоҷикистон шабакаи бузурги дарёҳо ва тақрибан 1 300 кӯл дорад. Дарёҳои Панҷ, Вахш, Зарафшон ва Сирдарё барои таъмини обу энергетикаи минтақа аҳаммияти калон доранд.":["Tojikistonda keng daryolar tarmog‘i va taxminan 1 300 ta ko‘l bor. Panj, Vaxsh, Zarafshon va Sirdaryo daryolari mintaqaning suv ta’minoti va energetikasi uchun muhim.","В Таджикистане разветвлённая речная сеть и около 1 300 озёр. Реки Пяндж, Вахш, Зеравшан и Сырдарья важны для водоснабжения и энергетики региона."],"Ҳиссаи захираҳои обии Осиёи Марказӣ, ки дар Тоҷикистон ташаккул меёбанд":["Tojikistonda shakllanadigan Markaziy Osiyo suv resurslari ulushi","Доля водных ресурсов Центральной Азии, формирующаяся в Таджикистане"],"Ниёзманди ҳифз":["Muhofazaga muhtoj","Нуждается в защите"],"Яхчолҳои Азим":["Ulkan muzliklar","Великие ледники"],"Пиряхи Федченко ва пиряхҳои Помир":["Fedchenko muzligi va Pomir muzliklari","Ледник Федченко и ледники Памира"],"Маълумоти UNEP (2025) аз тақрибан 14 000 пиряхи таърихӣ ёд мекунад; зиёда аз 1 000 пирях дар даҳсолаҳои охир пурра аз байн рафтаанд. Пиряхҳо яке аз сарчашмаҳои асосии ҷараёни об мебошанд.":["UNEP (2025) ma’lumotida tarixan taxminan 14 000 muzlik qayd etiladi; so‘nggi o‘n yilliklarda 1 000 dan ortiq muzlik butunlay yo‘qolgan. Muzliklar daryolar oqimining asosiy manbalaridan biridir.","По данным ЮНЕП (2025), исторически насчитывалось около 14 000 ледников; за последние десятилетия более 1 000 ледников полностью исчезли. Ледники — один из основных источников речного стока."],"Пирях дар арзёбии UNEP; зиёда аз 1 000-то нобуд шудааст":["Muzliklar UNEP bahosida; 1 000 dan ortig‘i yo‘qolgan","Ледники по оценке ЮНЕП; более 1 000 исчезли"],"Сарвати миллӣ":["Milliy boylik","Национальное богатство"],"Ҷангалҳои Кӯҳӣ":["Tog‘ o‘rmonlari","Горные леса"],"Минтақаҳои ҷангалу табиӣ":["O‘rmon va tabiiy hududlar","Лесные и природные территории"],"Дар Тоҷикистон экосистемаҳои гуногун — аз ҷангалҳои арчаи кӯҳӣ то ҷангалҳои туғайи ҷануб — мавҷуданд. Мамнуъгоҳи «Бешаи палангон» намунаи муҳими ҷангали туғай мебошад.":["Tojikistonda turli ekotizimlar — tog‘ archazorlaridan janubdagi to‘qay o‘rmonlarigacha — mavjud. «Beshai Palangon» qo‘riqxonasi to‘qay o‘rmonining muhim namunasidir.","В Таджикистане есть разные экосистемы — от горных арчовых лесов до южных тугайных лесов. Заповедник «Тигровая Балка» — важный пример тугайного леса."],"Ҳиссаи ҳудуди кишвар, ки соли 2023 минтақаи муҳофизатшаванда буд":["2023-yilda muhofaza etiladigan hududlar ulushi","Доля охраняемых территорий в 2023 году"],"Пешсафи ҷаҳон":["Jahon yetakchisi","Мировой лидер"],"Энергияи Сабз":["Yashil energiya","Зелёная энергия"],"Нерӯи барқи обӣ":["Gidroenergetika","Гидроэнергетика"],"Нерӯгоҳҳои обӣ дар низоми энергетикии Тоҷикистон нақши асосӣ доранд. UNEP қайд мекунад, ки нерӯи обӣ то 95 фоизи барқи кишварро таъмин мекунад; тағйирёбии ҷараёни об ба амнияти энергетикӣ низ таъсир мерасонад.":["Gidroelektr stansiyalar Tojikiston energetika tizimida asosiy o‘rin tutadi. UNEP ma’lumotiga ko‘ra, mamlakat elektr energiyasining 95 foizigacha gidroenergetika hissasiga to‘g‘ri keladi; suv oqimining o‘zgarishi energetik xavfsizlikka ham ta’sir qiladi.","Гидроэлектростанции играют ключевую роль в энергетике Таджикистана. По данным ЮНЕП, гидроэнергетика обеспечивает до 95% электроэнергии страны; изменение речного стока влияет и на энергетическую безопасность."],"Ҳиссаи барқ аз нерӯи обӣ — маълумоти UNEP, 2025":["Gidroenergetika ulushi — UNEP, 2025 ma’lumoti","Доля гидроэнергетики — данные ЮНЕП, 2025"],"Ба Саҳифаи Асосӣ":["Bosh sahifaga","На главную"],"Саҳифаи Баъдӣ: Мушкилот":["Keyingi sahifa: Muammolar","Следующая страница: Проблемы"],"Мушкилоти Экологӣ":["Ekologik muammolar","Экологические проблемы"],"Мушкилоти Асосии Экологии Тоҷикистон":["Tojikistonning asosiy ekologik muammolari","Основные экологические проблемы Таджикистана"],"Таҳдидҳои воқеӣ ба табиат ва масъалаҳое, ки ба ҳалли фаврӣ ниёз доранд":["Tabiatga real tahdidlar va tezkor yechim talab qiladigan masalalar","Реальные угрозы природе и вопросы, требующие срочного решения"],"Хатари Баланд":["Yuqori xavf","Высокий риск"],"Обшавии пиряхҳо":["Muzliklarning erishi","Таяние ледников"],"UNEP дар соли 2025 хабар дод, ки зиёда аз 1 000 пиряхи Тоҷикистон дар даҳсолаҳои охир пурра аз байн рафтааст. Коҳиши ях захираи мавсимии обро тағйир дода, хавфи тағйирёбии ҷараёни дарёҳоро зиёд мекунад.":["UNEP 2025-yilda so‘nggi o‘n yilliklarda Tojikistondagi 1 000 dan ortiq muzlik butunlay yo‘qolganini ma’lum qildi. Muzliklarning qisqarishi mavsumiy suv zaxirasini o‘zgartirib, daryolar oqimi o‘zgarishi xavfini oshiradi.","В 2025 году ЮНЕП сообщила, что за последние десятилетия в Таджикистане полностью исчезло более 1 000 ледников. Сокращение ледников меняет сезонные запасы воды и повышает риск изменения речного стока."],"Олудашавии ҳавои шаҳрҳо":["Shahar havosining ifloslanishi","Загрязнение городского воздуха"],"Сифати ҳаво аз нақлиёт, фаъолияти саноатӣ, гармидиҳии хонаҳо, чангу ғубор ва шароити обу ҳаво вобаста аст. Барои арзёбии дуруст бояд нишондиҳандаҳои истгоҳҳои PM2.5/PM10 ва давраи ченкунӣ нишон дода шаванд.":["Havo sifati transport, sanoat, uylarni isitish, chang va ob-havo sharoitiga bog‘liq. To‘g‘ri baholash uchun PM2.5/PM10 stansiyalari ko‘rsatkichlari va o‘lchov davri ko‘rsatilishi kerak.","Качество воздуха зависит от транспорта, промышленности, отопления домов, пыли и погоды. Для корректной оценки необходимо указывать показатели станций PM2.5/PM10 и период измерений."],"Партовҳои сахти маишӣ":["Qattiq maishiy chiqindilar","Твёрдые бытовые отходы"],"Идоракунии партовҳо ҷудокунии мавод, ҷамъоварии мунтазам, коркарди такрорӣ ва ҷойгиркунии бехатарро талаб мекунад. Дар ин портал миқдори миллӣ бе манбаи омории нав оварда намешавад.":["Chiqindilarni boshqarish ularni saralash, muntazam yig‘ish, qayta ishlash va xavfsiz joylashtirishni talab qiladi. Ushbu portalda yangi statistik manbasiz milliy miqdorlar keltirilmaydi.","Управление отходами требует сортировки, регулярного сбора, переработки и безопасного размещения. На портале не приводятся национальные объёмы без актуального статистического источника."],"Эрозияи хок ва таназзули замин":["Tuproq eroziyasi va yer degradatsiyasi","Эрозия почвы и деградация земель"],"Нишебиҳои кӯҳӣ ҳангоми чаронидани аз ҳад зиёд, кам шудани растанипӯш ва боришоти шадид осебпазиранд. Нигоҳ доштани қабати растанӣ, чарогоҳбандӣ ва корҳои зиддиэрозиявӣ аз тадбирҳои муҳиманд.":["Tog‘ yonbag‘irlari ortiqcha chorva boqish, o‘simlik qoplamining kamayishi va kuchli yog‘ingarchilikda zaiflashadi. O‘simlik qatlamini saqlash, yaylovlarni tartibga solish va eroziyaga qarshi ishlar muhim choradir.","Горные склоны уязвимы при чрезмерном выпасе, сокращении растительного покрова и сильных осадках. Важны сохранение растительности, регулирование выпаса и противоэрозионные меры."],"Бахши Вазъият":["Раздел состояния","Bo‘lim: holat"],"Саҳифаи Баъдӣ: Роҳи Ҳалл":["Keyingi sahifa: Yechimlar","Следующая страница: Решения"],"Роҳҳои Ҳалли Мушкилоти Экологӣ":["Ekologik muammolar yechimlari","Решения экологических проблем"],"Иқдомҳо ва тадбирҳои воқеӣ барои сабз нигоҳ доштани диёри маҳбубамон":["Yurtimizni yashil saqlash uchun amaliy tashabbus va choralar","Практические инициативы и меры для сохранения зелёного края"],"Энергияи офтобӣ дар маҳалҳои дурдаст":["Olis hududlarda quyosh energiyasi","Солнечная энергия в отдалённых районах"],"Панелҳои офтобӣ метавонанд барои хонаҳо, мактабҳо ва нуқтаҳои хизматрасонии аз шабака дур манбаи иловагии барқ бошанд. Лоиҳа бояд бо таҳлили иқлим, нигоҳдорӣ ва хароҷоти давраи истифода тарҳрезӣ шавад.":["Quyosh panellari elektr tarmog‘idan uzoqdagi uylar, maktablar va xizmat ko‘rsatish punktlari uchun qo‘shimcha elektr manbai bo‘lishi mumkin. Loyiha iqlim, texnik xizmat va foydalanish xarajatlari hisobga olingan holda tuzilishi kerak.","Солнечные панели могут стать дополнительным источником электричества для домов, школ и объектов вдали от сети. Проект следует разрабатывать с учётом климата, обслуживания и затрат на весь срок эксплуатации."],"Барқарорсозии ҷангал ва чарогоҳ":["O‘rmon va yaylovlarni tiklash","Восстановление лесов и пастбищ"],"Шинонидани ниҳол танҳо дар ҷойи мувофиқ ва бо нигоҳубини баъдӣ натиҷа медиҳад. Навъҳои маҳаллӣ, барқарорсозии табиӣ ва пешгирии чаронидани аз ҳад зиёд бояд дар мадди аввал бошанд.":["Ko‘chat ekish faqat mos joyda ekilib, keyinchalik parvarish qilinsa natija beradi. Mahalliy turlar, tabiiy tiklanish va ortiqcha yaylov bosimining oldini olish ustuvor bo‘lishi kerak.","Посадка саженцев эффективна только в подходящем месте и при последующем уходе. Приоритетны местные виды, естественное восстановление и предотвращение чрезмерного выпаса."],"Ҷудокунии партов ва истифодаи такрорӣ":["Chiqindilarni saralash va qayta foydalanish","Сортировка и повторное использование отходов"],"Ҷудокунии партов дар манбаъ, ҷамъоварии ҷудогона ва ҳамкорӣ бо коркардкунандагон роҳҳои амалӣ мебошанд. Натиҷа бояд бо вазни партови воқеан коркардшуда ҳисоб карда шавад.":["Chiqindilarni manbada saralash, alohida yig‘ish va qayta ishlovchilar bilan hamkorlik amaliy yo‘llardir. Natija amalda qayta ishlangan chiqindi og‘irligi bilan hisoblanishi kerak.","Раздельный сбор у источника, отдельная транспортировка и сотрудничество с переработчиками — практические меры. Результат следует оценивать по фактической массе переработанных отходов."],"Нақлиёти шаҳрии камифлос":["Kam chiqindili shahar transporti","Городской транспорт с низкими выбросами"],"Такмили нақлиёти ҷамъиятӣ, пиёдагардӣ, велосипедронӣ ва навсозии паркҳои нақлиётӣ метавонад партовҳои маҳаллиро кам кунад. Натиҷа аз таркиби нерӯи барқ ва сифати идоракунии нақлиёт низ вобаста аст.":["Jamoat transportini yaxshilash, piyoda va velosiped harakatini rivojlantirish hamda transport parkini yangilash mahalliy chiqindilarni kamaytirishi mumkin. Natija elektr energiyasi tarkibi va transport boshqaruvi sifatiga ham bog‘liq.","Развитие общественного транспорта, пеших и велосипедных маршрутов, а также обновление автопарка могут снизить местные выбросы. Результат также зависит от структуры электроэнергии и качества управления транспортом."],"Бахши Мушкилот":["Muammolar bo‘limi","Раздел проблем"],"Саҳифаи Баъдӣ: Ҳайвоноти Нодир":["Keyingi sahifa: Noyob hayvonlar","Следующая страница: Редкие животные"],"Ҳайвоноти Нодир":["Noyob hayvonlar","Редкие животные"],"Ҳайвоноти Нодири Тоҷикистон (Китоби Сурх)":["Tojikistonning noyob hayvonlari (Qizil kitob)","Редкие животные Таджикистана (Красная книга)"],"Шоҳони кӯҳсори Помир ва олами нотакрори ҳайвоноти табиати кишвар":["Pomir tog‘lari va mamlakat tabiatining betakror hayvonot olami","Животный мир Памира и уникальная фауна страны"],"Паланги Барфӣ (Ирбис)":["Qor barsi (irbis)","Снежный барс (ирбис)"],"Шоҳи бебаҳси кӯҳҳои баланди Помир ва Ҳисор. Рамзи шукӯҳ ва тозагии табиати кӯҳсор аст. Маълумоти шумора бе санади расмии нав дар ин саҳифа нишон дода намешавад.":["Pomir va Hisor baland tog‘larining noyob yirtqichi. U tog‘ tabiatining ulug‘vorligi va sofligi ramzidir. Yangi rasmiy manbasiz soni bu sahifada ko‘rsatilmaydi.","Редкий хищник высокогорий Памира и Гиссара. Символ величия и чистоты горной природы. Численность не приводится без актуального официального источника."],"Арғалӣ (Марко Поло)":["Arxar (Marko Polo)","Архар (Марко Поло)"],"Хирси Қаҳваранг":["Qo‘ng‘ir ayiq","Бурый медведь"],"Шоҳуқоб (Уқоби Тиллоӣ)":["Oltin burgut","Беркут"],"Гурги Кӯҳии Помирӣ":["Pomir tog‘ bo‘risi","Памирский горный волк"],"Оҳуи Бухороӣ (Хангул)":["Buxoro bug‘usi (xongul)","Бухарский олень (хангул)"],"Барои шумора ба мониторинг ва Китоби Сурх муроҷиат кунед":["Soni bo‘yicha monitoring va Qizil kitob ma’lumotlariga murojaat qiling","Для данных о численности обратитесь к мониторингу и Красной книге"],"Бахши Роҳи Ҳалл":["Yechimlar bo‘limi","Раздел решений"],"Саҳифаи Баъдӣ: Галерея":["Keyingi sahifa: Galereya","Следующая страница: Галерея"],"Галереяи Аксҳои Табиати Тоҷикистон":["Tojikiston tabiati fotogalereyasi","Фотогалерея природы Таджикистана"],"Барои калон дидани ҳар як тасвир ва маълумоти пурраи он, рӯи акс пахш намоед":["Rasmni kattalashtirish va to‘liq ma’lumotni ko‘rish uchun ustiga bosing","Нажмите на фото, чтобы увеличить его и увидеть подробную информацию"],"Ҳамаи Аксҳо":["Barcha rasmlar","Все фотографии"],"🏔️ Кӯҳҳо ва Қуллаҳо":["🏔️ Tog‘lar va cho‘qqilar","🏔️ Горы и вершины"],"🌊 Кӯлҳо ва Дарёҳо":["🌊 Ko‘llar va daryolar","🌊 Озёра и реки"],"🌿 Ҷангалу Наботот":["🌿 O‘rmon va o‘simliklar","🌿 Леса и растения"],"☀️ Иқдоми Сабз":["☀️ Yashil tashabbus","☀️ Зелёная инициатива"],"Бахши Ҳайвонот":["Hayvonot bo‘limi","Раздел животных"],"Саҳифаи Баъдӣ: Харита":["Keyingi sahifa: Xarita","Следующая страница: Карта"],"Харитаи Экологӣ":["Ekologik xarita","Экологическая карта"],"Харитаи Экологии Минтақаҳои Тоҷикистон":["Tojikiston hududlarining ekologik xaritasi","Экологическая карта регионов Таджикистана"],"Рӯи харита ё вилоятҳо пахш кунед, то маълумоти пурраи онҳоро мутолиа кунед":["Hudud haqida to‘liq ma’lumot olish uchun xarita yoki viloyat ustiga bosing","Нажмите на карту или регион, чтобы прочитать подробную информацию"],"Харитаи интерактивӣ бор нашуд.":["Interaktiv xarita yuklanmadi.","Интерактивная карта не загрузилась."],"Барои харита пайвасти интернет лозим аст. Бахшҳои дигари сомона бе харита ҳам кор мекунанд.":["Xarita uchun internet aloqasi kerak. Saytning boshqa bo‘limlari xaritasiz ham ishlaydi.","Для карты требуется подключение к интернету. Остальные разделы сайта работают и без неё."],"Кушодани харитаи Тоҷикистон ↗":["Tojikiston xaritasini ochish ↗","Открыть карту Таджикистана ↗"],"Харита аз OpenStreetMap истифода мебарад. Нишонаҳо нуқтаҳои ҷойгиршавиро нишон медиҳанд, на ҳудуди дақиқи мамнуъгоҳҳо.":["Xaritada OpenStreetMap ishlatiladi. Belgilar joylashuv nuqtalarini ko‘rsatadi, qo‘riqxonalarning aniq chegaralarini emas.","Карта использует OpenStreetMap. Метки показывают точки расположения, а не точные границы заповедников."],"Кӯлҳо, обанборҳо ва минтақаҳои муҳофизатшаванда":["Ko‘llar, suv omborlari va muhofaza etiladigan hududlar","Озёра, водохранилища и охраняемые территории"],"Нишонаро пахш кунед, то маълумот ва пайванди манбаъро бинед. Филтрҳо намудҳои объектро ҷудо мекунанд.":["Ma’lumot va manba havolasini ko‘rish uchun belgini bosing. Filtrlar obyekt turlarini ajratadi.","Нажмите на метку, чтобы увидеть сведения и ссылку на источник. Фильтры разделяют типы объектов."],"Ҳама":["Barchasi","Все"],"Кӯлҳо":["Ko‘llar","Озёра"],"Обанборҳо":["Suv omborlari","Водохранилища"],"Минтақаҳои муҳофизатшаванда":["Muhofaza etiladigan hududlar","Охраняемые территории"],"Бахши Галерея":["Galereya bo‘limi","Раздел галереи"],"Саҳифаи Баъдӣ: Навигариҳо":["Keyingi sahifa: Yangiliklar","Следующая страница: Новости"],"Ахбори Экологӣ":["Ekologik yangiliklar","Экологические новости"],"Охирин Навигариҳои Экологии Тоҷикистон":["Tojikiston ekologiyasiga oid so‘nggi yangiliklar","Последние экологические новости Таджикистана"],"Рӯйдодҳои тоза ва ташаббусҳои муҳим дар соҳаи муҳити зист":["Atrof-muhit sohasidagi yangi voqealar va muhim tashabbuslar","Новые события и важные инициативы в сфере окружающей среды"],"Ташаббуси Ҷаҳонӣ":["Global tashabbus","Глобальная инициатива"],"Атласи UNEP: тағйирёбии иқлим ва пиряхҳои Тоҷикистон":["UNEP atlasi: iqlim o‘zgarishi va Tojikiston muzliklari","Атлас ЮНЕП: изменение климата и ледники Таджикистана"],"UNEP гузориш дод, ки ҳарорати миёнаи солонаи Тоҷикистон нисбат ба сатҳи пешин 1,2°C боло рафтааст. Дар даҳсолаҳои охир зиёда аз 1 000 пирях пурра аз байн рафтааст.":["UNEP ma’lumotiga ko‘ra, Tojikistonda o‘rtacha yillik harorat avvalgi darajaga nisbatan 1,2°C ga oshgan. So‘nggi o‘n yilliklarda 1 000 dan ortiq muzlik butunlay yo‘qolgan.","По данным ЮНЕП, среднегодовая температура Таджикистана выросла на 1,2°C относительно прежнего уровня. За последние десятилетия полностью исчезло более 1 000 ледников."],"Иқдоми Ҷамъиятӣ":["Jamoatchilik tashabbusi","Общественная инициатива"],"Ҳодисаҳои табиӣ дар солҳои 2020–2023":["2020–2023-yillardagi tabiiy hodisalar","Природные явления в 2020–2023 годах"],"Мувофиқи Атласи UNEP, дар солҳои 2020–2023 дар Тоҷикистон 1 826 офати табиӣ сабт шудааст. Аксари ҳолатҳои фавқулода бо хатарҳои табиӣ, аз ҷумла сел, заминларза, ярч ва тарма алоқаманд буданд.":["UNEP atlasiga ko‘ra, 2020–2023-yillarda Tojikistonda 1 826 ta tabiiy ofat qayd etilgan. Favqulodda holatlarning aksariyati sel, zilzila, ko‘chki va qor ko‘chkisi kabi tabiiy xavflar bilan bog‘liq.","Согласно Атласу ЮНЕП, в 2020–2023 годах в Таджикистане зарегистрировано 1 826 стихийных бедствий. Большинство чрезвычайных ситуаций было связано с селями, землетрясениями, оползнями и лавинами."],"Олами Ҳайвонот":["Hayvonot olami","Животный мир"],"Минтақаҳои муҳофизатшаванда: пешравӣ то соли 2023":["Muhofaza etiladigan hududlar: 2023-yilgacha bo‘lgan taraqqiyot","Охраняемые территории: прогресс к 2023 году"],"UNEP қайд мекунад, ки ҳиссаи минтақаҳои муҳофизатшаванда аз 3,6 фоизи ҳудуди кишвар дар соли 1991 то 21,6 фоиз дар соли 2023 расидааст. Ин нишондиҳанда ба чор мамнуъгоҳ, 13 паноҳгоҳ ва се боғи миллӣ дахл дорад.":["UNEP qayd etishicha, muhofaza etiladigan hududlar ulushi 1991-yildagi 3,6 foizdan 2023-yilda 21,6 foizga yetgan. Bu ko‘rsatkich to‘rtta qo‘riqxona, 13 ta buyurtmaxona va uchta milliy bog‘ni qamrab oladi.","ЮНЕП отмечает, что доля охраняемых территорий выросла с 3,6% территории страны в 1991 году до 21,6% в 2023 году. Показатель включает четыре заповедника, 13 заказников и три национальных парка."],"Манбаҳои санҷидашуда":["Tekshirilgan manbalar","Проверенные источники"],"Омор ва тавсифи муҳити зист аз ин манбаъҳо гирифта шудаанд. Сол ва таърихи ченкунӣ дар ҳар рақам бояд ба назар гирифта шавад.":["Statistika va ekologik tavsiflar ushbu manbalardan olingan. Har bir raqamda yil va o‘lchov sanasiga e’tibor berish kerak.","Статистика и экологические описания взяты из этих источников. Для каждого показателя важно учитывать год и дату измерения."],"Бахши Харита":["Xarita bo‘limi","Раздел карты"],"Саҳифаи Баъдӣ: Тамос":["Keyingi sahifa: Aloqa","Следующая страница: Контакты"],"Тамос ва Муроҷиат":["Aloqa va murojaat","Контакты и обращения"],"Бо Мо Дар Тамос Бошед":["Biz bilan bog‘laning","Свяжитесь с нами"],"Пешниҳод ё лоиҳаи экологии худро бифиристед ё ба сафи волонтёрон ҳамроҳ шавед":["Ekologik taklif yoki loyihangizni yuboring yoki ko‘ngillilar safiga qo‘shiling","Отправьте экологическое предложение или проект либо присоединяйтесь к волонтёрам"],"Ҳар Як Қадам Муҳим Аст!":["Har bir qadam muhim!","Каждый шаг важен!"],"Ин сомона портали мустақили иттилоотӣ мебошад, на идораи давлатӣ. Тавассути шакли зер метавонед дар ҳамин браузер пешниҳод ё дархости ҳамкориро сабт кунед.":["Bu sayt davlat idorasi emas, mustaqil axborot portalidir. Quyidagi shakl orqali taklif yoki hamkorlik so‘rovini shu brauzerda saqlashingiz mumkin.","Этот сайт — независимый информационный портал, а не государственное учреждение. Через форму ниже можно сохранить предложение или запрос о сотрудничестве в этом браузере."],"Ном ва Насаби Шумо":["Ism va familiyangiz","Ваше имя и фамилия"],"Почтаи Электронӣ":["Elektron pochta","Электронная почта"],"Минтақаи Шумо":["Hududingiz","Ваш регион"],"Минтақаро интихоб кунед...":["Hududni tanlang...","Выберите регион..."],"шаҳри Душанбе":["Dushanbe shahri","город Душанбе"],"Вилояти Суғд":["Sug‘d viloyati","Согдийская область"],"Вилояти Хатлон":["Xatlon viloyati","Хатлонская область"],"ВМКБ (Бадахшон)":["Tog‘li Badaxshon muxtor viloyati","ГБАО (Бадахшан)"],"Ноҳияҳои Тобеи Ҷумҳурӣ":["Respublikaga bo‘ysunuvchi tumanlar","Районы республиканского подчинения"],"Мавзӯи Пешниҳод":["Taklif mavzusi","Тема предложения"],"Мавзӯъро интихоб кунед...":["Mavzuni tanlang...","Выберите тему..."],"🌱 Шинонидани дарахт ва сабзкорӣ":["🌱 Daraxt ekish va ko‘kalamzorlashtirish","🌱 Посадка деревьев и озеленение"],"🗑️ Гузориш оид ба партовҳои ғайриқонунӣ":["🗑️ Noqonuniy chiqindilar haqida xabar","🗑️ Сообщение о незаконном сбросе отходов"],"💧 Ҳифзи дарё ё чашма":["💧 Daryo yoki buloqni muhofaza qilish","💧 Защита реки или родника"],"🦅 Ҳимояи ҳайвоноти нодир":["🦅 Noyob hayvonlarni himoya qilish","🦅 Защита редких животных"],"🤝 Дохил шудан ба сафи волонтёрон":["🤝 Ko‘ngillilar safiga qo‘shilish","🤝 Вступить в ряды волонтёров"],"💬 Пешниҳоди дигар":["💬 Boshqa taklif","💬 Другое предложение"],"Матни Паём ё Лоиҳа":["Xabar yoki loyiha matni","Текст сообщения или проекта"],"Сабти дархост":["So‘rovni saqlash","Сохранить заявку"],"Муҳим: ҳоло маълумот танҳо дар localStorage-и ҳамин браузер нигоҳ дошта мешавад. Барои қабули дархост аз дастгоҳҳои дигар сервер ва API-и воқеӣ лозим аст.":["Muhim: hozircha ma’lumot faqat shu brauzerning localStorage xotirasida saqlanadi. Boshqa qurilmalardan so‘rovlarni qabul qilish uchun haqiqiy server va API kerak.","Важно: сейчас данные сохраняются только в localStorage этого браузера. Для приёма заявок с других устройств необходимы настоящий сервер и API."],"Бахши Навигариҳо":["Yangiliklar bo‘limi","Раздел новостей"],"Баргаштан ба Саҳифаи Асосӣ":["Bosh sahifaga qaytish","Вернуться на главную"],"Истифодаи аксҳо ва иҷозатнома":["Rasmlardan foydalanish va litsenziyalar","Использование изображений и лицензии"],"Аксҳо аз Wikimedia Commons гирифта шудаанд. Пеш аз истифодаи минбаъда шартҳои иҷозатномаро дар саҳифаи аслии ҳар файл санҷед.":["Rasmlar Wikimedia Commons’dan olingan. Qayta foydalanishdan oldin har bir faylning asl sahifasidagi litsenziya shartlarini tekshiring.","Изображения взяты с Wikimedia Commons. Перед повторным использованием проверьте условия лицензии на исходной странице каждого файла."],"🌍 Экологияи Тоҷикистон":["🌍 Tojikiston ekologiyasi","🌍 Экология Таджикистана"],"Манбаи иттилоотӣ оид ба табиати Тоҷикистон. Рақамҳо бо соли маълумот ва истинод ба сарчашма оварда мешаванд; ин сомона мақоми расмии давлатӣ надорад.":["Tojikiston tabiati haqida axborot manbai. Raqamlar ma’lumot yili va manbaga havola bilan beriladi; sayt rasmiy davlat maqomiga ega emas.","Информационный ресурс о природе Таджикистана. Показатели приводятся с годом данных и ссылкой на источник; сайт не имеет официального государственного статуса."],"Роҳҳои Ҳалл":["Yechimlar","Решения"],"Бахшҳои Иловагӣ":["Qo‘shimcha bo‘limlar","Дополнительные разделы"],"Харитаи Минтақаҳо":["Hududlar xaritasi","Карта регионов"],"Охирин Ахбор":["So‘nggi yangiliklar","Последние новости"],"Тамос ва Волонтёрӣ":["Aloqa va ko‘ngillilik","Контакты и волонтёрство"],"Маълумоти портал":["Portal haqida","О портале"],"Портали мустақили иттилоотӣ — суроға ва телефони расмӣ надорад.":["Mustaqil axborot portali — rasmiy manzil va telefon raqamiga ega emas.","Независимый информационный портал — не имеет официального адреса и телефона."],"🍪 Сомона кукиҳоро барои фаъолияти боэътимод ва сабти танзимот истифода мебарад.":["🍪 Sayt barqaror ishlash va sozlamalarni saqlash uchun cookie fayllaridan foydalanadi.","🍪 Сайт использует файлы cookie для стабильной работы и сохранения настроек."],"Қабул Мекунам":["Qabul qilaman","Принимаю"]};
  const languageNames = {
    tg: {home:'Асосӣ',vaziyat:'Вазъияти экологӣ',mushkilot:'Мушкилоти экологӣ',rohihall:'Роҳҳои ҳал',hayvonot:'Ҳайвоноти нодир',gallery:'Галерея',xarita:'Харитаи экологӣ',navigariho:'Навигариҳо',tamos:'Тамос'},
    uz: {home:'Bosh sahifa',vaziyat:'Ekologik holat',mushkilot:'Ekologik muammolar',rohihall:'Yechimlar',hayvonot:'Noyob hayvonlar',gallery:'Galereya',xarita:'Ekologik xarita',navigariho:'Yangiliklar',tamos:'Aloqa'},
    ru: {home:'Главная',vaziyat:'Экологическое состояние',mushkilot:'Экологические проблемы',rohihall:'Решения',hayvonot:'Редкие животные',gallery:'Галерея',xarita:'Экологическая карта',navigariho:'Новости',tamos:'Контакты'}
  };
  const originalNodes = new WeakMap();
  const originalAttrs = new WeakMap();
  const activeLang = () => localStorage.getItem('ecoSiteLanguage') || 'tg';
  function translateText(text, lang) {
    if (lang === 'tg') return text;
    const entry = ecoTranslations[text];
    return entry ? entry[lang === 'uz' ? 0 : 1] : text;
  }
  function walkAndTranslate(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim() || node.parentElement?.closest('script,style,noscript,option[data-no-translate]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!originalNodes.has(node)) originalNodes.set(node, node.nodeValue);
      const original = originalNodes.get(node);
      const trimmed = original.trim();
      const translated = translateText(trimmed, lang);
      node.nodeValue = original.replace(trimmed, translated);
    });
    root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
      ['placeholder','title','aria-label'].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        let saved = originalAttrs.get(el);
        if (!saved) { saved = {}; originalAttrs.set(el, saved); }
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
        el.setAttribute(attr, translateText(saved[attr], lang));
      });
    });
  }
  function applyEcoLanguage(lang) {
    if (!['tg','uz','ru'].includes(lang)) lang = 'tg';
    localStorage.setItem('ecoSiteLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
    walkAndTranslate(document.body, lang);
    if (typeof pageNames !== 'undefined') Object.assign(pageNames, languageNames[lang]);
    const current = document.querySelector('.nav-tab.active')?.dataset.page || 'home';
    const badge = document.getElementById('navCurrentBadge');
    if (badge) {
      const label = lang === 'tg' ? 'Саҳифа:' : (lang === 'uz' ? 'Sahifa:' : 'Страница:');
      badge.innerHTML = `<span>${label} <strong>${languageNames[lang][current] || languageNames[lang].home}</strong></span>`;
    }
    const picker = document.getElementById('siteLanguage');
    if (picker && picker.value !== lang) picker.value = lang;
  }
  document.addEventListener('change', event => {
    if (event.target?.id === 'siteLanguage') applyEcoLanguage(event.target.value);
  });
  const observer = new MutationObserver(records => {
    const lang = activeLang();
    records.forEach(record => {
      record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) walkAndTranslate(node, lang);
        else if (node.nodeType === Node.TEXT_NODE) {
          if (!originalNodes.has(node)) originalNodes.set(node, node.nodeValue);
          const original = originalNodes.get(node), trimmed = original.trim();
          node.nodeValue = original.replace(trimmed, translateText(trimmed, lang));
        }
      });
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('siteLanguage');
    const lang = activeLang();
    if (picker) picker.value = lang;
    applyEcoLanguage(lang);
    observer.observe(document.body, {childList:true,subtree:true});
  });
  window.setEcoLanguage = applyEcoLanguage;
})();
