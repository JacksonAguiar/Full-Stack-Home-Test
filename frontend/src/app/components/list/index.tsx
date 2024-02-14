import { UserInterface } from "../../../types/interfaces";

interface ListProps {
  data: UserInterface[];
  total: number;
  totalPages: number;
  current: number;
  hiddenPagination: boolean;
}

const ListComponent = ({
  data,
  total,
  current,
  totalPages,
  hiddenPagination = false,
  ...props
}: ListProps) => {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex justify-center items-center mt-[25%]">
          <h1 className="font-medium text-3xl text-gray-400">
            No data to show
          </h1>
        </div>
      ) : (
        <>
          {!hiddenPagination && (
            <PaginationWidget
              current={current}
              total={total}
              totalPages={totalPages}
            />
          )}
          <main
            data-testid="list-test"
            className="grid mb-8 sm:grid-cols-2 md:mb-12 md:grid-cols-3 lg:grid-cols-4 bg-white "
          >
            {data.map((e, i) => {
              return (
                <figure
                  key={i}
                  data-testid="card-test"
                  className="card-test flex flex-col m-1 rounded-xl items-center justify-center p-6 text-center bg-blue-500 dark:bg-gray-800 "
                >
                  <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-xl font-semibold text-white">
                      {e.name}
                    </h3>
                    <p className="my-4 text-gray-200">
                      {e.city},{e.country}
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center ">
                    <div className="space-y-0.5 font-medium text-white text-center rtl:text-right ms-3">
                      <div>Favourite sport</div>
                      <div className="text-sm text-gray-300">
                        {e.favorite_sport}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </main>
        </>
      )}
    </>
  );
};

export default ListComponent;

const PaginationWidget = ({
  current,
  total,
  totalPages,
}: {
  current: number;
  total: number;
  totalPages: number;
}) => {
  return (
    <div
      data-testid="pag-test"
      className="flex items-center justify-between bg-white px-4 py-3 sm:px-6"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        {current !== 1 ? (
          <a
            href={"/?page=" + (current - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
        ): <span />}
         {current !== totalPages && (
        <a
          href={"/?page=" + (current + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>)}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {Array.from(Array(totalPages).keys()).map((e, i) => {
              const active =
                "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
              const noacitve =
                "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
              return (
                <a
                  key={i}
                  data-testid="pag-item-test"
                  href={"?page=" + (e + 1)}
                  aria-current={current === e + 1 ? "page" : "false"}
                  className={current === e + 1 ? active : noacitve}
                >
                  {e + 1}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
