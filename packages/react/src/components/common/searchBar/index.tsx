import { FaSearch } from 'react-icons/fa';
import './style.css';
import { SearchBarProps } from '~/interfaces/components/common/searchBar.interface';

function SearchBar({
    searchTerm,
    onSearchChange,
    placeholder = 'Search by race name',
    error,
}: SearchBarProps) {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={`search-input ${error ? 'input-error' : ''}`}
                />
            </div>
            {error && <small className="input-error-message">{error}</small>}
        </div>
    );
}

export default SearchBar;
