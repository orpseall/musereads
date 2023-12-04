import React, { useState } from "react";
import { useRouter } from "next/router";
import { LinearProgress, MenuItem } from "@mui/material";
import AlertDialog from "./AlertDialog";
import { getserver } from "@/db/config";
import { useSession } from "next-auth/react";
import axios from "axios";
import { CalculateProgress } from "@/helper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function BookCardx({ book }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { push } = router;
  const HandleUpdateRead = async (readId, pageReached) => {
    const res = await axios.put(`${getserver}/api/userReading/${readId}`, {
      pageReached,
    });
    if (res && res.status === 200) {
      alert("Progress Update success");
      return router.replace(router.pathname);
    }
  };
  return (
    <div className="flex gap-3 bg-musePrimary text-museWhite  flex-col min-w-[15rem] max-w-[15rem]">
      <div className="cursor-pointer p-2">
        <div
          onClick={() =>
            push({ pathname: `/book/${book.title}`, query: { id: book.id } })
          }
          className="flex pb-2 p-2 flex-col w-full"
        >
          <img
            className="w-full object-contain max-h-[10rem]"
            src={book.imgUrl}
            alt="sample book Image"
          />
        </div>
        <div className="flex flex-col p-3">
          <h3 className="font-bold text-sm">{book.title}</h3>
          <p className="text-sm">
            by {""}
            {book.authors.map((author, index) => (
              <span key={index}>
                {author.fullname}
                {book.authors.length > 1 ? "," : ""}{" "}
              </span>
            ))}
          </p>
          <ul className="flex flex-col text-sm font-semibold text-musePrimary">
            {status === "authenticated" && book?.user_readings
              ? book.user_readings.length > 0
                ? book.user_readings
                    .filter((item) => item.userAccountId === session.user.id)
                    .map(
                      (
                        {
                          done_reading,
                          wish_to_read,
                          pageReached,
                          id,
                          bookId,
                          userAccountId,
                        },
                        index
                      ) =>
                        done_reading == 0 && wish_to_read === 0 ? (
                          <li
                            key={index}
                            className="flex bg-museWhite items-center gap-2 p-2"
                          >
                            <span className="w-[70%]">
                              <LinearProgress
                                variant="determinate"
                                value={parseFloat(
                                  CalculateProgress(pageReached, book.pages)
                                )}
                              />
                            </span>
                            <span className="text-[#4285F4]">{`${CalculateProgress(
                              pageReached,
                              book.pages
                            )}%`}</span>
                            <ConfirmDialog
                              AlertMsg={
                                "Are you sure you want to update your progress? If Yes set page number If No Cancle"
                              }
                              AlertTitle={`Update progress of ${book.title}`}
                              bookData={{ id, pageReached }}
                              AlertAction={HandleUpdateRead}
                            />
                          </li>
                        ) : done_reading == 1 && wish_to_read == 0 ? (
                          <li key={index}>Done Reading</li>
                        ) : done_reading == 0 && wish_to_read == 1 ? (
                          <li key={index}>In wish List</li>
                        ) : (
                          ""
                        )
                    )
                : []
              : null}
          </ul>
        </div>
        {/* <EditProgress /> */}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  AlertMsg,
  AlertTitle,
  AlertAction,
  BtnTitle,
  bookData,
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [ActionPressed, setActionPressed] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    router.replace(router.pathname);
  };

  const handleAlertAction = (pageReached) => {
    AlertAction(bookData.id, pageReached);
    setActionPressed(true);
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faEdit} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{AlertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {AlertMsg}
          </DialogContentText>
          <Formik
            initialValues={{ CurrentPage: 0 }}
            validate={(values) => {
              const errors = {};
              if (!values.CurrentPage || values.CurrentPage <= 0) {
                errors.CurrentPage = "Field required / Field can't be Zero(0)";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleAlertAction(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={"flex flex-col gap-4"}>
                <Field
                  className={
                    "flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"
                  }
                  type="number"
                  name="CurrentPage"
                  placeholder="CurrentPage"
                />
                <ErrorMessage
                  className={"text-[red]"}
                  name="CurrentPage"
                  component="div"
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#636429 !important" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          {ActionPressed ? (
            <Button onClick={handleClose} autoFocus>
              Done
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
