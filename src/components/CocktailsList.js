import useAppContext from '../hooks/useAppContext';
import Cocktail from './Cocktail';
import Loading from './Loading';

function CocktailsList() {
  const { isLoading, cocktails } = useAppContext();

  // during the request
  if (isLoading) return <Loading />;

  // if no data is returned from the APT
  if (cocktails.length === 0) {
    return (
      <h2 className="section-title">
        No Cocktails Matched Your Search Criteria
      </h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
export default CocktailsList;
