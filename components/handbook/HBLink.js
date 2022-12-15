
const style = [{div: "bg-primary-1", text: "text-black", icon: ""},{div: "bg-secondary-1", text: "text-black", icon: ""}, {div: "bg-tertiary-1", text: "text-white", icon: "bg-transparent"}]

const HBLink = ({category, i}) => {
   return (
       <a href={`./handbook/swedish/${category.filename}`} key={i} style={{height: "15vw"}} className={`${style[i%3].div} m-0 p-0 flex flex-col justify-center transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted `}>
           {category["icon"]}
            <p className={`${style[i%3].text} mx-auto`}>{category.swedishtitle}</p>
       </a>
   )
}

export default HBLink