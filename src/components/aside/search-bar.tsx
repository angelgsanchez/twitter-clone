import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { tweetsCollection } from '@lib/firebase/collections';
import { getDocs, query, where } from 'firebase/firestore';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

export function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        // Realizar la consulta de búsqueda de texto en Firestore
        const searchQuery = query(
          tweetsCollection,
          where('text', '>=', inputValue),  // Buscar mayor o igual que el texto de entrada
          where('text', '<=', inputValue + '\uf8ff')  // Limitar la búsqueda con un rango de caracteres Unicode
        );

        const querySnapshot = await getDocs(searchQuery);
        const results = querySnapshot.docs.map((doc) => doc.data());
        setSearchResults(results);

      } catch (error) {
        console.error('Error al buscar en Firestore:', error);
      }
    }
  };

  const clearInputValue = (focus?: boolean) => (): void => {
    if (focus) inputRef.current?.focus();
    else inputRef.current?.blur();

    setInputValue('');
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Escape') clearInputValue()();
  };

  return (
    <div>
      <form
        className='hover-animation sticky top-0 z-10 -my-2 bg-main-background py-2'
        onSubmit={handleSubmit}
      >
        <label
          className='group flex items-center justify-between gap-4 rounded-full
                     bg-main-search-background px-4 py-2 transition focus-within:bg-main-background
                     focus-within:ring-2 focus-within:ring-main-accent'
        >
          <i>
            <HeroIcon
              className='h-5 w-5 text-light-secondary transition-colors 
                         group-focus-within:text-main-accent dark:text-dark-secondary'
              iconName='MagnifyingGlassIcon'
            />
          </i>
          <input
            className='peer flex-1 bg-transparent outline-none 
                       placeholder:text-light-secondary dark:placeholder:text-dark-secondary'
            type='text'
            placeholder='Search Twitter'
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyUp={handleEscape}
          />
          <Button
            className={cn(
              'accent-tab scale-50 bg-main-accent p-1 opacity-0 transition hover:brightness-90 disabled:opacity-0',
              inputValue &&
                'focus:scale-100 focus:opacity-100 peer-focus:scale-100 peer-focus:opacity-100'
            )}
            onClick={clearInputValue(true)}
            disabled={!inputValue}
          >
            <HeroIcon className='h-3 w-3 stroke-white' iconName='XMarkIcon' />
          </Button>
        </label>
      </form>

      {/* Mostrar los resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((tweet: any, index: number) => ( // Usar 'any' para los tweets
            <div key={index}>
              <p>{tweet.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
