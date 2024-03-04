import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Description from "./description";
import Actions from "./actions";
import Activity from "./activity";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/interfaces";
import { updateModalCardModalAction } from "@/redux/actions/orgActions";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CardModal = () => {
  const modalData = useSelector((state: RootState) => state.org.modalData);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsOpen(false);
    dispatch(
      updateModalCardModalAction({ isOpen: false, id: undefined, task: null })
    );
  };
  const cardModal = { ...modalData.cardModal };
  useEffect(() => {
    setIsOpen(cardModal?.isOpen || false);
  }, [modalData]);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <Header data={cardModal} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              <Description task={cardModal?.task} />
            </div>
          </div>
          <Actions data={cardModal} />
          <Activity data={cardModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
