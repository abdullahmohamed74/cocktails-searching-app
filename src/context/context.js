import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

const AppContext = createContext();

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { drinks },
      } = await axios.get(`${url}?s=${searchTerm}`);

      if (drinks) {
        // creating a new array of objects, new object for each drink with specific properties
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        // if the user enters a starnge word the returned drinks will be null
        setCocktails([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [searchTerm]);

  // put "searchTerm" in the dependencies array 
  // to call "fetchDrinks" function each time "searchTerm" state changes
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ isLoading, setSearchTerm, cocktails }}>
      {children}
    </AppContext.Provider>
  );
}

export { Provider };
export default AppContext;
