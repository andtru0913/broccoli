import LayoutIntranet from "../../../components/layout/layoutIntranet";
import HandbookChapter from "../../../components/handbook/handbookChapter";
import {useState} from "react";



const index = () => {
    const [chapter, setChapter] = useState(false);
    const [section, setSection] = useState(false);
    const [english, setEnglish] = useState(false);
  return <LayoutIntranet>
      <button onClick={() => setEnglish(false)}>Svenska</button>
      <button onClick={() => setEnglish(true)}>Engelska</button>
    <div className="flex flex-col  items-center rounded-md h-auto ">
        {english ?
        inEnglish.map((d) => {
            return (
                <HandbookChapter
                    data={d}
                    index={chapter}
                    setIndex={setChapter}
                    section={section}
                    setSection={setSection}
                    english={english}
                ></HandbookChapter>
            );
        })
        :
      inSwedish.map((d) => {
        return (
            <HandbookChapter
                data={d}
                index={chapter}
                setIndex={setChapter}
                section={section}
                setSection={setSection}
                english={english}
            ></HandbookChapter>
        );
      })}
    </div>
  </LayoutIntranet>;
};

export default index;

const inSwedish = [
  {
    id: 1,
    topic: "Inledning",
    text: "Personalhandboken är till för dig som är anställd på Broccoli Engineers AB. Här finns fakta om\n" +
        "de regler och rutiner som Broccoli tillämpar. Syftet med personalhandboken är dels att spara tid\n" +
        "när frågor uppstår och dels att ge nyanställda en grundläggande introduktion om företaget.\n" +
        "Dokumentet är ett internt dokument och ska därför inte delas utanför företaget.\n",
    children:
        [
            {
                id: 1,
                topic: "Företagets historia",
                text: "Broccoli grundades av Björn Bergholm år 1993 som ett hobbybolag vid sidan om Chalmersstudierna. Hösten 2003 började Björn driva företaget på heltid och den inledning mars 2005 anställdes\n" +
                "den första kollegan. Under de efterföljande åren har bolaget vuxit och utvecklats till ett\n" +
                "teknikintensivt ingenjörsbolag. År 2010 var bolaget ett gasellföretag då det vuxit med 334 %. År\n" +
                "2013 skapades en koncernstruktur med Broccoli Engineering AB som moderbolag och de två\n" +
                "dotterbolagen Broccoli Engineers AB och Broccoli Systems AB.\n" +
                "Broccoli Systems AB startades tillsammans med hälftenägaren Per Björheden och kom senare\n" +
                "även att innehålla Broccoli Test Systems AB, Broccoli Architects AB och Broccoli Technologies\n" +
                "AB. inledning maj 2019 sålde Broccoli dotterbolaget Broccoli Systems och dess döttrar. Dessa bolag\n" +
                "bytte då namn till Tribuit. Sommaren 2020 köptes Broccoligården, en anläggning på Orust som\n" +
                "anställda skall kunna nyttja i arbete samt privat",
            },
            {
                id: 2,
                topic: "Affärsidé",
                text: "Broccolis affärsidé är att med företagets kompetens inom elektronik och mjukvara kunna erbjuda\n" +
                    "tjänster inom design, konstruktion och testning av inbyggda system. T.ex. schemaritning, PCBlayout, mjukvaruutveckling, framtagning av system för automatiserad testning mm.\n" +
                    "Vi hjälper till att täcka behov inom området elektronik och mjukvara i flera olika branscher.\n",
            },
            {
                id: 3,
                topic: "Broccolis organisation",
                text: "På Broccoli arbetar i dagsläget ca 47 personer, med en ungefärlig fördelning mellan kvinnor och\n" +
                    "män på ca 45% resp. 55%. Av dessa är ca 5 personer administrativ personal, resterande är\n" +
                    "konsulter. Merparten av konsulterna sitter ute i uppdrag hos kund. Broccoli har sitt huvudkontor i\n" +
                    "Göteborg.\n",
            },
        ]
  },
    {
        id: 2,
        topic: "Miljö- och kvalitetsarbete",
        text: "Broccoli blev certifierade enligt ISO9001 och ISO14001 i april 2019. Vi följer arbetssättet enligt\n" +
            "vår Verksamhetsmanual som uppdateras löpande.\n",
        children:
            [
                {
                    id: 1,
                    topic: "Kvalitets- och miljöpolicy",
                    text: "Följande kvalitets- och miljöpolicy gäller för Broccoli:\n" +
                        "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda\n" +
                        "system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom\n" +
                        "fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som\n" +
                        "trivs och utvecklas.\n" +
                        "Vårt kvalitetsarbete:\n" +
                        "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är\n" +
                        "självklarheter för oss.\n" +
                        "Vårt miljöåtagande:\n" +
                        "Vi vill skydda vår miljö och förhindra förorening genom medvetna val.\n" +
                        "Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster\n" +
                        "och produkter som är mer energieffektiva, samt reducera våra CO2 ekvivalenta utsläpp som\n" +
                        "påverkar växthuseffekten.\n" +
                        "Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår\n" +
                        "verksamhet.",
                },
                {
                    id: 2,
                    topic: "Kärnvärden",
                    text: "På Broccoli har vi tagit fram följande kärnvärden/ These are the core values for Broccoli:\n" +
                        "RELATIONER\n" +
                        "På Broccoli arbetar vi inkluderande, visar ömsesidig respekt och bjuder aktivt in berörda i\n" +
                        "dialogen. Genom våra olikheter bygger vi en stark gemenskap. Vi lär oss även kontinuerligt\n" +
                        "genom kunskapsdelning och inspiration av varandra vilket leder till vår trevliga företagskultur.\n" +
                        "PROFESSIONALISM\n" +
                        "Nöjda kunder får vi genom att prioritera teknisk kompetens och kvalitet samt genom att vara\n" +
                        "lyhörda för behoven. Vi är en partner med goda ambitioner och fokus på att garantera ett bra\n" +
                        "resultat. Kontinuerlig utveckling genom kommunikation, ambition, adaptionsförmåga och\n" +
                        "vidareutbildning leder till yrkesstolthet och ett högt engagemang.\n" +
                        "HÅLLBAR UTVECKLING\n" +
                        "Vi värderar hållbarhet genom ekonomiskt sinne samt personlig och teknisk utveckling. Vi gör\n" +
                        "medvetna val för en långsiktig utveckling vilket ger oss trygghet, frihet och en känsla av att vi\n" +
                        "tillsammans bidrar till det bättre.\n",
                },
            ]
    }
];

