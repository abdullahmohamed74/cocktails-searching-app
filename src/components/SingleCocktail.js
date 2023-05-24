import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

function SingleCocktail() {
  const { cocktailId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState();

  const getCocktail = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { drinks },
      } = await axios.get(`${url}?i=${cocktailId}`);

      if (drinks) {
        const newCocktail = drinks.map((item) => {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strCategory: category,
            strAlcoholic: info,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
          } = item;
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
          ];
          return {
            name,
            image,
            category,
            info,
            glass,
            instructions,
            ingredients,
          };
        });

        setCocktail(newCocktail[0]);
      } else {
        setCocktail(null);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [cocktailId]);

  useEffect(() => {
    getCocktail();
  }, [getCocktail]);

  if (loading) return <Loading />;

  if (!cocktail)
    return <h2 className="section-title">no cocktail to display</h2>;

  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {ingredients.map((item, index) => {
              return item && <span key={index}>{item}</span>;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
export default SingleCocktail;
