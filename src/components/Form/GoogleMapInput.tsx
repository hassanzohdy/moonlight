import { Grid, List, Modal, ThemeIcon } from "@mantine/core";
import { trans } from "@mongez/localization";
import { requiredRule, useFormControl } from "@mongez/react-form";
import { useOuterClick } from "@mongez/react-hooks";
import { readMoreChars } from "@mongez/reinforcements";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { IconCircleCheck, IconMapPin, IconTrash } from "@tabler/icons";
import { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { googleMapConfig } from "../../config";
import { moonlightTranslations } from "../../locales";
import {
  getAddressByLatLng,
  getAddressByPlaceId,
  getGoogleMapApiKey,
} from "../../services/google-map-services";
import { LoadingErrorHandler } from "../LoadingErrorHandler";
import { Tooltip } from "../Tooltip";
import { InputWrapper } from "./InputWrapper";
import { TextInput } from "./TextInput";

const defaultStyles = {
  container: {
    height: "500px",
    width: "100%",
  },
};

export function GoogleMapInput({
  defaultValue,
  description,
  hint,
  label,
  autoFocus,
  placeholder,
  required,
  zoom = googleMapConfig("zoom", 18),
  libraries = googleMapConfig("libraries", [
    "drawing",
    "geometry",
    "localContext",
    "places",
    "visualization",
  ]),
  defaultCenter = googleMapConfig("center", {
    lat: 30.044399831543025, // Tahrir Square
    lng: 31.235718727111816,
  }),
  styles: incomingStyles = {},
  searchScope = ["address"],
  ...props
}: any) {
  const { error, visibleElementRef, id, changeValue } = useFormControl({
    ...props,
    defaultValue,
  });

  // initializing google map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapApiKey(),
    libraries,
  });

  const [open, setOpen] = useState(false);

  const [location, setLocation] = useState(defaultValue || defaultCenter);

  const styles = { ...defaultStyles, ...incomingStyles };

  const onMapClick = (e) => {
    getAddressByLatLng(e.latLng.lat(), e.latLng.lng()).then((response: any) => {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        address: response.results[0].formatted_address,
      };
      setLocation(newLocation);
      setValue(newLocation.address, false);
    });
  };

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: searchScope,
    },
    defaultValue: defaultValue?.address,
  });

  const searchRef = useOuterClick(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description, ...other }) =>
    () => {
      getAddressByPlaceId(other.place_id).then((response: any) => {
        const newLocation = {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
          address: response.results[0].formatted_address,
        };

        setLocation(newLocation);
        setValue(newLocation.address, false);
        changeValue(newLocation);
      });

      setValue(description, false);
      clearSuggestions();
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <List.Item
          style={{
            cursor: "pointer",
          }}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </List.Item>
      );
    });

  if (loadError || !isLoaded) {
    return <LoadingErrorHandler error={loadError} isLoading={!isLoaded} />;
  }

  const clearLocation = () => {
    setValue("", false);
    setLocation(defaultCenter);
    changeValue("");
  };

  return (
    <>
      <InputWrapper
        error={error}
        description={description}
        hint={hint}
        visibleElementRef={visibleElementRef}
        label={label}
        required={required}
        tooltip={location.address}
        id={id}
      >
        <TextInput
          // name={`${name}_location`}
          value={readMoreChars(location.address || "", 80)}
          placeholder={placeholder && trans(placeholder)}
          id={id}
          onClick={() => setOpen(true)}
          readOnly
          rightSection={
            <>
              {!required && location.address && (
                <Tooltip label={trans(moonlightTranslations.clear)}>
                  <ThemeIcon
                    ml={-31}
                    mr={3}
                    mt={4}
                    style={{
                      cursor: "pointer",
                    }}
                    size="sm"
                    color="red"
                  >
                    <IconTrash onClick={clearLocation} size={15} />
                  </ThemeIcon>
                </Tooltip>
              )}
              <Tooltip label={trans(moonlightTranslations.select)}>
                <ThemeIcon
                  style={{
                    cursor: "pointer",
                  }}
                  mt={4}
                  size="sm"
                  color={location?.address ? "green" : "gray"}
                >
                  <IconMapPin size={15} onClick={() => setOpen(true)} />
                </ThemeIcon>
              </Tooltip>
            </>
          }
        />
      </InputWrapper>
      <Modal
        withCloseButton={false}
        size="xl"
        exitTransitionDuration={300}
        opened={open}
        onClose={() => setOpen(false)}
      >
        <Grid ref={searchRef}>
          <Grid.Col mb={10}>
            <TextInput
              label={label}
              autoFocus={autoFocus}
              value={value}
              placeholder={placeholder}
              onChange={handleInput}
            />
          </Grid.Col>

          {status === "OK" && (
            <Grid.Col className="mt-0">
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck size={16} />
                  </ThemeIcon>
                }
              >
                {renderSuggestions()}
              </List>
            </Grid.Col>
          )}
        </Grid>
        <GoogleMap
          id="map"
          mapContainerStyle={styles.container}
          zoom={zoom}
          center={location}
          onClick={onMapClick}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        </GoogleMap>
      </Modal>
    </>
  );
}

GoogleMapInput.defaultProps = {
  rules: [requiredRule],
};