const inEnglish = [
    {
        id: 1,
        topic: "Introduction",
        text: "The employee manual is for you who are employed at Broccoli. The employee manual contains\n" +
            "information about the company culture, policies and procedures applied at Broccoli. The\n" +
            "purpose is to provide all employees with basic information about the company. The document is\n" +
            "an internal document and should therefore not be shared outside the company.\n",
        children:
            [{
                id: 1,
                topic: "Company History",
                text: "Broccoli was founded by Björn Bergholm in 1993 as a hobby company alongside his Chalmers\n" +
                    "studies. In the autumn of 2003 Björn began to run the company on a full-time basis and on 1\n" +
                    "March 2005 the first colleague was employed. Over the years, the company has grown and\n" +
                    "developed into a technology-intensive engineering company. In 2010, the company grew 334%\n" +
                    "and won a prize, DI Gazell, as one of the fastest growing companies in Sweden. In 2013, a\n" +
                    "company group was established with Broccoli Engineering AB as the parent company and\n" +
                    "Broccoli Engineers AB and Broccoli Systems AB is subsidiaries. Broccoli Systems AB was\n" +
                    "started with associate Per Björheden and the company grew to include Broccoli Test Systems\n" +
                    "AB, Broccoli Architects AB and Broccoli Technologies AB. May 1 2019 Broccoli sold the\n" +
                    "daughter company group Broccoli Systems, and they changed name to Tribuit. In 2020\n" +
                    "Broccoligården was bought, a facility at Orust which employees can use in work and off work.",
            }]
    }
];