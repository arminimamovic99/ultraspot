export interface IOrderItem {
  id: number,
  name: string,
  price: number,
  imgSrc?: string,
  type: number,
  options?: IHookahOptions
}

export interface IHookahOptions {
  cupType: string;
  flavorSettings: string[];
}
