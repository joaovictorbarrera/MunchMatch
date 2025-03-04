import { Meal } from "../client/src/components/HomeSteps/MealSelectionStep";
import { Result } from "../client/src/components/HomeSteps/ResultStep";

export const mockDishData: Meal[] = [
    {
        imageUrl: "https://www.allrecipes.com/thmb/ZhDrBmciWzegNpBWB-5LXEvULao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_4x3_2424-8d7bf30b2622465f9dd78a2c6277eeb8.jpg",
        title: "Spaghetti with Tomato Sauce",
        nutrition: {
            calories: 700,
            protein: 40,
            carbs: 100,
            fat: 15
        },
        mealID: 192
    },
    {
        imageUrl: "https://www.savorywithsoul.com/wp-content/uploads/2019/10/BaconMacCheese-32.jpg",
        title: "Bacon Mac and Cheese",
        nutrition: {
            calories: 1000,
            protein: 25,
            carbs: 70,
            fat: 50
        },
        mealID: 193
    },
    {
        imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
        title: "Caesar Salad with Grilled Chicken",
        nutrition: {
            calories: 350,
            protein: 50,
            carbs: 5,
            fat: 10
        },
        mealID: 196
    },
    {
        imageUrl: "https://www.eatwell101.com/wp-content/uploads/2021/07/Healthy-Chicken-with-Vegetable-Skillet-1.jpg",
        title: "Chicken and Vegetables Skillet",
        nutrition: {
            calories: 600,
            protein: 70,
            carbs: 50,
            fat: 50
        },
        mealID: 12
    },
]

export const mockResultData: Result = {
    resultID: 987,
    mealPlans: [
        {
            breakfast: {
                imageUrl: "https://www.allrecipes.com/thmb/ZhDrBmciWzegNpBWB-5LXEvULao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_4x3_2424-8d7bf30b2622465f9dd78a2c6277eeb8.jpg",
                title: "Spaghetti with Tomato Sauce",
                nutrition: {
                    calories: 700,
                    protein: 40,
                    carbs: 100,
                    fat: 15
                },
                mealID: 192
            },
            lunch: {
                imageUrl: "https://www.savorywithsoul.com/wp-content/uploads/2019/10/BaconMacCheese-32.jpg",
                title: "Bacon Mac and Cheese",
                nutrition: {
                    calories: 1000,
                    protein: 25,
                    carbs: 70,
                    fat: 50
                },
                mealID: 193
            },
            snack: {
                imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
                title: "Caesar Salad with Grilled Chicken",
                nutrition: {
                    calories: 350,
                    protein: 50,
                    carbs: 5,
                    fat: 10
                },
                mealID: 196
            },
            dinner: {
                imageUrl: "https://www.eatwell101.com/wp-content/uploads/2021/07/Healthy-Chicken-with-Vegetable-Skillet-1.jpg",
                title: "Chicken and Vegetables Skillet",
                nutrition: {
                    calories: 600,
                    protein: 70,
                    carbs: 50,
                    fat: 50
                },
                mealID: 12
            },
        },
        {
            breakfast: {
                imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
                title: "Caesar Salad with Grilled Chicken",
                nutrition: {
                    calories: 350,
                    protein: 50,
                    carbs: 5,
                    fat: 10
                },
                mealID: 196
            },
            lunch: {
                imageUrl: "https://www.eatwell101.com/wp-content/uploads/2021/07/Healthy-Chicken-with-Vegetable-Skillet-1.jpg",
                title: "Chicken and Vegetables Skillet",
                nutrition: {
                    calories: 600,
                    protein: 70,
                    carbs: 50,
                    fat: 50
                },
                mealID: 12
            },
            snack: {
                imageUrl: "https://www.allrecipes.com/thmb/ZhDrBmciWzegNpBWB-5LXEvULao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_4x3_2424-8d7bf30b2622465f9dd78a2c6277eeb8.jpg",
                title: "Spaghetti with Tomato Sauce",
                nutrition: {
                    calories: 700,
                    protein: 40,
                    carbs: 100,
                    fat: 15
                },
                mealID: 192
            },
            dinner: {
                imageUrl: "https://www.savorywithsoul.com/wp-content/uploads/2019/10/BaconMacCheese-32.jpg",
                title: "Bacon Mac and Cheese",
                nutrition: {
                    calories: 1000,
                    protein: 25,
                    carbs: 70,
                    fat: 50
                },
                mealID: 193
            },
        },
    ]
}
