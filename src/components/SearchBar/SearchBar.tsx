import { Field, Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormValues, SearchBarProps } from "./SearchBar.types";

const initialValues: FormValues = {
  query: "",
};

const SearchBar: React.FC<SearchBarProps> = ({ handleChangeQwery }) => {
  const handleSabmit = (
    values: FormValues,
    options: FormikHelpers<FormValues>
  ) => {
    if (!values.query) {
      toast.error("The field cannot be empty");
      return;
    }

    handleChangeQwery(values.query);
    options.resetForm();
  };

  return (
    <div className={css.SearchBox}>
      <Formik initialValues={initialValues} onSubmit={handleSabmit}>
        <Form>
          <label>
            <Field type="text" name="query" placeholder="Enter Text" />
          </label>
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;