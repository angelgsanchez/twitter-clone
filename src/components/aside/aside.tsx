import { useWindow } from '@lib/context/window-context';
import { SearchBar } from './search-bar';



export function Aside(): JSX.Element | null {
  const { width } = useWindow();

  if (width < 1024) return null;

  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3 pt-1'>
      <SearchBar />
      
      
    </aside>
  );
}
