import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackButton, Spinner } from '../components';
import { useSnackbar } from 'notistack';
const { VITE_API_URL } = import.meta.env;

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  function deleteHandleBook() {
    setLoading(true);
    axios
      .delete(`${VITE_API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully', {
          variant: 'success',
        });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('An error happened please check console', {
          variant: 'error',
        });
        console.log(err);
      });
  }

  return (
    <div className="p-4">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3>Are you sure want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={deleteHandleBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};
export default DeleteBook;
