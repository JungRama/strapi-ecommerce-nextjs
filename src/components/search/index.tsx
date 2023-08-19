import { Search } from 'lucide-react'
import SearchModal from './search-modal'

export default function SearchInput() {
  return (
    <>
      <SearchModal trigger={
        <div className='flex relative cursor-pointer'>
          <Search />
          <input readOnly className='ml-4 w-[250px] cursor-pointer focus:outline-none' placeholder='Search any sneakers here ...'></input>
        </div>
      }></SearchModal>
    </>
  )
}