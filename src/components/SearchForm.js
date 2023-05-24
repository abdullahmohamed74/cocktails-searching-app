import { useEffect, useRef } from 'react';
import useAppContext from '../hooks/useAppContext';

function SearchForm() {
  const { setSearchTerm } = useAppContext();

  // get reference to the input
  const inputRef = useRef(null);

  // use uncontrolled input value to update the "searchTerm" state as user is typing
  const handleChange = () => {
    setSearchTerm(inputRef.current.value);
  };

  // focus the input as the component first render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="search">search your favorite cocktail</label>
          <input
            type="text"
            name="search"
            id="search"
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
}
export default SearchForm;
