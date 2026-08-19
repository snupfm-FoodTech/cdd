import { Nutrient } from "@/types/nutrient.type";
import NutrientStandardItem from "../nutrient-standard-item";

const NutrientsList = ({ nutrients }: { nutrients: Nutrient[] }) => {
    return (
        <div className="mt-4 grid grid-cols-2 gap-2">
            {nutrients.map((nutrient) => (
                <NutrientStandardItem key={nutrient.code} nutrient={nutrient} />
            ))}
        </div>
    );
};

const DietDetailNutrition = ({ nutrients, name }: { nutrients: Nutrient[], name: string }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <NutrientsList nutrients={nutrients} />
        </div>
    );
};

export default DietDetailNutrition;