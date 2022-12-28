import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { AutocompleteItem } from "./AutocompleteItem";

export default function SearchAngolia(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Busca tu Pelicula",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "offers-next-api",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(
                  `${import.meta.env.VITE_APP_API_MOVIEDB}${query}&api_key=${
                    import.meta.env.VITE_APP_API_KEY
                  }`
                ).then((res) => res.json());
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form
      ref={formRef}
      className="flex justify-center pt-20 pb-10"
      {...formProps}
    >
      <div className="flex relative text-sm py-2 rounded-full lg:w-2/6 w-[88%]">
        <input
          ref={inputRef}
          className="flex-1 p-2 pl-4 outline-none border-none rounded-full w-full"
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 bg-white overflow-hidden rounded-lg shadow-lg z-10 w-full"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              return (
                <section key={`section-${index}`}>
                  {items[0].results.length > 0 ? (
                    <ul {...autocomplete.getListProps()}>
                      {items[0].results.slice(0, 5).map((item) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  ) : (
                    <div className="py-4 text-center shadow-2xl">
                      No hay resultados de su busqueda
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
