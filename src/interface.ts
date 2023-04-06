interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

type TProductRequest = Omit<IProduct, "id" | "expirationDate">;

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
  calories: number;
}

export { IProduct, TProductRequest, ICleaningProduct, IFoodProduct };
