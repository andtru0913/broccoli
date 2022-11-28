import HB_ITEMS from "./handbookItems";


const navHandbook = ({ language }) => {

    return  (
        language === "english" ?
        <div className={"flex flex-col"}>
            {HB_ITEMS.map((item, i) => (
                <a key={i} href={item.filename}>{item.englishtitle}</a>
            ))}
        </div>
    :
        <div className={"flex flex-col"}>
            {HB_ITEMS.map((item, i) => (
                <a key={i} href={item.filename}>{item.swedishtitle}</a>
            ))}
        </div>
    )
}

export default navHandbook;
