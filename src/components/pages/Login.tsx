import Image from "next/image";

import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import Main from '@/components/Main';
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <Main sx={{ alignItems: 'center', paddingBottom: '15vh' }}>
      <Stack spacing={4}>
        <Box textAlign="center">
          <Image priority src="/logo.png" alt="Logo" width={260} height={250} />
        </Box>
        <Box width="100%" display="flex" justifyContent="center">
          <LoginForm />
        </Box>
      </Stack>
    </Main>
  );
};

export default Login;
