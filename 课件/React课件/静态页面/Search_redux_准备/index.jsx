import SearchHeader from './SearchHeader'
import MainSearchMain from './SearchMain'
import './index.css'

function Search () {
  return <div className="container">
      <SearchHeader></SearchHeader>
      <MainSearchMain></MainSearchMain>
    </div>
}

export default Search