import { Menu, Button, Text, Group } from "@mantine/core";
import {
  IconDoorEnter,
  IconDoorExit,
} from "@tabler/icons";
import { useAuth } from "../../src/context/authContext";
import { styles } from "../../styles/header";

export default function CustomHeader() {
  const { classes } = styles();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout()
  }
  return (
    <>
      <Group position="right" className={classes.group}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>Profile</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item icon={<IconDoorEnter size={14} />} onClick={handleLogout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  );
}
