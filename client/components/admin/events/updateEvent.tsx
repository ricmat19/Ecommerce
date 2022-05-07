/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  date: "",
  price: "",
  spots: "",
  info: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.put(`/admin/events/${values.id}`, {
    selectedTitle: values.selectedTitle,
    selectedDate: values.selectedDate,
    selectedPrice: values.selectedPrice,
    selectedInfo: values.selectedInfo,
    selectedSpots: values.selectedSpots,
  });

  values.handleClose();
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

const AdminUpdateEvent = (props: any) => {
  return (
    <Grid className="create-event">
      <Formik
        initialValues={{
          initialValues,
          id: props.selectedEvent.id,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount
      >
        <Form>
          <h1>Edit Event</h1>
          <Grid className="admin-form-field">
            <label className="event-form-label">Title</label>
            <Field as="input" type="text" name="title" />
            <ErrorMessage name="title" component="div">
              {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
            </ErrorMessage>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Date</label>
            <Field as="input" type="date" name="date" />
            <ErrorMessage name="date" component="div">
              {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
            </ErrorMessage>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Price</label>
            <Field as="input" type="number" name="price" />
            <ErrorMessage name="price" component="div">
              {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
            </ErrorMessage>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Spots</label>
            <Field as="input" type="number" name="spots" />
            <ErrorMessage name="spots" component="div">
              {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
            </ErrorMessage>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Info</label>
            <Field as="textarea" name="info" rows={7} />
            <ErrorMessage name="info" component="div">
              {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
            </ErrorMessage>
          </Grid>
          <Grid className="align-center">
            <button type="submit">Submit</button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default AdminUpdateEvent;
