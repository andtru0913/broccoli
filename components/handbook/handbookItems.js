import {
    FaBed,
    FaClock,
    FaCocktail,
    FaGift,
    FaHandshake,
    FaMoneyBillWave,
    FaPhone,
    FaTree
} from "react-icons/fa"

const HB_ITEMS = [
    {
        swedishtitle: "Tidrapportering",
        englishtitle: "Time Management",
        filename: "timemanagement.md",
        "icon": <FaClock className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Ledighet",
        englishtitle: "Leave",
        filename: "leave.md",
        "icon": <FaCocktail  className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Sjuk",
        englishtitle: "Illness",
        filename: "illness.md",
        icon: <FaBed color={"white"} className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Förmåner",
        englishtitle: "Benefits",
        filename: "benefits.md",
        icon: <FaGift className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Försäkringar",
        englishtitle: "Insurances",
        filename: "insurance.md",
        icon: <FaMoneyBillWave className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Tipsbonus",
        englishtitle: "Tip bonus",
        filename: "tipbonus.md",
        icon: <FaHandshake color={"white"} className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Broccoligården",
        englishtitle: "Broccoligården",
        filename: "broccoligården.md",
        icon: <FaTree className={"mx-auto"} size={80}/>
    },
    {
        swedishtitle: "Kontaktuppgifter",
        englishtitle: "Contact information",
        filename: "contact.md",
        icon: <FaPhone className={"mx-auto"} size={80}/>
    }
]
export default HB_ITEMS