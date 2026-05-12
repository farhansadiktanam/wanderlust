"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/dist/server/api-utils";
import { Router } from "next/router";
const DeleteDestination = ({ destinationDetails }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/destinations/${destinationDetails._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );
    const deleteDestination = await res.json();
    console.log(deleteDestination);
  };
  return (
    <div>
      <AlertDialog>
        <Button variant="danger">Delete </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete project permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>
                    Your Awesome {destinationDetails.destinationName}
                  </strong>{" "}
                  and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close" variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestination;
