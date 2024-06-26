import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {

    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if(resInfo == null)
        return (
            <div className="min-h-[45vh]">
                <Shimmer />
            </div>
    )

    const {name, cuisines, costForTwoMessage} = 
            resInfo?.cards[2]?.card?.card?.info

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                            (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    // console.log(categories)


    return (
        <div className="min-h-[45vh]">
            <div className=" text-center">
                <h1 className="font-bold my-10 text-2xl">{name}</h1>
                <p className=" font-bold text-lg">
                    {cuisines.join(", ")} - {costForTwoMessage}
                </p>

                {/* Categories accordians */}

                {categories.map((category, index) => 
                    <RestaurantCategory 
                        key={category?.card?.card?.title} 
                        data = {category?.card?.card} 
                        showItems = {index == showIndex ? true : false}
                        setShowIndex = {() => 
                            setShowIndex(index === showIndex ? null : index)
                            }
                    />
                )}
            
            </div>
        </div>
        
    )
}

export default RestaurantMenu;