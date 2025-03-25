import { useDish } from '../../application/useDish';

export const DishList = () => {
  const { dishes } = useDish();

  return (
    <div>
      {dishes.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>{dish.getFormattedPrice()}</p>
        </div>
      ))}
    </div>
  );
};