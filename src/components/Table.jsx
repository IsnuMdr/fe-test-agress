import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/products/productSlice";
import ReadMore from "./ReadMore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { formatToIdr } from "../utils/convert-currency";

export default function Table({ products }) {
  const dispatch = useDispatch();

  const handleDeleteProduct = (idProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ id: idProduct }));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <table className="table-auto items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100">
            Nama Produk
          </th>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100">
            SKU
          </th>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100">
            Brand
          </th>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100">
            Deskripsi
          </th>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100">
            Variasi
          </th>
          <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap text-left">
              {product.name}
            </td>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap">
              {product.sku}
            </td>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap">
              {product.brand}
            </td>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap">
              <div className="w-[400px] whitespace-normal">
                <ReadMore>{product.description}</ReadMore>
              </div>
            </td>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap">
              <ul className="list-disc">
                {product.variants.map((item) => (
                  <li key={item.sku} className="flex flex-col mb-2">
                    <span className="font-semibold">
                      {item.name} ({item.sku})
                    </span>
                    <span className="font-normal">
                      {formatToIdr(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </td>
            <td className="px-6 align-top border border-l-0 border-r-0 text-sm whitespace-nowrap">
              <div className="flex justify-center items-center p-2 gap-2">
                <Link
                  to={`/update-product/${product.id}`}
                  className="p-2 bg-yellow-500 rounded cursor-pointer hover:bg-yellow-700"
                >
                  <FiEdit color="white" fontSize={16} fontWeight={800} />
                </Link>
                <div
                  className="p-2 bg-red-600 rounded cursor-pointer hover:bg-red-800"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <FiTrash2 color="white" fontSize={16} fontWeight={800} />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
