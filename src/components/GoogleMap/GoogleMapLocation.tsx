import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { useBooleanState } from "@mongez/react-hooks";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { IconBrandWhatsapp, IconMapPin, IconPhone } from "@tabler/icons";
import { Location } from "./types";

export function GoogleMapLocation({ location }: { location: Location }) {
  const [opened, toggleOpen] = useBooleanState();
  return (
    <Marker onClick={toggleOpen} position={location.location}>
      {opened && (
        <InfoWindow position={location.location}>
          <Box
            style={{
              minWidth: "200px",
            }}
          >
            <Text weight={700} mb="sm">
              <Flex>
                <ActionIcon color="red">
                  <IconMapPin />
                </ActionIcon>
                <Flex align="center">
                  <Text color="blue">{location.address}</Text>
                </Flex>
              </Flex>
            </Text>
            {location.phoneNumber && (
              <Text weight={700} mb="sm">
                <Flex>
                  <ActionIcon color="orange">
                    <IconPhone />
                  </ActionIcon>
                  <Flex align="center">
                    <Text color="blue">{location.phoneNumber}</Text>
                  </Flex>
                </Flex>
              </Text>
            )}
            {location.whatsappNumber && (
              <Text weight={700} mb="sm">
                <Flex>
                  <ActionIcon color="green">
                    <IconBrandWhatsapp />
                  </ActionIcon>
                  <Flex align="center">
                    <Text color="blue">{location.whatsappNumber}</Text>
                  </Flex>
                </Flex>
              </Text>
            )}
          </Box>
        </InfoWindow>
      )}
    </Marker>
  );
}
