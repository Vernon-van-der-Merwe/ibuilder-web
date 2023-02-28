import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconUsers,
  IconBuildingStore,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../src/context/authContext";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const baseRoutes = [
  { icon: IconHome2, label: "Home", route: "/dashboard" },
];

type PageProps = {
  children: React.ReactNode; // 👈️ type children
};

export default function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
  }

  const links = baseRoutes.map((link, index) => (

    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        router.push(link.route);
        setActive(index);
      }}
    />
  ));

  return (
    <Navbar height={"100vh"} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout}/>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
