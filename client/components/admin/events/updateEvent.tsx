/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";

const AdminUpdateEvent = (props: any) => {
  return (
    <Grid className="create-event">
      <form>
        <h1>Edit Event</h1>
        <Grid className="admin-form-field">
          <label className="event-form-label">Title</label>
          <input
            value={props.editSelectedEvent.title}
            onChange={(e) => props.setTitle(e.target.value)}
            type="text"
            name="eventTitle"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Price</label>
          <input
            value={props.editSelectedEvent.price}
            onChange={(e) => props.setPrice(e.target.value)}
            type="number"
            name="eventPrice"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Spots</label>
          <input
            value={props.editSelectedEvent.spots}
            onChange={(e) => props.setSpots(e.target.value)}
            type="number"
            name="eventSpots"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Info</label>
          <textarea
            value={props.editSelectedEvent.info}
            onChange={(e) => props.setInfo(e.target.value)}
            className="form-control"
            required
            rows={7}
          />
        </Grid>
        <Grid className="align-center">
          <button type="submit" onClick={(e) => props.createEvent(e)}>
            Submit
          </button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AdminUpdateEvent;
