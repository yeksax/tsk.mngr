import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ query, setQuery }) {
	function handleQueryInput(event) {
		setQuery(event.target.value);
	}

	function clearQuery() {
		setQuery("");
	}

	return (
		<div className='search-bar'>
			{query != "" && (
				<FontAwesomeIcon
					className='clear-query'
					icon={faXmark}
					onClick={clearQuery}
				/>
			)}
			<input
				type='text'
				placeholder='Pesquisar...'
				onInput={handleQueryInput}
				value={query}
				className={query && "not-empty"}
				aria-label="Pesquisar"
			/>
			<FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
		</div>
	);
}

export default SearchBar;
