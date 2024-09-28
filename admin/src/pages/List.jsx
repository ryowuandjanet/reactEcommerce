import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">All Products List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    className="w-16 h-16 object-cover"
                    src={item.image[0]}
                    alt={item.name}
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">
                  {currency}
                  {item.price}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
