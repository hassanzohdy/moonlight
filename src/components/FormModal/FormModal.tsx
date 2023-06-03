import { Button, LoadingOverlay, Modal, ModalProps } from "@mantine/core";
import { RestfulEndpoint } from "@mongez/http";
import { trans } from "@mongez/localization";
import { Form } from "@mongez/react-form";
import React, { useMemo, useState } from "react";
import { parseError } from "../../utils/parse-error";
import { SubmitButton } from "../Form/SubmitButton";
import { toastLoading } from "../toasters";
import { Wrapper } from "./style";

export function FormModal({
  open,
  onClose,
  service,
  onSave,
  record,
  heading,
  singleName,
  successMessage = trans("recordSavedSuccessfully"),
  children,
  ...modalProps
}: {
  children: React.ReactNode;
  open: boolean;
  singleName: string;
  record: any;
  heading?: React.ReactNode;
  successMessage?: React.ReactNode | ((record: any) => React.ReactNode);
  onClose: () => void;
  service: RestfulEndpoint;
  onSave: (record: any) => void;
} & Partial<ModalProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async ({ formData }) => {
    setIsLoading(true);
    const loader = toastLoading(trans("savingRecord"), trans("saving"));

    try {
      const response = record.id
        ? await service.update(record.id, formData)
        : await service.create(formData);

      onSave(response);

      const message =
        typeof successMessage === "function"
          ? successMessage(response)
          : successMessage;
      loader.success("Success!", message);

      onClose();
    } catch (error) {
      loader.error(parseError(error), trans("saveFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const modalHeading = useMemo(() => {
    if (heading) return heading;

    if (record.id)
      return trans("updateItem", {
        item: trans("the", {
          key: singleName,
        }),
      });

    return trans("createItem", { item: trans(singleName) });
  }, [heading, singleName, record]);

  return (
    <Modal
      title={<strong>{modalHeading}</strong>}
      opened={open}
      onClose={closeModal}
      {...modalProps}>
      <LoadingOverlay visible={isLoading} />
      <Form onSubmit={submitForm}>
        {children}
        <Wrapper>
          <Button type="button" variant="light" color="red" onClick={onClose}>
            {trans("cancel")}
          </Button>
          <SubmitButton color="green" type="submit">
            {trans("save")}
          </SubmitButton>
        </Wrapper>
      </Form>
    </Modal>
  );
}

FormModal.defaultProps = {
  trapFocus: false,
  overlayProps: {
    opacity: 0.2,
  },
  transitionProps: {
    exitDuration: 300,
  },
  centered: true,
};
