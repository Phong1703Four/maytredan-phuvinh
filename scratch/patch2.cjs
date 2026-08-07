const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src', 'lib', 'translations.js');
let content = fs.readFileSync(file, 'utf-8');

const TEXT = {
    es: {
        'story1.desc': 'Con más de 60 años en el oficio, el maestro Bảy es el único artesano que aún domina la intrincada técnica de tejido de dragón y fénix en bandejas de ratán.',
        'story1.full': 'Nguyễn Văn Bảy, nacido en 1938, comenzó a tejer a los 8 años bajo la guía de su padre. En más de 60 años, sus manos han creado miles de obras únicas, incluyendo un conjunto de 12 bandejas de dragón y fénix exhibidas en el Museo de Etnología de Vietnam. Su tejido decorativo se considera el más fino de Phú Vinh: cada bandeja toma hasta 3 meses con más de 40,000 nudos. En 2018, recibió el título de Artesano Meritorio.',
        'story2.desc': 'En el siglo XVIII, los productos de bambú de Phú Vinh eran tan exquisitos que se ofrecían como tributo a los emperadores.',
        'story2.full': 'Los registros históricos muestran que durante el reinado del Emperador Lê Hiển Tông (siglo XVIII), los funcionarios locales presentaron cajas de bambú, bandejas de té y platos de Phú Vinh a la corte real. El emperador quedó encantado y ordenó a la aldea abastecer a la corte regularmente. Esta fue la primera época dorada de la aldea artesanal.',
        'story3.desc': 'Los jóvenes de la Generación Z de Phú Vinh no solo heredan técnicas, sino que aplican tecnología digital, conquistando los mercados de EE. UU. y Europa.',
        'story3.full': 'Nguyễn Minh Quân, nacido en 1995, se graduó de la universidad y regresó a la aldea en lugar de quedarse en la ciudad. Fundó Phú Vinh Craft Export, vendiendo en Amazon y Etsy. En solo 2 años, los ingresos por exportación de su equipo alcanzaron los 3 mil millones de VND/año, llevando productos a clientes en 28 países.',
        'story4.desc': 'En Phú Vinh, los niños de 5-6 años ya ayudan a pelar el bambú. El oficio se transmite de forma natural, como respirar, a través de generaciones.',
        'story4.full': 'La familia de la Sra. Trần Thị Hoa es una de las familias tejedoras de cinco generaciones en Phú Vinh. Desde la bisabuela hasta la hija de 7 años, todos dominan al menos un paso. La Sra. Hoa dice: "Nadie nos enseña formalmente. Los niños observan a sus padres e imitan, y en algún momento, simplemente saben cómo hacerlo".',
        'story5.desc': 'Los incansables esfuerzos de conservación han valido a la aldea el reconocimiento de organizaciones internacionales del patrimonio.',
        'story5.full': 'En 2019, Phú Vinh se incluyó en la lista de la UNESCO de aldeas artesanales tradicionales representativas del sudeste asiático que necesitan preservación. Para lograr esto, el gobierno del distrito y la Asociación de Artesanos de Phú Vinh pasaron 4 años construyendo el dossier, documentando y digitalizando más de 200 técnicas tradicionales de tejido.',
        'story6.desc': 'Más allá de tejer, los residentes de Phú Vinh son pioneros en el cultivo y la conservación de variedades raras de ratán.',
        'story6.full': 'Ante la creciente escasez de materias primas, en 2020 un grupo de artesanos de Phú Vinh se asoció con el Instituto de Ecología y Recursos Biológicos para establecer el primer vivero de ratán de Vietnam al pie de la aldea. El proyecto "Green Phú Vinh" ha plantado más de 15,000 plantas de ratán en 5 hectáreas.'
    },
    zh: {
        'story1.desc': '凭借60多年的手工艺经验，Bảy师傅是唯一一位仍然掌握在藤盘上编织复杂龙凤图案技术的工匠。',
        'story1.full': 'Nguyễn Văn Bảy，生于1938年，在父亲的指导下从8岁开始编织。60多年来，他的双手创造了数以千计的独特作品，包括在越南民族学博物馆展出的12件龙凤盘。他的装饰性编织被认为是富荣最精致的——每件托盘需要长达3个月的时间，包含4万多个结。2018年，他被授予“优秀工匠”称号。',
        'story2.desc': '在18世纪，富荣的竹制品非常精致，甚至被作为贡品献给皇帝。',
        'story2.full': '历史记载显示，在黎显宗皇帝（18世纪）统治期间，地方官员向皇室进贡了富荣的竹盒、茶盘和餐盘。皇帝非常高兴，命令该村定期向内宫供应。这是这个手工艺村的第一个黄金时代。',
        'story3.desc': '富荣的Z世代年轻人不仅继承了技术，还应用了数字技术，征服了美国和欧洲市场。',
        'story3.full': 'Nguyễn Minh Quân，生于1995年，大学毕业后回到了村里，而不是留在城市。他创立了富荣手工艺品出口公司，在亚马逊和Etsy上销售。在短短2年内，他的团队的出口收入达到每年30亿越南盾，将产品带给28个国家的客户。',
        'story4.desc': '在富荣，5-6岁的孩子就已经开始帮助剥竹子了。这门手艺像呼吸一样，自然地代代相传。',
        'story4.full': 'Trần Thị Hoa女士的家庭是富荣五代编织家庭之一。从曾祖母到7岁的小女儿，每个人都至少掌握了一个步骤。Hoa女士说：“没有人正式教我们。孩子们看着父母模仿，到了一定的时候，他们就知道怎么做了。”',
        'story5.desc': '不懈的保护努力为该村赢得了国际遗产组织的认可。',
        'story5.full': '2019年，富荣被列入联合国教科文组织需要保护的东南亚代表性传统手工艺村名单。为了实现这一目标，区政府和富荣工匠协会花了4年时间建立档案，记录并数字化了200多种传统编织技术。',
        'story6.desc': '除了编织，富荣的居民还率先种植和保护稀有的藤本品种。',
        'story6.full': '面对日益稀缺的原材料，2020年，一群富荣工匠与生态和生物资源研究所合作，在村脚下建立了越南第一个藤苗圃。“绿色富荣”项目已经在5公顷的土地上种植了超过15000株藤本植物。'
    },
    ru: {
        'story1.desc': 'Обладая более чем 60-летним опытом работы, мастер Bảy — единственный ремесленник, до сих пор владеющий сложной техникой плетения драконов и фениксов на подносах из ротанга.',
        'story1.full': 'Nguyễn Văn Bảy, родившийся в 1938 году, начал плести в возрасте 8 лет под руководством своего отца. За 60 лет его руки создали тысячи уникальных работ, включая набор из 12 подносов с драконами и фениксами, выставленных в Вьетнамском этнографическом музее. Его декоративное плетение считается лучшим в Phú Vinh — каждый поднос требует до 3 месяцев работы и более 40 000 узлов. В 2018 году он был удостоен звания Заслуженного мастера.',
        'story2.desc': 'В 18 веке бамбуковые изделия из Phú Vinh были настолько изысканными, что их преподносили в качестве дани императорам.',
        'story2.full': 'Исторические записи показывают, что во время правления императора Lê Hiển Tông (18 век) местные чиновники преподнесли королевскому двору бамбуковые шкатулки, чайные подносы и блюда из Phú Vinh. Император был в восторге и приказал деревне регулярно поставлять изделия для внутреннего двора. Это был первый золотой век ремесленной деревни.',
        'story3.desc': 'Молодежь поколения Z из Phú Vinh не только наследует техники, но и применяет цифровые технологии, завоевывая рынки США и Европы.',
        'story3.full': 'Nguyễn Minh Quân, 1995 года рождения, закончил университет и вернулся в деревню вместо того, чтобы остаться в городе. Он основал компанию Phú Vinh Craft Export, продавая товары на Amazon и Etsy. Всего за 2 года экспортная выручка его команды достигла 3 миллиардов донгов в год, а продукция поставляется клиентам в 28 стран.',
        'story4.desc': 'В Phú Vinh дети 5-6 лет уже помогают чистить бамбук. Ремесло передается из поколения в поколение естественно, как дыхание.',
        'story4.full': 'Семья госпожи Trần Thị Hoa — одна из семей, занимающихся плетением на протяжении пяти поколений в Phú Vinh. От прабабушки до 7-летней дочери — каждый владеет как минимум одним этапом работы. Госпожа Hoa говорит: "Нас никто официально не учит. Дети смотрят на родителей и подражают им, и в какой-то момент они просто знают, как это делать".',
        'story5.desc': 'Неустанные усилия по сохранению ремесла принесли деревне признание международных организаций по охране наследия.',
        'story5.full': 'В 2019 году Phú Vinh был внесен в список ЮНЕСКО как представляющая традиционная ремесленная деревня Юго-Восточной Азии, нуждающаяся в сохранении. Чтобы достичь этого, районное правительство и Ассоциация ремесленников Phú Vinh потратили 4 года на создание досье, документирование и оцифровку более 200 традиционных техник плетения.',
        'story6.desc': 'Помимо плетения, жители Phú Vinh являются пионерами в выращивании и сохранении редких сортов ротанга.',
        'story6.full': 'Столкнувшись со все возрастающей нехваткой сырья, в 2020 году группа ремесленников Phú Vinh в партнерстве с Институтом экологии и биологических ресурсов создала первый во Вьетнаме питомник ротанга у подножия деревни. В рамках проекта "Зеленый Phú Vinh" на 5 гектарах было посажено более 15 000 растений ротанга.'
    },
    th: {
        'story1.desc': 'ด้วยประสบการณ์กว่า 60 ปี ปรมาจารย์ Bảy เป็นช่างฝีมือเพียงคนเดียวที่ยังคงเชี่ยวชาญเทคนิคการสานลวดลายมังกร-หงส์อันสลับซับซ้อนบนถาดหวาย',
        'story1.full': 'Nguyễn Văn Bảy เกิดในปี 1938 เริ่มต้นการสานเมื่ออายุ 8 ขวบภายใต้การแนะนำของพ่อ กว่า 60 ปี มือของเขาได้สร้างสรรค์ผลงานที่เป็นเอกลักษณ์หลายพันชิ้น รวมถึงชุดถาดมังกร-หงส์ 12 ชิ้นที่จัดแสดงในพิพิธภัณฑ์ชาติพันธุ์วิทยาเวียดนาม การสานเพื่อการตกแต่งของเขาถือว่าประณีตที่สุดในหมู่บ้าน Phú Vinh — ถาดแต่ละใบใช้เวลาทำนานถึง 3 เดือนด้วยการผูกปมกว่า 40,000 ครั้ง ในปี 2018 เขาได้รับรางวัลช่างฝีมือดีเด่น',
        'story2.desc': 'ในศตวรรษที่ 18 ผลิตภัณฑ์ไม้ไผ่ของ Phú Vinh มีความประณีตมากจนถูกนำไปถวายเป็นเครื่องบรรณาการแด่จักรพรรดิ',
        'story2.full': 'บันทึกทางประวัติศาสตร์แสดงให้เห็นว่าในรัชสมัยของจักรพรรดิ Lê Hiển Tông (ศตวรรษที่ 18) เจ้าหน้าที่ท้องถิ่นได้นำเสนอกล่องไม้ไผ่ ถาดชา และจานชามจาก Phú Vinh ต่อราชสำนัก จักรพรรดิทรงพอพระทัยและรับสั่งให้หมู่บ้านจัดหาสิ่งของเหล่านี้ให้กับราชสำนักเป็นประจำ นี่คือยุคทองยุคแรกของหมู่บ้านหัตถกรรมแห่งนี้',
        'story3.desc': 'เยาวชนเจน Z ของ Phú Vinh ไม่เพียงแต่สืบทอดเทคนิคดั้งเดิม แต่ยังประยุกต์ใช้เทคโนโลยีดิจิทัล เพื่อพิชิตตลาดในสหรัฐอเมริกาและยุโรป',
        'story3.full': 'Nguyễn Minh Quân เกิดในปี 1995 จบการศึกษาจากมหาวิทยาลัยและกลับมายังหมู่บ้านแทนที่จะทำงานในเมือง เขาก่อตั้ง Phú Vinh Craft Export โดยขายสินค้าบน Amazon และ Etsy ภายในเวลาเพียง 2 ปี รายได้จากการส่งออกของทีมของเขาถึง 3 พันล้านดองเวียดนาม/ปี นำผลิตภัณฑ์ไปสู่ลูกค้าใน 28 ประเทศ',
        'story4.desc': 'ใน Phú Vinh เด็กอายุ 5-6 ขวบเริ่มช่วยปอกไม้ไผ่แล้ว งานฝีมือนี้ถูกส่งต่อตามธรรมชาติเหมือนการหายใจผ่านหลายชั่วอายุคน',
        'story4.full': 'ครอบครัวของนาง Trần Thị Hoa เป็นหนึ่งในครอบครัวนักสานห้าชั่วอายุคนใน Phú Vinh ตั้งแต่ทวดจนถึงลูกสาววัย 7 ขวบ ทุกคนเชี่ยวชาญในขั้นตอนการทำอย่างน้อยหนึ่งขั้นตอน นาง Hoa กล่าวว่า "ไม่มีใครสอนเราอย่างเป็นทางการ เด็ก ๆ ดูพ่อแม่แล้วเลียนแบบ และถึงจุดหนึ่ง พวกเขาก็รู้ว่าจะต้องทำอย่างไร"',
        'story5.desc': 'ความพยายามในการอนุรักษ์อย่างไม่หยุดยั้งทำให้หมู่บ้านได้รับการยอมรับจากองค์กรมรดกโลก',
        'story5.full': 'ในปี 2019 Phú Vinh ได้รับการเพิ่มเข้าในรายชื่อหมู่บ้านหัตถกรรมดั้งเดิมที่เป็นตัวแทนของเอเชียตะวันออกเฉียงใต้ที่ต้องการการอนุรักษ์ของ UNESCO เพื่อให้บรรลุเป้าหมายนี้ รัฐบาลท้องถิ่นและสมาคมช่างฝีมือ Phú Vinh ใช้เวลา 4 ปีในการสร้างแฟ้มข้อมูล จัดทำเอกสารและสร้างรูปแบบดิจิทัลสำหรับเทคนิคการสานแบบดั้งเดิมกว่า 200 เทคนิค',
        'story6.desc': 'นอกเหนือจากการสาน ชาว Phú Vinh ยังเป็นผู้บุกเบิกในการเพาะปลูกและอนุรักษ์พันธุ์หวายหายาก',
        'story6.full': 'เมื่อต้องเผชิญกับปัญหาขาดแคลนวัตถุดิบมากขึ้น ในปี 2020 กลุ่มช่างฝีมือ Phú Vinh ร่วมมือกับสถาบันนิเวศวิทยาและทรัพยากรชีวภาพเพื่อจัดตั้งเรือนเพาะชำหวายแห่งแรกของเวียดนามที่เชิงเขาของหมู่บ้าน โครงการ "Green Phú Vinh" ได้ปลูกต้นหวายกว่า 15,000 ต้นในพื้นที่ 5 เฮกตาร์'
    },
    hi: {
        'story1.desc': 'इस कला में 60 से अधिक वर्षों के अनुभव के साथ, मास्टर Bảy एकमात्र शिल्पकार हैं जो अभी भी रतन की ट्रे पर जटिल ड्रैगन-फीनिक्स बुनाई तकनीक में महारत रखते हैं।',
        'story1.full': '1938 में जन्मे Nguyễn Văn Bảy ने अपने पिता के मार्गदर्शन में 8 साल की उम्र में बुनाई शुरू कर दी थी। 60 से अधिक वर्षों में, उनके हाथों ने हजारों अनूठी कृतियाँ बनाई हैं, जिनमें वियतनाम म्यूज़ियम ऑफ़ एथ्नोलॉजी में प्रदर्शित 12 ड्रैगन-फीनिक्स ट्रे का एक सेट शामिल है। उनकी सजावटी बुनाई को Phú Vinh में सबसे बेहतरीन माना जाता है - प्रत्येक ट्रे को बनने में 40,000 से अधिक गांठों के साथ 3 महीने तक का समय लगता है। 2018 में, उन्हें मेधावी शिल्पकार की उपाधि से सम्मानित किया गया था।',
        'story2.desc': '18वीं शताब्दी में, Phú Vinh के बांस के उत्पाद इतने उत्तम थे कि उन्हें सम्राटों को श्रद्धांजलि के रूप में पेश किया जाता था।',
        'story2.full': 'ऐतिहासिक रिकॉर्ड बताते हैं कि सम्राट Lê Hiển Tông (18वीं शताब्दी) के शासनकाल के दौरान, स्थानीय अधिकारियों ने Phú Vinh के बांस के बक्से, चाय की ट्रे और सर्विंग प्लेट राजदरबार में पेश किए। सम्राट प्रसन्न हुए और उन्होंने गांव को नियमित रूप से शाही दरबार में आपूर्ति करने का आदेश दिया। यह इस शिल्प गांव का पहला स्वर्ण युग था।',
        'story3.desc': 'जेन जेड Phú Vinh के युवा न केवल तकनीक विरासत में प्राप्त कर रहे हैं बल्कि डिजिटल तकनीक का भी उपयोग कर रहे हैं और अमेरिकी तथा यूरोपीय बाजारों को जीत रहे हैं।',
        'story3.full': '1995 में जन्मे Nguyễn Minh Quân ने विश्वविद्यालय से स्नातक की उपाधि प्राप्त की और शहर में रहने के बजाय गाँव लौट आए। उन्होंने Phú Vinh Craft Export की स्थापना की, जो Amazon और Etsy पर उत्पाद बेचती है। केवल 2 वर्षों में, उनकी टीम का निर्यात राजस्व 3 बिलियन VND/वर्ष तक पहुँच गया, जिससे उत्पाद 28 देशों के ग्राहकों तक पहुँच गए।',
        'story4.desc': 'Phú Vinh में, 5-6 साल के बच्चे पहले से ही बांस छीलने में मदद करते हैं। शिल्प को पीढ़ियों से सांस लेने की तरह स्वाभाविक रूप से पारित किया जाता है।',
        'story4.full': 'श्रीमती Trần Thị Hoa का परिवार Phú Vinh में पांच पीढ़ियों से बुनाई करने वाले परिवारों में से एक है। परदादी से लेकर 7 साल की बेटी तक, हर कोई कम से कम एक कदम में माहिर है। श्रीमती Hoa कहती हैं: "कोई भी हमें औपचारिक रूप से नहीं सिखाता। बच्चे अपने माता-पिता को देखते हैं और नकल करते हैं, और एक समय पर, वे जान जाते हैं कि इसे कैसे करना है।"',
        'story5.desc': 'अथक संरक्षण प्रयासों ने गांव को अंतरराष्ट्रीय विरासत संगठनों से मान्यता दिलाई है।',
        'story5.full': '2019 में, Phú Vinh को यूनेस्को की दक्षिण पूर्व एशिया के प्रतिनिधि पारंपरिक शिल्प गांवों की सूची में जोड़ा गया, जिन्हें संरक्षण की आवश्यकता है। इसे हासिल करने के लिए, जिला सरकार और Phú Vinh आर्टिसंस एसोसिएशन ने 200 से अधिक पारंपरिक बुनाई तकनीकों का दस्तावेजीकरण और डिजिटलीकरण करते हुए 4 साल का समय लगाया।',
        'story6.desc': 'बुनाई से परे, Phú Vinh के निवासी दुर्लभ रतन किस्मों की खेती और संरक्षण में अग्रणी हैं।',
        'story6.full': 'कच्चे माल की बढ़ती कमी का सामना करते हुए, 2020 में Phú Vinh के कारीगरों के एक समूह ने गांव के पास वियतनाम की पहली रतन नर्सरी स्थापित करने के लिए इंस्टीट्यूट ऑफ इकोलॉजी एंड बायोलॉजिकल रिसोर्सेज के साथ साझेदारी की। "Green Phú Vinh" परियोजना के तहत 5 हेक्टेयर भूमि पर 15,000 से अधिक रतन के पौधे लगाए गए हैं।'
    },
    ja: {
        'story1.desc': '60年以上の経験を持つBảy師匠は、ラタントレイに複雑な龍と鳳凰の模様を編み込む技術を今もなおマスターしている唯一の職人です。',
        'story1.full': '1938年生まれのNguyễn Văn Bảy氏は、父親の指導の下、8歳で編み物を始めました。60年以上にわたり、彼の手はベトナム民族学博物館に展示されている12の龍鳳トレイセットを含む数千のユニークな作品を生み出してきました。彼の装飾的な編み物はPhú Vinhで最も素晴らしいと考えられており、各トレイには4万以上の結び目が使われ、完成までに最大3ヶ月かかります。2018年、彼は優秀職人の称号を授与されました。',
        'story2.desc': '18世紀、Phú Vinhの竹製品は非常に精巧であったため、皇帝への貢物として献上されていました。',
        'story2.full': '歴史的記録によると、Lê Hiển Tông皇帝（18世紀）の治世中、地方役人がPhú Vinhの竹箱、茶盆、お皿を王室に献上しました。皇帝は大いに喜び、村に定期的に王室へ納めるよう命じました。これがこの工芸村の最初の黄金時代でした。',
        'story3.desc': 'Z世代のPhú Vinhの若者たちは、伝統技術を受け継ぐだけでなく、デジタル技術を応用してアメリカやヨーロッパの市場を開拓しています。',
        'story3.full': '1995年生まれのNguyễn Minh Quân氏は、大学を卒業後、都市には残らず村に戻りました。彼はPhú Vinh Craft Exportを設立し、AmazonやEtsyで販売を開始しました。わずか2年で、彼のチームの輸出収益は年間30億ドンに達し、28カ国の顧客に製品を届けています。',
        'story4.desc': 'Phú Vinhでは、5〜6歳の子供たちがすでに竹を割る手伝いをしています。工芸は呼吸をするように、世代から世代へと自然に受け継がれていきます。',
        'story4.full': 'Trần Thị Hoa夫人の家族は、Phú Vinhで5世代続く編み物家族の一つです。曾祖母から7歳の娘まで、誰もが少なくとも1つの工程をマスターしています。Hoa夫人は「誰も正式に教えてはくれません。子供たちは親を見て真似をし、ある時点で自然とやり方を覚えるのです」と語ります。',
        'story5.desc': '絶え間ない保全の努力により、この村は国際的な遺産機関から認められました。',
        'story5.full': '2019年、Phú Vinhはユネスコの「保護が必要な東南アジアの代表的な伝統工芸村」リストに追加されました。これを達成するために、地方政府とPhú Vinh職人協会は、200以上の伝統的な編み物技術を文書化し、デジタル化するための資料作成に4年を費やしました。',
        'story6.desc': '編み物にとどまらず、Phú Vinhの住民は希少なラタン（籐）品種の栽培と保全の先駆者となっています。',
        'story6.full': '原材料の不足が深刻化する中、2020年にPhú Vinhの職人グループは生態・生物資源研究所と提携し、村のふもとにベトナム初のラタン苗木園を設立しました。「Green Phú Vinh」プロジェクトにより、5ヘクタールの敷地に15,000本以上のラタンが植えられました。'
    },
    ko: {
        'story1.desc': '60년 이상의 경력을 가진 Bảy 장인은 라탄 트레이에 복잡한 용과 봉황 무늬를 짜넣는 기술을 아직도 마스터하고 있는 유일한 장인입니다.',
        'story1.full': '1938년생인 Nguyễn Văn Bảy는 아버지의 지도 아래 8살 때부터 짜기 시작했습니다. 60년이 넘는 세월 동안 그의 손은 베트남 민족학 박물관에 전시된 12개의 용-봉황 트레이 세트를 포함하여 수천 개의 독특한 작품을 만들어 냈습니다. 그의 장식용 짜임새는 Phú Vinh에서 가장 훌륭한 것으로 간주되며, 각 트레이는 40,000개 이상의 매듭으로 완성하는 데 최대 3개월이 걸립니다. 2018년에 그는 공훈 장인 칭호를 받았습니다.',
        'story2.desc': '18세기에 Phú Vinh의 대나무 제품은 너무 정교하여 황제에게 공물로 바쳐졌습니다.',
        'story2.full': '역사적 기록에 따르면 Lê Hiển Tông 황제(18세기) 통치 기간 동안 지방 관리들이 Phú Vinh의 대나무 상자, 차 쟁반, 서빙 접시를 왕실에 바쳤다고 합니다. 황제는 기뻐하며 마을에 정기적으로 왕실에 공급할 것을 명령했습니다. 이곳이 이 공예 마을의 첫 번째 황금기였습니다.',
        'story3.desc': 'Z세대 Phú Vinh 청년들은 기술을 물려받을 뿐만 아니라 디지털 기술을 적용하여 미국과 유럽 시장을 정복하고 있습니다.',
        'story3.full': '1995년생인 Nguyễn Minh Quân은 대학을 졸업하고 도시에 머물지 않고 마을로 돌아왔습니다. 그는 Phú Vinh Craft Export를 설립하여 Amazon과 Etsy에서 판매를 시작했습니다. 단 2년 만에 그의 팀의 수출 수익은 연간 30억 동에 달했으며 28개국의 고객에게 제품을 제공하고 있습니다.',
        'story4.desc': 'Phú Vinh에서는 5-6세의 아이들이 이미 대나무 껍질 벗기는 것을 돕고 있습니다. 이 공예는 숨 쉬는 것처럼 자연스럽게 세대를 거쳐 전해집니다.',
        'story4.full': 'Trần Thị Hoa 부인의 가족은 Phú Vinh에서 5대째 이어지는 직조 가족 중 하나입니다. 증조할머니부터 7살 된 딸까지 모든 사람이 최소한 한 가지 단계를 마스터합니다. Hoa 부인은 "아무도 공식적으로 가르쳐 주지 않아요. 아이들은 부모님을 보고 모방하다가 어느 순간 어떻게 하는지 알게 되죠."라고 말합니다.',
        'story5.desc': '끊임없는 보존 노력 덕분에 이 마을은 국제 문화 유산 기관으로부터 인정을 받았습니다.',
        'story5.full': '2019년에 Phú Vinh은 보존이 필요한 동남아시아의 대표적인 전통 공예 마을 유네스코 목록에 추가되었습니다. 이를 달성하기 위해 지방 정부와 Phú Vinh 장인 협회는 200개가 넘는 전통 직조 기술을 문서화하고 디지털화하여 서류를 만드는 데 4년을 보냈습니다.',
        'story6.desc': '직조를 넘어 Phú Vinh 주민들은 희귀한 라탄 품종의 재배와 보존을 개척하고 있습니다.',
        'story6.full': '원자재가 점점 더 부족해짐에 따라 2020년에 Phú Vinh의 장인 그룹은 생태 및 생물 자원 연구소와 협력하여 마을 기슭에 베트남 최초의 라탄 보육원을 설립했습니다. "Green Phú Vinh" 프로젝트를 통해 5헥타르에 15,000그루 이상의 라탄 식물을 심었습니다.'
    },
    fr: {
        'story1.desc': 'Avec plus de 60 ans d\'expérience dans le métier, le maître Bảy est le seul artisan qui maîtrise encore la technique complexe du tissage dragon-phénix sur les plateaux en rotin.',
        'story1.full': 'Nguyễn Văn Bảy, né en 1938, a commencé à tisser à l\'âge de 8 ans sous la direction de son père. Au cours de plus de 60 ans, ses mains ont créé des milliers d\'œuvres uniques, dont un ensemble de 12 plateaux dragon-phénix exposés au Musée d\'ethnologie du Vietnam. Son tissage décoratif est considéré comme le plus fin de Phú Vinh — chaque plateau nécessite jusqu\'à 3 mois de travail avec plus de 40 000 nœuds. En 2018, il a reçu le titre d\'Artisan Méritoire.',
        'story2.desc': 'Au XVIIIe siècle, les produits en bambou de Phú Vinh étaient si exquis qu\'ils étaient offerts en tribut aux empereurs.',
        'story2.full': 'Les archives historiques montrent que sous le règne de l\'empereur Lê Hiển Tông (XVIIIe siècle), les responsables locaux ont présenté des boîtes en bambou, des plateaux à thé et des assiettes de Phú Vinh à la cour royale. L\'empereur fut ravi et ordonna au village d\'approvisionner régulièrement la cour. Ce fut le premier âge d\'or du village artisanal.',
        'story3.desc': 'Les jeunes de la génération Z de Phú Vinh héritent non seulement des techniques, mais appliquent également la technologie numérique, à la conquête des marchés américain et européen.',
        'story3.full': 'Nguyễn Minh Quân, né en 1995, est diplômé de l\'université et est retourné au village au lieu de rester en ville. Il a fondé Phú Vinh Craft Export, vendant sur Amazon et Etsy. En seulement 2 ans, les revenus d\'exportation de son équipe ont atteint 3 milliards de VND/an, apportant des produits à des clients dans 28 pays.',
        'story4.desc': 'À Phú Vinh, les enfants de 5-6 ans aident déjà à décortiquer le bambou. L\'artisanat se transmet naturellement, comme la respiration, à travers les générations.',
        'story4.full': 'La famille de Mme Trần Thị Hoa est l\'une des familles de tisserands de cinq générations à Phú Vinh. De l\'arrière-grand-mère à la fille de 7 ans, tout le monde maîtrise au moins une étape. Mme Hoa déclare : "Personne ne nous enseigne officiellement. Les enfants regardent leurs parents et les imitent, et à un moment donné, ils savent tout simplement comment le faire."',
        'story5.desc': 'Les efforts incessants de conservation ont valu au village la reconnaissance des organisations internationales du patrimoine.',
        'story5.full': 'En 2019, Phú Vinh a été ajouté à la liste de l\'UNESCO des villages artisanaux traditionnels représentatifs de l\'Asie du Sud-Est nécessitant une préservation. Pour y parvenir, le gouvernement du district et l\'Association des artisans de Phú Vinh ont passé 4 ans à constituer le dossier, documentant et numérisant plus de 200 techniques de tissage traditionnelles.',
        'story6.desc': 'Au-delà du tissage, les résidents de Phú Vinh sont des pionniers dans la culture et la conservation de variétés rares de rotin.',
        'story6.full': 'Confronté à la rareté croissante des matières premières, un groupe d\'artisans de Phú Vinh s\'est associé en 2020 à l\'Institut d\'écologie et de ressources biologiques pour créer la première pépinière de rotin du Vietnam au pied du village. Le projet "Green Phú Vinh" a permis de planter plus de 15 000 plants de rotin sur 5 hectares.'
    },
    de: {
        'story1.desc': 'Mit über 60 Jahren Erfahrung in diesem Handwerk ist Meister Bảy der einzige Handwerker, der die komplizierte Drachen-Phönix-Webtechnik auf Rattantabletts noch beherrscht.',
        'story1.full': 'Nguyễn Văn Bảy, geboren 1938, begann im Alter von 8 Jahren unter der Anleitung seines Vaters mit dem Weben. In über 60 Jahren haben seine Hände Tausende von einzigartigen Werken geschaffen, darunter ein Set von 12 Drachen-Phönix-Tabletts, die im Ethnologischen Museum von Vietnam ausgestellt sind. Sein dekoratives Weben gilt als das feinste in Phú Vinh — jedes Tablett erfordert bis zu 3 Monate Arbeit mit über 40.000 Knoten. Im Jahr 2018 wurde ihm der Titel "Verdienter Handwerker" verliehen.',
        'story2.desc': 'Im 18. Jahrhundert waren die Bambusprodukte von Phú Vinh so exquisit, dass sie den Kaisern als Tribut dargebracht wurden.',
        'story2.full': 'Historische Aufzeichnungen zeigen, dass lokale Beamte während der Herrschaft von Kaiser Lê Hiển Tông (18. Jahrhundert) dem königlichen Hof Bambuskisten, Teetabletts und Servierteller aus Phú Vinh präsentierten. Der Kaiser war begeistert und befahl dem Dorf, den Hof regelmäßig zu beliefern. Dies war das erste goldene Zeitalter des Handwerksdorfes.',
        'story3.desc': 'Die Jugend der Generation Z in Phú Vinh erbt nicht nur Techniken, sondern wendet auch digitale Technologien an, um den US- und den europäischen Markt zu erobern.',
        'story3.full': 'Nguyễn Minh Quân, geboren 1995, schloss sein Universitätsstudium ab und kehrte in das Dorf zurück, anstatt in der Stadt zu bleiben. Er gründete Phú Vinh Craft Export und verkauft über Amazon und Etsy. In nur 2 Jahren erreichten die Exporteinnahmen seines Teams 3 Milliarden VND/Jahr und brachten Produkte zu Kunden in 28 Ländern.',
        'story4.desc': 'In Phú Vinh helfen Kinder im Alter von 5-6 Jahren bereits beim Schälen des Bambus. Das Handwerk wird auf natürliche Weise, wie das Atmen, über Generationen weitergegeben.',
        'story4.full': 'Die Familie von Frau Trần Thị Hoa ist eine der fünf Generationen von Weberfamilien in Phú Vinh. Von der Urgroßmutter bis zur 7-jährigen Tochter beherrscht jeder mindestens einen Arbeitsschritt. Frau Hoa sagt: "Niemand bringt es uns formell bei. Kinder beobachten ihre Eltern und ahmen sie nach, und irgendwann wissen sie einfach, wie es geht."',
        'story5.desc': 'Die unermüdlichen Bemühungen um den Erhalt haben dem Dorf die Anerkennung internationaler Kulturerbe-Organisationen eingebracht.',
        'story5.full': 'Im Jahr 2019 wurde Phú Vinh in die UNESCO-Liste der repräsentativen traditionellen Handwerksdörfer Südostasiens aufgenommen, die erhalten werden müssen. Um dies zu erreichen, verbrachten die Bezirksregierung und die Vereinigung der Handwerker von Phú Vinh 4 Jahre damit, das Dossier zu erstellen sowie über 200 traditionelle Webtechniken zu dokumentieren und zu digitalisieren.',
        'story6.desc': 'Über das Weben hinaus sind die Bewohner von Phú Vinh Pioniere im Anbau und Erhalt seltener Rattan-Sorten.',
        'story6.full': 'Angesichts immer knapper werdender Rohstoffe schloss sich 2020 eine Gruppe von Handwerkern aus Phú Vinh mit dem Institut für Ökologie und biologische Ressourcen zusammen, um Vietnams erste Rattan-Baumschule am Fuße des Dorfes zu gründen. Das Projekt "Green Phú Vinh" hat über 15.000 Rattan-Pflanzen auf 5 Hektar gepflanzt.'
    },
    it: {
        'story1.desc': 'Con oltre 60 anni di esperienza nel mestiere, il maestro Bảy è l\'unico artigiano che padroneggia ancora l\'intricata tecnica di tessitura drago-fenice sui vassoi di rattan.',
        'story1.full': 'Nguyễn Văn Bảy, nato nel 1938, ha iniziato a tessere all\'età di 8 anni sotto la guida del padre. In oltre 60 anni, le sue mani hanno creato migliaia di opere uniche, tra cui un set di 12 vassoi drago-fenice esposti al Museo di Etnologia del Vietnam. La sua tessitura decorativa è considerata la più raffinata di Phú Vinh — ogni vassoio richiede fino a 3 mesi di lavoro con oltre 40.000 nodi. Nel 2018, gli è stato conferito il titolo di Artigiano Meritevole.',
        'story2.desc': 'Nel XVIII secolo, i prodotti in bambù di Phú Vinh erano così squisiti che venivano offerti in tributo agli imperatori.',
        'story2.full': 'I documenti storici mostrano che durante il regno dell\'imperatore Lê Hiển Tông (XVIII secolo), i funzionari locali presentarono scatole di bambù, vassoi da tè e piatti di Phú Vinh alla corte reale. L\'imperatore ne fu deliziato e ordinò al villaggio di rifornire regolarmente la corte. Questa fu la prima età dell\'oro del villaggio artigianale.',
        'story3.desc': 'I giovani della generazione Z di Phú Vinh non solo ereditano le tecniche, ma applicano la tecnologia digitale, conquistando i mercati di Stati Uniti ed Europa.',
        'story3.full': 'Nguyễn Minh Quân, nato nel 1995, si è laureato all\'università ed è tornato al villaggio invece di restare in città. Ha fondato Phú Vinh Craft Export, vendendo su Amazon ed Etsy. In soli 2 anni, i ricavi delle esportazioni del suo team hanno raggiunto i 3 miliardi di VND/anno, portando i prodotti a clienti in 28 paesi.',
        'story4.desc': 'A Phú Vinh, i bambini di 5-6 anni aiutano già a sbucciare il bambù. Il mestiere si tramanda naturalmente, come il respiro, attraverso le generazioni.',
        'story4.full': 'La famiglia della sig.ra Trần Thị Hoa è una delle famiglie di tessitori di cinque generazioni a Phú Vinh. Dalla bisnonna alla figlia di 7 anni, tutti padroneggiano almeno un passaggio. La sig.ra Hoa dice: "Nessuno ce lo insegna formalmente. I bambini guardano i genitori e li imitano, e a un certo punto sanno semplicemente come farlo".',
        'story5.desc': 'I continui sforzi di conservazione hanno fatto guadagnare al villaggio il riconoscimento delle organizzazioni internazionali per il patrimonio.',
        'story5.full': 'Nel 2019, Phú Vinh è stata aggiunta alla lista dell\'UNESCO dei villaggi artigianali tradizionali rappresentativi del sud-est asiatico che necessitano di conservazione. Per ottenere questo risultato, il governo distrettuale e l\'Associazione degli artigiani di Phú Vinh hanno trascorso 4 anni a costruire il dossier, documentando e digitalizzando oltre 200 tecniche di tessitura tradizionali.',
        'story6.desc': 'Oltre alla tessitura, i residenti di Phú Vinh sono pionieri nella coltivazione e nella conservazione di rare varietà di rattan.',
        'story6.full': 'Di fronte alla crescente scarsità di materie prime, nel 2020 un gruppo di artigiani di Phú Vinh ha collaborato con l\'Istituto di Ecologia e Risorse Biologiche per creare il primo vivaio di rattan del Vietnam ai piedi del villaggio. Il progetto "Green Phú Vinh" ha piantato oltre 15.000 piante di rattan su 5 ettari.'
    },
    no: {
        'story1.desc': 'Med over 60 år i faget er Mester Bảy den eneste håndverkeren som fremdeles behersker den intrikate drage-føniks-veveteknikken på rottingbrett.',
        'story1.full': 'Nguyễn Văn Bảy, født i 1938, begynte å veve 8 år gammel under farens veiledning. I løpet av mer enn 60 år har hendene hans skapt tusenvis av unike verk, inkludert et sett med 12 drage-føniks-brett utstilt på Vietnam Etnologisk Museum. Hans dekorative veving regnes som den fineste i Phú Vinh — hvert brett tar opptil 3 måneder med over 40 000 knuter. I 2018 ble han tildelt tittelen Fortjenstfull Håndverker.',
        'story2.desc': 'På 1700-tallet var bambusproduktene fra Phú Vinh så utsøkte at de ble tilbudt som tributt til keiserne.',
        'story2.full': 'Historiske opptegnelser viser at under keiser Lê Hiển Tôngs regjeringstid (1700-tallet) presenterte lokale embetsmenn bambusbokser, tebrett og serveringsfat fra Phú Vinh til det kongelige hoffet. Keiseren ble henrykt og beordret landsbyen til å forsyne hoffet jevnlig. Dette var den første gullalderen for håndverkslandsbyen.',
        'story3.desc': 'Gen Z-ungdommen i Phú Vinh arver ikke bare teknikker, men tar i bruk digital teknologi og erobrer markeder i USA og Europa.',
        'story3.full': 'Nguyễn Minh Quân, født i 1995, ble uteksaminert fra universitetet og returnerte til landsbyen i stedet for å bli i byen. Han grunnla Phú Vinh Craft Export og solgte på Amazon og Etsy. På bare 2 år nådde teamets eksportinntekter 3 milliarder VND/år, og brakte produkter til kunder i 28 land.',
        'story4.desc': 'I Phú Vinh hjelper 5-6 år gamle barn allerede til med å skrelle bambus. Håndverket går i arv naturlig, som å puste, gjennom generasjoner.',
        'story4.full': 'Familien til fru Trần Thị Hoa er en av veverfamiliene i fem generasjoner i Phú Vinh. Fra oldemoren til den 7 år gamle datteren behersker alle minst ett trinn. Fru Hoa sier: "Ingen lærer oss det formelt. Barn ser på foreldrene og etterligner dem, og på et tidspunkt vet de bare hvordan det gjøres."',
        'story5.desc': 'Nådeløs bevaringsinnsats har gitt landsbyen anerkjennelse fra internasjonale kulturarvsorganisasjoner.',
        'story5.full': 'I 2019 ble Phú Vinh lagt til på UNESCOs liste over representative tradisjonelle håndverkslandsbyer i Sørøst-Asia som trenger bevaring. For å oppnå dette brukte distriktsregjeringen og Phú Vinh Håndverkerforening 4 år på å bygge opp saksmappen, samt dokumentere og digitalisere over 200 tradisjonelle veveteknikker.',
        'story6.desc': 'Utover veving er innbyggerne i Phú Vinh pionerer innen dyrking og bevaring av sjeldne rottingsorter.',
        'story6.full': 'Møtt med stadig knappere råvarer inngikk en gruppe Phú Vinh-håndverkere i 2020 et samarbeid med Institutt for økologi og biologiske ressurser for å etablere Vietnams første rottingplanteskole ved foten av landsbyen. "Green Phú Vinh"-prosjektet har plantet over 15 000 rottingplanter på 5 hektar.'
    }
};

