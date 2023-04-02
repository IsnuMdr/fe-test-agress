import { useEffect, useState } from "react";
import { brandData } from "../data/dummy-data";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../features/products/productSlice";
import Swal from "sweetalert2";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

function UpdateProductPage() {
  const [formValue, setFormValue] = useState({});
  const [variants, setVariants] = useState([]);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const detailProduct = products.find(
      (product) => product.id === parseInt(id)
    );

    if (detailProduct) {
      setFormValue(detailProduct);
      setVariants(detailProduct.variants);

      let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(detailProduct.description)
        )
      );
      setDescription(editorState);
    }
  }, [id, products]);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now(), name: "", sku: "", price: "" },
    ]);
  };

  const removeVariant = (id) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValue.id = parseInt(id);
    formValue.description = convertToHTML(description.getCurrentContent());
    formValue.variants = variants;

    dispatch(updateProduct(formValue));

    Swal.fire("Good job!", "Product updated successfully!", "success").then(
      (result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      }
    );
  };

  return (
    <div className="mt-10 flex flex-col min-w-0 w-full mb-6">
      <h4 className="text-center font-semibold">Tambah Produk</h4>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="flex md:flex-row flex-col gap-5">
          <div className="flex-col">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nama Produk
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama produk"
                value={formValue.name}
                onChange={(e) =>
                  setFormValue((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                SKU
              </label>
              <input
                type="text"
                id="sku"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="SKU"
                value={formValue.sku}
                onChange={(e) =>
                  setFormValue((prev) => ({ ...prev, sku: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Brand
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formValue.brand}
                onChange={(e) =>
                  setFormValue((prev) => ({ ...prev, brand: e.target.value }))
                }
                required
              >
                <option value="">Pilih brand</option>
                {brandData.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Deskripsi
              </label>
              <div className="h-72">
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorState={description}
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
              ;
            </div>
          </div>
          <div className="md:w-2/3 flex-col">
            {variants.map((variant, index) => (
              <div key={variant.id} className="flex-col">
                <div className="block mb-2 text-sm font-medium text-gray-900">
                  Variasi {index + 1}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="nama_variasi"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama_variasi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nama variasi"
                    value={variant.name}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((el, ind) =>
                          ind === index ? { ...el, name: e.target.value } : el
                        )
                      )
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="sku_variant"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku_variant"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((el, ind) =>
                          ind === index ? { ...el, sku: e.target.value } : el
                        )
                      )
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((el, ind) =>
                          ind === index ? { ...el, price: e.target.value } : el
                        )
                      )
                    }
                    required
                  />
                </div>
                {variants.length > 1 && (
                  <button
                    type="button"
                    className="block w-full py-2 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-700"
                    onClick={() => removeVariant(variant.id)}
                  >
                    Hapus Variasi
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="block w-full py-2 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-sky-600 rounded-lg border border-gray-200 hover:bg-sky-800"
              onClick={addVariant}
            >
              Tambah Variasi
            </button>
          </div>
        </div>
        <div className="items-center gap-2 mt-3 sm:flex">
          <button
            type="submit"
            className="w-full mt-2 p-2.5 text-sm font-medium text-white focus:outline-none bg-sky-600 rounded-lg border border-gray-200 hover:bg-sky-800"
          >
            Edit Produk
          </button>
          <div
            className="w-full mt-2 p-2.5 text-sm font-medium text-white focus:outline-none bg-gray-600 rounded-lg border border-gray-200 hover:bg-gray-800 cursor-pointer text-center"
            onClick={() => navigate(-1)}
          >
            Kembali
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductPage;
