' Implementación del repositorio para platos.'
import { Dish } from '../domain/entities/Dish';

export class DishRepositoryImpl {
  async getDishes() {
    const response = await fetch('/api/dishes');
    const data = await response.json();
    return data.map(
      (dish) =>
        new Dish(
          dish.id,
          dish.name,
          dish.description,
          dish.price,
          dish.category,
          dish.escandalloId,
        ),
    );
  }
}