let updatedContent = content;

for (const [lang, translations] of Object.entries(TEXT)) {
    for (const [key, text] of Object.entries(translations)) {
        // Safe escape single quotes and backticks
        const escapedText = text.replace(/`/g, '\\`');
        
        // Find the line that looks like `'story1.full': \`...\`,` or `'story1.full': \`El maestro Bảy...\`,`
        const regex = new RegExp(`('${key}':\\s*\`)([\\s\\S]*?)(\`,)`, 'g');
        
        // Let's replace ONLY inside the specific language block to be absolutely safe
        let blockStart = updatedContent.indexOf(`\n    ${lang}: {`);
        if (blockStart === -1) blockStart = updatedContent.indexOf(`\n\t${lang}: {`);
        if (blockStart === -1) blockStart = updatedContent.indexOf(`\n    "${lang}": {`);
        
        if (blockStart !== -1) {
            let blockEnd = updatedContent.indexOf(`\n    },`, blockStart);
            if (blockEnd === -1) blockEnd = updatedContent.indexOf(`\n    }`, blockStart);
            if (blockEnd !== -1) {
                let block = updatedContent.substring(blockStart, blockEnd);
                block = block.replace(regex, `$1${escapedText}$3`);
                updatedContent = updatedContent.substring(0, blockStart) + block + updatedContent.substring(blockEnd);
            }
        }
    }
}

fs.writeFileSync(file, updatedContent, 'utf-8');
console.log('Successfully applied full translations for 11 languages!');
