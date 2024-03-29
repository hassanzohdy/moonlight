import { List, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { isEmpty, isObject } from "@mongez/supportive-is";

export function parseError(error: any) {
  if (isEmpty(error)) {
    return isObject(error) ? <span>{trans("somethingWentWrong")}</span> : null;
  }

  if (error.response) {
    error = error.response;
  }

  if ([405, 500].includes(error.status)) {
    return <span>{trans("somethingWentWrong")}</span>;
  }

  if (error.status === 404) {
    return <span>{trans("notFound")}</span>;
  }

  if (error?.data?.errors) {
    error = error.data.errors;
  }

  if (error?.data?.messages) {
    error = error.data.messages;
  }

  if (error?.data?.error) {
    error = error.data.error;
  }

  if (error?.message) {
    error = error.message;
  }

  let errorContent: any;

  if (Array.isArray(error)) {
    const errorsList = error.map((error: any) => {
      return (
        <List.Item key={error.key}>
          {error?.value || error?.message || error?.error || error}
        </List.Item>
      );
    });

    errorContent = <List>{errorsList}</List>;
  } else {
    errorContent = <Text>{error}</Text>;
  }

  return errorContent;
}
