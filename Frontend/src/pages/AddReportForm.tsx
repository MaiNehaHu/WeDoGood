import { useReducer, useState } from 'react';
import NavBar from '../components/NavBar';
import { postReport } from '../services/api';

const initialState = {
  formData: {
    ngoId: '',
    month: '',
    eventsConducted: '',
    peopleHelped: '',
    fundsUtilized: '',
  },
  errors: {
    ngoId: '',
    month: '',
    eventsConducted: '',
    peopleHelped: '',
    fundsUtilized: '',
  },
};

type FormFields = keyof typeof initialState.formData;

type Action =
  | { type: 'UPDATE_FIELD'; field: FormFields; value: string }
  | { type: 'SET_ERROR'; field: FormFields; message: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: initialState.errors,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

const fields: { field: FormFields; label: string; type: 'text' | 'number' | 'month' }[] = [
  { field: 'ngoId', label: 'NGO ID', type: 'text' },
  { field: 'month', label: 'Month', type: 'month' },
  { field: 'eventsConducted', label: 'Events Conducted', type: 'number' },
  { field: 'peopleHelped', label: 'People Helped', type: 'number' },
  { field: 'fundsUtilized', label: 'Funds Utilized (₹)', type: 'number' },
];

function padZero(value: number) {
  return value < 10 ? `0${value}` : value;
}

const ReportForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${padZero(today.getMonth() + 1)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name as FormFields, value });
  };

  const validateFields = () => {
    let isValid = true;
    dispatch({ type: 'CLEAR_ERRORS' });

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        dispatch({ type: 'SET_ERROR', field: key as FormFields, message: 'This field is required.' });
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setSubmitting(true);
      await postReport({
        ...formData,
        eventsConducted: Number(formData.eventsConducted),
        peopleHelped: Number(formData.peopleHelped),
        fundsUtilized: Number(formData.fundsUtilized),
      });

      alert('Report submitted successfully!');
      dispatch({ type: 'RESET_FORM' });
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      alert('Failed to submit report.');
    }
  };

  return (
    <>
      <NavBar currentPage="form" />

      <div className="p-10 w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl px-10 pb-8 mb-4 w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">
            Submit Monthly Report
          </h2>

          {fields.map(({ field, label, type }) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium mb-1"
              >
                {label}
              </label>
              <input
                id={field}
                name={field}
                type={type}
                max={type == "month" ? defaultMonth : ""}
                value={formData[field]}
                disabled={submitting}
                placeholder={label}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-xl ${errors[field] ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 font-medium text-white py-2 px-4 rounded-xl hover:bg-blue-600 w-full transition"
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportForm;