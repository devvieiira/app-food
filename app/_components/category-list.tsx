import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CatergoryList = async () => {
  const category = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-3">
      {category.map((item) => (
        <CategoryItem key={item.id} category={item} />
      ))}
    </div>
  );
};

export default CatergoryList;
