import { Menu, Avatar, UnstyledButton, Group, Text } from '@mantine/core';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronDown, User, LogOut } from 'lucide-react';
import classes from './Header.module.css';

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  // Generate initials from email
  const initials = session.user.email
    ?.split('@')[0]
    .split('.')
    .map(part => part[0]?.toUpperCase())
    .join('');

  return (
    <Menu position="bottom-end" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.userButton}>
          <Group gap="xs">
            <Avatar 
              size={34} 
              radius="xl" 
              color="icon"
            >
              {initials}
            </Avatar>
            <Text size="sm" fw={500} lineClamp={1} mr={5}>
              {session.user.email}
            </Text>
            <ChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/profile"
          leftSection={<User size={16} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => signOut({ callbackUrl: '/' })}
          leftSection={<LogOut size={16} />}
          color="red"
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
} 