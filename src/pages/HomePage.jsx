import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import { getProducts } from "../features/products/productSlice";

function HomePage() {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-slate-70">
              List Product
            </h3>
          </div>
          {/* <AddProduct /> */}
          <Link
            className="py-1.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-sky-600 rounded-lg border border-gray-200 hover:bg-sky-800"
            to="/add-product"
          >
            Tambah Product
          </Link>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <Table products={products} />
      </div>
    </div>
  );
}

export default HomePage;
