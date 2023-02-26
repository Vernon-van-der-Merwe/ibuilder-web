import { showNotification, updateNotification } from "@mantine/notifications";
import { IconBan, IconCheck, IconCoffee } from "@tabler/icons";

export const showLoading = (title, message?) => {
  showNotification({
    id: "load-data",
    loading: true,
    title,
    message,
    autoClose: false,
    disallowClose: true,
  });
};

export const updateSuccess = (title, message?) => {
  updateNotification({
    id: "load-data",
    color: "teal",
    title,
    message,
    icon: <IconCheck size={16} />,
    autoClose: 2000,
  });
};

export const updateError = (title, message?) => {
  updateNotification({
    id: "load-data",
    color: "red",
    title,
    message,
    icon: <IconBan size={16} />,
    autoClose: 3000,
  });
};

export const showError = (title, message?) => {
  showNotification({
    id: "load-data",
    color: "red",
    title,
    message,
    icon: <IconBan size={16} />,
    autoClose: 3000,
  });
};

export const showSuccess = (title, message?) => {
  showNotification({
    id: "load-data",
    color: "teal",
    title,
    message,
    icon: <IconCheck size={16} />,
    autoClose: 2000,
  });
};

export const showInfo = (title, message?) => {
  showNotification({
    id: "info",
    color: "teal",
    title,
    message,
    icon: <IconCoffee size={16} />,
    autoClose: 2000,
  });
};