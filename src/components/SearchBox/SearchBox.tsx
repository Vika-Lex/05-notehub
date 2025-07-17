import css from './SearchBox.module.css';
import {useDebounce} from "use-debounce";
import {useEffect, useState} from "react";

interface SearchBoxProps {
    query: string;
    setQuery: (query: string) => void;
}
const SearchBox = ({query, setQuery}:SearchBoxProps) => {


    const [inputValue, setInputValue] = useState(query);
    const [debouncedValue] = useDebounce(inputValue, 500); // 500 мс задержка

    useEffect(() => {
        setQuery(debouncedValue);
    }, [debouncedValue, setQuery]);


    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />

    );
};
export default SearchBox